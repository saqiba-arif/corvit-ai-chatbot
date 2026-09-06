// =================================================================
// Corvit AI Support — client config
// NEVER put an API key here. This file is downloaded by every
// visitor's browser, so anything in it is public. The real key
// belongs in app.py's environment (.env, loaded server-side only).
// =================================================================

window.CORVIT_CONFIG = {
    // Point this at YOUR backend (app.py), not directly at Groq/OpenAI.
    // Your backend holds the real API key and forwards the request.
    apiEndpoint: "https://your-backend-domain.example.com/api/chat"
};
