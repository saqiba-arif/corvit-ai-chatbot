# Corvit AI Support Chatbot

## Setup on Replit
1. Upload all these files to your Repl (Flask template).
2. Left sidebar -> Secrets (padlock icon) -> add key GROQ_API_KEY = your new Groq key.
   Do NOT put it in any .js or .py file.
3. Click Run. Replit installs requirements.txt and starts app.py automatically.
4. Copy the URL Replit gives you (e.g. https://your-repl-name.username.repl.co)
5. Edit config.js and set:
   apiEndpoint: "https://your-repl-name.username.repl.co/api/chat"
6. Open index.html and test: "hi", "slam", "CCNA timetable", "fee", "recommend a course for cybersecurity".

## Files
- index.html / style.css - site + chat widget UI
- data.js - course/timetable/fee data used by the offline fallback in script.js
- script.js - chat widget logic + offline fallback matching
- config.js - points frontend at your backend (no secrets)
- app.py - Flask backend, calls Groq API using the key from environment
- corvit_data.py - Python copy of the dataset, fed to the AI as context so it
  answers accurately on Corvit specifics while still handling general chat
- requirements.txt - Python dependencies
- .env.example - template for local-machine use only (Replit uses Secrets instead)

## Security
Never put the real API key in config.js, data.js, script.js, or index.html.
It belongs only in Replit Secrets (or a local .env file that's gitignored).
