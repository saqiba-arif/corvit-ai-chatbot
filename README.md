# Corvit AI Support Chatbot

## Setup on Replit
1. In the Replit Secrets panel, add `GROQ_API_KEY` with a newly created Groq key.
   Do **not** put the key in any `.js`, `.py`, HTML, or committed file.
2. Start the app. The Flask server serves the website and `/api/chat` from the
   same origin, so no domain needs to be copied into `config.js`.
3. Test both modes with general questions such as "Explain what Python is" and
   Corvit questions such as "Show me the CCNA timetable" or "What courses do
   you recommend for cybersecurity?"

## Files
- index.html / style.css - site + chat widget UI
- data.js - course/timetable/fee data used by the offline fallback in script.js
- script.js - chat widget logic + offline fallback matching
- config.js - points the frontend to the same-origin backend (no secrets)
- app.py - Flask backend, calls Groq API using the key from environment
- corvit_data.py - Python copy of the dataset, fed to the AI as context so it
  answers accurately on Corvit specifics while still handling general chat
- requirements.txt - Python dependencies
- .env.example - template for local-machine use only (Replit uses Secrets instead)

## Security
Never put the real API key in config.js, data.js, script.js, or index.html.
It belongs only in Replit Secrets (or a local .env file that's gitignored).
