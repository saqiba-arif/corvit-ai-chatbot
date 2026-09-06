// =================================================================
// Corvit AI Support — widget behavior
// Assumes config.js exposes CORVIT_CONFIG.apiEndpoint
// and data.js exposes CORVIT_LOCAL_DATA (used as an offline fallback)
// =================================================================

const launchButtons = document.querySelectorAll('.launch-chat');
const panel = document.getElementById('chatPanel');
const closeBtn = document.getElementById('chatClose');
const thread = document.getElementById('chatThread');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const quickReplyBar = document.getElementById('quickReplies');

function openChat() {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    input.focus();
}

function closeChat() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
}

launchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        panel.classList.contains('is-open') ? closeChat() : openChat();
    });
});
closeBtn.addEventListener('click', closeChat);

// ---- message rendering -------------------------------------------------

function addMessage(text, sender = 'bot', imageUrl = null) {
    const bubble = document.createElement('div');
    bubble.className = `msg msg-${sender}`;
    // Preserve line breaks (timetable answers now come back multi-line)
    text.split('\n').forEach((line, i) => {
        if (i > 0) bubble.appendChild(document.createElement('br'));
        bubble.appendChild(document.createTextNode(line));
    });
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Corvit assistant attachment';
        bubble.appendChild(img);
    }
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
    return bubble;
}

function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'msg-typing';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    thread.appendChild(typing);
    thread.scrollTop = thread.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// ---- sending a question --------------------------------------------------

let conversationHistory = []; // [{role: 'user'|'assistant', content: '...'}]

async function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    if (quickReplyBar) quickReplyBar.remove();
    showTyping();

    const reply = await getBotReply(text);

    hideTyping();
    addMessage(reply.text, 'bot', reply.imageUrl || null);
}

// Step 1 (course recommendation) + Step 2 (timetable/fees/admissions)
// live here. Primary: call the backend (app.py), which holds the real
// API key server-side and does the RAG/web-search lookup. Fallback:
// search the local dataset bundled in data.js. Last resort: a safe,
// honest fallback message that never invents facts.
async function getBotReply(question) {
    try {
        if (window.CORVIT_CONFIG && window.CORVIT_CONFIG.apiEndpoint) {
            const res = await fetch(window.CORVIT_CONFIG.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question, history: conversationHistory })
            });
            if (!res.ok) throw new Error('Bad response from server');
            const data = await res.json();
            // Remember this exchange for the next turn.
            conversationHistory.push({ role: 'user', content: question });
            conversationHistory.push({ role: 'assistant', content: data.reply });
            return { text: data.reply, imageUrl: data.imageUrl || null };
        }
        throw new Error('No API endpoint configured');
    } catch (err) {
        console.warn('Primary chatbot API failed, using local fallback:', err);
        return localFallbackReply(question);
    }
}

// Helper: does any "significant" word (len > 2) from `label` appear in `q`?
function wordsOverlap(label, q) {
    return label
        .toLowerCase()
        .replace(/[()/]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2)
        .some(w => q.includes(w));
}

