import time
import urllib.parse
import webbrowser
import pyautogui
from nlp import final_report

whatsapp_number = "+919730182225" 
message = final_report

encoded_message = urllib.parse.quote(message)  
whatsapp_url = f"whatsapp://send?phone={whatsapp_number}&text={encoded_message}"

print("⏳ Opening WhatsApp Desktop App...")
webbrowser.open(whatsapp_url)

time.sleep(5)

print("⏳ Sending message...")
pyautogui.press("enter")  

print("✅ Message Sent Successfully! 🚀")
