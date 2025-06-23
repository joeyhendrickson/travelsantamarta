# Travel Santa Marta AI Assistant - Vercel Serverless Function
# Updated: OpenAI API key configured in Vercel environment variables

from http.server import BaseHTTPRequestHandler
import json
import os
from supabase import create_client

# Supabase configuration
SUPABASE_URL = "https://mhsmbwxdqymfihcoludw.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc21id3hkcXltZmloY29sdWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzYyMDAsImV4cCI6MjA2NjE1MjIwMH0.HCLGMlkFIbWab40YOQoJRpS6sY7uyR-vxqaVQkNgBgA"

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# AI Prompt Template
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

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            html_content = """
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
                        <p>Python serverless function is running successfully!</p>
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
                        <p>1. Add your OpenAI API key to Vercel environment variables</p>
                        <p>2. Deploy the React frontend separately</p>
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
                            const response = await fetch('/api/chat', {
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
            """
            
            self.wfile.write(html_content.encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_POST(self):
        if self.path == '/api/chat':
            # Get the request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_message = data.get("message")
            context = data.get("context", {})

            # For now, return a simple response since we need to handle OpenAI API
            # You'll need to add your OpenAI API key to Vercel environment variables
            reply = f"Thank you for your message: '{user_message}'. This is a test response. Please add your OpenAI API key to Vercel environment variables to enable full AI functionality."

            # Save to Supabase
            try:
                supabase.table("conversations").insert({
                    "lead_id": context.get("lead_id"),
                    "message": user_message,
                    "role": "user"
                }).execute()
                supabase.table("conversations").insert({
                    "lead_id": context.get("lead_id"),
                    "message": reply,
                    "role": "assistant"
                }).execute()
            except Exception as e:
                print(f"Supabase error: {e}")

            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            response_data = {"reply": reply}
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers() 