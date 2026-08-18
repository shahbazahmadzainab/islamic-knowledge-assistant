import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

load_dotenv()

app = FastAPI(title="Islamic ChatKit Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

WORKFLOW_ID = os.getenv("VITE_CHATKIT_WORKFLOW_ID")


@app.get("/")
def home():
    return {
        "message": "Islamic ChatKit Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.post("/api/chatkit/session")
def create_chatkit_session():

    if not WORKFLOW_ID:
        raise HTTPException(
            status_code=500,
            detail="VITE_CHATKIT_WORKFLOW_ID is missing"
        )

    try:
        session = client.beta.chatkit.sessions.create(
            workflow={
                "id": WORKFLOW_ID
            },
            user="local-user"
        )

        return {
            "client_secret": session.client_secret
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )