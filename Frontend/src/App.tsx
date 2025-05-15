import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/Dashboard";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import VirtualVet from './components/VirtualVet';
import SuccessStories from './components/SuccessStories';
import HowItWorks from './components/HowItWorks';
import ImpactTracker from './components/ImpactTracker';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero 
                  title="Be their Voice Save A Life" 
                  subtitle="Connect injured stray animals with local NGOs and rescue organizations. Together, we can make a difference."
                />
                <Index />
              </>
            } />
            <Route path="/virtual-vet" element={<VirtualVet />} />
            <Route path="/Success" element={<SuccessStories />} />
            <Route path="/works" element={<HowItWorks />} />
            <Route path="/track" element={<ImpactTracker />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
