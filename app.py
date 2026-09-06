import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from corvit_data import build_context_block

load_dotenv()  # reads .env in this folder and sets the env vars

app = Flask(__name__)
CORS(app)  # allow your frontend origin to call this backend

# The real key lives ONLY here, read from the environment.
# Set it with: export GROQ_API_KEY="your_new_key_here"
# or put it in a local .env file (see .env.example) and load it
# with python-dotenv — never hardcode it in this file either.
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "openai/gpt-oss-120b"

# Built once at startup from corvit_data.py — keep that file updated
# whenever your courses/timetable/fees change.
CORVIT_CONTEXT = build_context_block()

SYSTEM_PROMPT = f"""You are the Corvit Institute Rawalpindi admissions assistant — friendly,
helpful, and conversational, like a knowledgeable front-desk staff member.

You can hold normal, general conversation (greetings, small talk, general
career or tech questions) naturally, the way any helpful assistant would.

Whenever a question touches on Corvit's own courses, timetable, trainers,
fees, admissions, or campus facilities, you MUST answer only using the
verified data below — never guess, invent, or estimate any of these details.
If the data below doesn't cover something asked (e.g. a fee that isn't
listed, an exact address for a different campus), say so honestly and
suggest they confirm with the campus directly, instead of making something up.

=== VERIFIED CORVIT DATA ===
{CORVIT_CONTEXT}
=== END OF VERIFIED DATA ===

Keep answers concise and conversational — a few sentences, not long essays,
unless the person asks for detail."""


@app.route("/api/chat", methods=["POST"])
def chat():
    if not GROQ_API_KEY:
        return jsonify({"reply": "Server is missing its API key configuration."}), 500

    user_msg = request.json.get("message", "")
    history = request.json.get("history", [])  # optional: [{role, content}, ...]
    if not user_msg:
        return jsonify({"reply": "Please type a question."}), 400

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(history[-10:])  # keep last few turns so replies stay small
    messages.append({"role": "user", "content": user_msg})

    try:
        resp = requests.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={"model": MODEL, "messages": messages},
            timeout=15,
        )
        resp.raise_for_status()
        reply_text = resp.json()["choices"][0]["message"]["content"]
        return jsonify({"reply": reply_text})
    except Exception as e:
        print("Groq API error:", e)
        return jsonify({"reply": "Sorry, I'm having trouble reaching the assistant right now."}), 502


if __name__ == "__main__":
    app.run(port=5000, debug=True)
