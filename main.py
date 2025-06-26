from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import openai
import os
import requests
import json

app = FastAPI(title="Travel Santa Marta AI Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase configuration
SUPABASE_URL = "https://mhsmbwxdqymfihcoludw.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc21id3hkcXltZmloY29sdWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzYyMDAsImV4cCI6MjA2NjE1MjIwMH0.HCLGMlkFIbWab40YOQoJRpS6sY7uyR-vxqaVQkNgBgA"

# OpenAI configuration
openai.api_key = os.getenv("OPENAI_API_KEY")

BASE_PROMPT = """
You are a friendly travel assistant for TravelSantaMarta.com helping users plan a 1-week trip to Santa Marta, Colombia.

Ask about:
- Travel dates
- Interests (beaches, adventure, nature, romance, nightlife)
- Budget
- Group size

Use Joey's curated guide and recommend places like:
- Tayrona Park
- Minca waterfalls
- Gaira neighborhoods
- Local restaurants and beaches

At the end of your suggestions, politely ask for their name and email so Joey can send a custom itinerary and updates.

Be warm, helpful, and local.
"""

def save_to_supabase(data):
    """Save conversation to Supabase using direct HTTP requests"""
    try:
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/conversations",
            headers=headers,
            json=data
        )
        return response.status_code == 201
    except Exception as e:
        print(f"Supabase error: {e}")
        return False

@app.get("/")
async def root():
    """Serve the main HTML page"""
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            html_content = f.read()
        return HTMLResponse(content=html_content)
    except FileNotFoundError:
        # Fallback HTML if file doesn't exist
        return HTMLResponse(content="""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Travel Santa Marta - AI Assistant</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .container {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 600px;
                }
                h1 {
                    color: #2c3e50;
                    margin-bottom: 20px;
                }
                .status {
                    background: #e8f5e8;
                    border: 1px solid #4caf50;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                }
                .api-test {
                    background: #f5f5f5;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                }
                button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px;
                }
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }
                .response {
                    background: #f8f9fa;
                    border-radius: 10px;
                    padding: 15px;
                    margin: 10px 0;
                    text-align: left;
                    white-space: pre-wrap;
                }
                input {
                    width: 80%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin: 10px;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🌴 Travel Santa Marta - AI Assistant</h1>
                <p>Your AI travel assistant for the perfect Colombian adventure</p>
                
                <div class="status">
                    <h3>✅ Backend Status</h3>
                    <p>FastAPI server is running successfully!</p>
                </div>

                <div class="api-test">
                    <h3>🧪 Test the Chat API</h3>
                    <p>Try sending a message to test the AI assistant:</p>
                    <input type="text" id="messageInput" placeholder="Type your message here...">
                    <br>
                    <button onclick="sendMessage()">Send Message</button>
                    <button onclick="testConnection()">Test Connection</button>
                    
                    <div id="response" class="response" style="display: none;"></div>
                </div>

                <div style="margin-top: 30px;">
                    <p><strong>Next Steps:</strong></p>
                    <p>1. Add your OpenAI API key to environment variables</p>
                    <p>2. Deploy the React frontend to Vercel</p>
                    <p>3. Connect the frontend to this backend API</p>
                </div>
            </div>

            <script>
                async function sendMessage() {
                    const message = document.getElementById('messageInput').value;
                    if (!message) return;

                    const responseDiv = document.getElementById('response');
                    responseDiv.style.display = 'block';
                    responseDiv.textContent = 'Sending message...';

                    try {
                        const response = await fetch('/chat', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                message: message,
                                context: {}
                            }),
                        });

                        if (response.ok) {
                            const data = await response.json();
                            responseDiv.textContent = `AI Response: ${data.reply}`;
                        } else {
                            responseDiv.textContent = `Error: ${response.status} - ${response.statusText}`;
                        }
                    } catch (error) {
                        responseDiv.textContent = `Error: ${error.message}`;
                    }
                }

                async function testConnection() {
                    const responseDiv = document.getElementById('response');
                    responseDiv.style.display = 'block';
                    responseDiv.textContent = 'Testing connection...';

                    try {
                        const response = await fetch('/');
                        if (response.ok) {
                            responseDiv.textContent = '✅ Connection successful! Backend is running.';
                        } else {
                            responseDiv.textContent = `❌ Connection failed: ${response.status}`;
                        }
                    } catch (error) {
                        responseDiv.textContent = `❌ Connection error: ${error.message}`;
                    }
                }

                // Allow Enter key to send message
                document.getElementById('messageInput').addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            </script>
        </body>
        </html>
        """)