function localFallbackReply(question) {
    const q = question.toLowerCase().trim();
    const data = window.CORVIT_LOCAL_DATA || {};

    // 0) Greetings — plain "hi"/"hello" shouldn't fall through to the
    //    "not sure" message.
    if (/^(hi|hello|hey|salam|assalam|asalam|slam|aoa|asa)\b/.test(q)) {
        return { text: "Hi! We can have a general conversation, or I can help with Corvit courses, timetables, fees, trainers and admissions. What would you like to talk about?" };
    }

    // Keep the interface useful for basic conversation when the backend key
    // has not been configured yet. The live backend handles open-ended chat.
    if (/how are you|what can you do|general conversation|who are you/.test(q)) {
        return { text: "I'm Corvit's AI assistant. I can chat about general topics and technology, or help with Corvit courses, timetables, fees, trainers and admissions. Ask me anything to get started." };
    }

    // 1) Timetable / schedule questions — try to answer for the SPECIFIC
    //    course asked about first (e.g. "when is CCNA" -> just CCNA rows),
    //    and only fall back to the full table if nothing specific matched.
    if (/timetable|schedule|batch|timing|time table|days|when (is|does)|class/.test(q) && data.timetable) {
        const specific = data.timetable.filter(t => wordsOverlap(t.course, q));
        const rowsToShow = specific.length ? specific : data.timetable;
        const rows = rowsToShow
            .map(t => `${t.course}: ${t.days}, ${t.time} (${t.mode}) — Trainer: ${t.trainer}`)
            .join('\n');
        return { text: rows };
    }

    // 2) Try to match a specific field from the 30-field recommendation matrix
    //    (e.g. "robotics", "blockchain", "cloud computing").
    if (data.recommendationMatrix) {
        const hit = data.recommendationMatrix.find(row => q.includes(row.field.toLowerCase()))
            || data.recommendationMatrix.find(row => wordsOverlap(row.field, q));
        if (hit) {
            return {
                text: `For ${hit.field}, go with our ${hit.track}. It covers ${hit.tech}. Want the timetable for it?`
            };
        }
    }

    // 3) General course/track questions.
    if (/course|recommend|track|learn|career|which one/.test(q) && data.courses) {
        const names = data.courses.map(c => c.track).join(', ');
        return { text: `Our 5 main tracks are: ${names}. Tell me the field you're interested in (e.g. AI, cybersecurity, networking, web development, cloud) and I'll point you to the right one.` };
    }

    // 4) Trainer questions — also try to narrow to a specific course first.
    if (/trainer|instructor|teacher|who teaches/.test(q) && data.courses) {
        const specific = data.courses.filter(c => wordsOverlap(c.track, q) || wordsOverlap(c.fields, q));
        const rowsToShow = specific.length ? specific : data.courses;
        const rows = rowsToShow.map(c => `${c.track} — ${c.trainer}`).join(' | ');
        return { text: rows };
    }

    // 5) Infrastructure / lab / hardware questions.
    if (/lab|hardware|infrastructure|equipment|gpu|server|cisco|rack/.test(q) && data.infrastructure) {
        return { text: data.infrastructure.join(' ') };
    }

    // 6) Fees — use real numbers from data.js if you've added them,
    //    otherwise stay honest instead of inventing a price.
    if (/fee|cost|price|charges/.test(q)) {
        if (data.fees && data.fees.length) {
            const specific = data.fees.filter(f => wordsOverlap(f.course, q));
            const rowsToShow = specific.length ? specific : data.fees;
            const allFree = rowsToShow.every(f => f.amount.toLowerCase() === "free");
            if (allFree) {
                const names = rowsToShow.map(f => f.course).join(', ');
                return { text: `Good news — ${names} ${rowsToShow.length > 1 ? 'are' : 'is'} currently free of charge at Corvit! Let me know which one you'd like to enroll in.` };
            }
            const rows = rowsToShow.map(f => `${f.course}: ${f.amount}`).join(' | ');
            return { text: rows };
        }
        return { text: "I don't have exact fee figures loaded yet — please confirm with the admissions desk at our campus, and I'll be able to quote them directly once that data is added." };
    }

    // 7) Admissions.
    if (/admission|apply|enroll|register/.test(q)) {
        return { text: `You can visit our campus at ${data.campus || 'the Corvit Rawalpindi campus'} to apply, or let me know which track you want and I'll point you to the enrollment steps.` };
    }

    // 8) Fallback model — last resort, never invents facts.
    return {
        text: "I'm not fully sure about that one yet — please check corvit.com or visit our campus, and I'll keep learning to answer this directly next time."
    };
}

// ---- form + quick replies ------------------------------------------------

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    handleUserMessage(text);
});

if (quickReplyBar) {
    quickReplyBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        handleUserMessage(chip.dataset.prompt);
    });
}
