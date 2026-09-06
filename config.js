// =================================================================
// Corvit AI Support — client config
// NEVER put an API key here. This file is downloaded by every
// visitor's browser, so anything in it is public. The real key
// belongs in app.py's environment (.env, loaded server-side only).
// =================================================================

window.CORVIT_CONFIG = {
    // The Flask app serves both this page and the API. Keeping this relative
    // means it works in Replit preview, local development, and deployment.
    // The Groq key stays server-side in Replit Secrets.
    apiEndpoint: "/api/chat"
};
