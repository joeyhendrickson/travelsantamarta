from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import openai
import os
from backend.supabase_client import supabase
from backend.prompt_template import BASE_PROMPT

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
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
    """

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message")
    context = data.get("context", {})

    messages = [
        {"role": "system", "content": BASE_PROMPT},
        {"role": "user", "content": user_message}
    ]

    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages
    )

    reply = completion.choices[0].message.content

    # Optionally save conversation
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

    return {"reply": reply}