@app.post("/chat")
async def chat(request: Request):
    """Handle chat messages"""
    try:
        data = await request.json()
        user_message = data.get("message", "")
        context = data.get("context", {})

        if not user_message:
            return {"reply": "Please provide a message to chat with me!"}

        # Check if OpenAI API key is available
        if not openai.api_key:
            # Fallback response when OpenAI is not configured
            fallback_response = generate_fallback_response(user_message)
            return {"reply": fallback_response}

        messages = [
            {"role": "system", "content": BASE_PROMPT},
            {"role": "user", "content": user_message}
        ]

        try:
            completion = openai.ChatCompletion.create(
                model="gpt-4",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            reply = completion.choices[0].message.content
        except Exception as e:
            print(f"OpenAI API error: {e}")
            # Fallback response when OpenAI API fails
            reply = generate_fallback_response(user_message)

        # Save conversation to Supabase
        try:
            save_to_supabase({
                "lead_id": context.get("lead_id"),
                "message": user_message,
                "role": "user"
            })
            save_to_supabase({
                "lead_id": context.get("lead_id"),
                "message": reply,
                "role": "assistant"
            })
        except Exception as e:
            print(f"Failed to save to Supabase: {e}")

        return {"reply": reply}

    except Exception as e:
        print(f"Chat error: {e}")
        return {"reply": "I'm having trouble processing your message right now. Please try again in a moment!"}

def generate_fallback_response(user_message):
    """Generate a fallback response when OpenAI is not available"""
    user_message_lower = user_message.lower()
    
    if any(word in user_message_lower for word in ['hello', 'hi', 'hola', 'hey']):
        return "¡Hola! I'm your Santa Marta travel assistant. I'd love to help you plan your perfect Colombian adventure! 🌴\n\nCould you tell me when you're planning to visit and what interests you most?"
    
    if any(word in user_message_lower for word in ['beach', 'playa', 'ocean', 'sea']):
        return "Great choice! Santa Marta has amazing beaches. I'd recommend:\n\n• Playa Blanca - Crystal clear waters\n• Taganga - Perfect for diving\n• Rodadero - Popular with locals\n• Tayrona Park beaches - Stunning nature\n\nWhen are you planning to visit?"
    
    if any(word in user_message_lower for word in ['adventure', 'hiking', 'trek', 'mountain']):
        return "Adventure awaits! Here are some amazing options:\n\n• Tayrona National Park - Jungle and beach hiking\n• Minca - Waterfall hikes and coffee tours\n• Sierra Nevada - Indigenous villages\n• Ciudad Perdida trek - 4-day adventure\n\nWhat's your fitness level and time available?"
    
    if any(word in user_message_lower for word in ['budget', 'cost', 'price', 'expensive', 'cheap']):
        return "Santa Marta can fit any budget!\n\n• Budget: $30-50/day (hostels, street food)\n• Mid-range: $80-120/day (hotels, restaurants)\n• Luxury: $200+/day (resorts, tours)\n\nWhat's your budget range? I can recommend the best options!"
    
    if any(word in user_message_lower for word in ['food', 'restaurant', 'eat', 'dining']):
        return "The food in Santa Marta is incredible! Try:\n\n• Fresh seafood at the beach\n• Arepas and empanadas\n• Local coffee in Minca\n• Street food in the historic center\n\nDo you have any dietary restrictions?"
    
    return "Thanks for your message! I'm here to help you plan the perfect Santa Marta trip. 🌴\n\nTo give you the best recommendations, could you tell me:\n• When are you planning to visit?\n• What interests you most?\n• What's your budget?\n• How many people are traveling?\n\nI'd love to create a custom itinerary for you!"

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Travel Santa Marta AI Assistant"}

@app.get("/api/chat")
async def api_chat_redirect(request: Request):
    """Redirect /api/chat to /chat for compatibility"""
    return await chat(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 