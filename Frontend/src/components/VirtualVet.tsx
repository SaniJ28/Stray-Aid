import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, PawPrint, Loader2, Plus, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const quickResponses = [
  "Bleeding",
  "Not Breathing",
  "Toxic Substance",
  "Limping",
  "Fever"
];

const firstAidInstructions = {
  bleeding: "For bleeding:\n1. Apply direct pressure with a clean cloth\n2. Elevate the wound if possible\n3. Keep the animal calm\n4. Seek immediate veterinary care",
  "not breathing": "For breathing issues:\n1. Check airway for obstructions\n2. Perform rescue breathing if needed\n3. Keep the animal calm\n4. Seek immediate veterinary care",
  toxic: "For toxic substances:\n1. Remove the animal from the source\n2. Do not induce vomiting\n3. Contact a vet immediately\n4. Keep the container for identification",
  limping: "For limping:\n1. Restrict movement\n2. Apply cold compress\n3. Keep the animal calm\n4. Seek veterinary care if severe",
  fever: "For fever:\n1. Keep the animal cool\n2. Provide fresh water\n3. Monitor temperature\n4. Seek veterinary care if persistent"
};

const DEEPSEEK_API_KEY = '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';

const VirtualVet = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'New Chat',
      messages: [
        {
          id: 1,
          text: "Hello! I'm your Virtual Vet Assistant. How can I help you provide first aid to the animal? Please describe the situation or select from common emergencies below.",
          isBot: true,
          timestamp: new Date()
        }
      ]
    }
  ]);
  const [activeSession, setActiveSession] = useState<string>('1');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = async (userInput: string) => {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-zero',
          messages: [
            {
              role: 'system',
              content: `You are a veterinary first aid assistant. Provide clear, concise emergency first aid instructions for animals. 
              Always prioritize safety and emphasize the importance of seeking professional veterinary care. 
              Include step-by-step instructions and important warnings when necessary.`
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return null;
    }
  };

  const getFirstAidInstructions = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes('bleeding')) return firstAidInstructions.bleeding;
    if (lowercaseInput.includes('not breathing') || lowercaseInput.includes('breathing')) return firstAidInstructions["not breathing"];
    if (lowercaseInput.includes('toxic') || lowercaseInput.includes('eaten')) return firstAidInstructions.toxic;
    if (lowercaseInput.includes('limp')) return firstAidInstructions.limping;
    if (lowercaseInput.includes('fever')) return firstAidInstructions.fever;
    return null;
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: 1,
          text: "Hello! I'm your Virtual Vet Assistant. How can I help you provide first aid to the animal? Please describe the situation or select from common emergencies below.",
          isBot: true,
          timestamp: new Date()
        }
      ]
    };
    setSessions(prev => [...prev, newSession]);
    setActiveSession(newSession.id);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentSession = sessions.find(s => s.id === activeSession);
    if (!currentSession) return;

    // Add user message
    const userMessage: Message = {
      id: currentSession.messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    // Update session title if it's the first user message
    if (currentSession.messages.length === 1) {
      const newTitle = input.slice(0, 30) + (input.length > 30 ? '...' : '');
      setSessions(prev => prev.map(s => 
        s.id === activeSession ? { ...s, title: newTitle } : s
      ));
    }

    setSessions(prev => prev.map(s => 
      s.id === activeSession 
        ? { ...s, messages: [...s.messages, userMessage] }
        : s
    ));
    setInput('');
    setIsLoading(true);

    // Get predefined instructions or AI response
    const predefinedInstructions = getFirstAidInstructions(input);
    let responseText = predefinedInstructions;

    if (!predefinedInstructions) {
      const aiResponse = await getAIResponse(input);
      responseText = aiResponse || "I apologize, but I'm having trouble connecting to the AI service. Here's a general recommendation: For any animal emergency, the most important steps are to stay calm, ensure your safety, prevent further injury, and seek professional veterinary care as soon as possible.";
    }

    const botResponse: Message = {
      id: currentSession.messages.length + 2,
      text: responseText,
      isBot: true,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s => 
      s.id === activeSession 
        ? { ...s, messages: [...s.messages, botResponse] }
        : s
    ));
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-[calc(100vh-2rem)] bg-white shadow-lg hover:shadow-xl transition-shadow border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <PawPrint className="w-5 h-5" />
            Virtual Vet First Aid Assistant
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={createNewSession}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)] flex flex-col">
        <Tabs value={activeSession} onValueChange={setActiveSession} className="flex-1 flex flex-col h-full">
          <TabsList className="w-full justify-start overflow-x-auto border-b border-gray-100">
            {sessions.map((session) => (
              <TabsTrigger
                key={session.id}
                value={session.id}
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                {session.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {sessions.map((session) => (
            <TabsContent key={session.id} value={session.id} className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Quick Response Buttons */}
              <div className="p-4 border-b border-gray-100 flex-shrink-0">
                <p className="text-sm text-gray-700 mb-2">Common Emergencies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-gray-800 border-gray-200 hover:bg-gray-50"
                      onClick={() => {
                        setInput(response);
                        handleSend();
                      }}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {session.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isBot
                            ? 'bg-gray-50 text-gray-900'
                            : 'bg-gray-800 text-white'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-50 text-gray-900 rounded-lg p-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-100 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe the animal's condition..."
                    className="border-gray-200 focus:ring-gray-500"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gray-800 hover:bg-gray-900 text-white flex-shrink-0"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VirtualVet;