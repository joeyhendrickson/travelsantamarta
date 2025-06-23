from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

# Mount static files
app.mount("/static", StaticFiles(directory="backend/static"), name="static")

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
async def root():
    return FileResponse("backend/static/index.html")

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
