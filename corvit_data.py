# =================================================================
# Corvit Rawalpindi — same dataset as data.js, in Python form,
# so app.py can feed it to the LLM as context.
# Keep this in sync with data.js whenever you update course info.
# =================================================================

CAMPUS = "2nd Floor, Zarwar Center, Main Murree Road, 6th Road Stop, Block A, Satellite Town, Rawalpindi."

COURSES = [
    {"track": "AI & Python Development", "trainer": "Mr. Farooq Shehzad",
     "tech": "Python, Pandas, NumPy, Scikit-Learn, PyTorch, TensorFlow, OpenCV, spaCy, Streamlit"},
    {"track": "Cyber Security & VAPT", "trainer": "Mr. Waseem Abbas",
     "tech": "CEH v12, CHFI, Wireshark, Metasploit, Fortinet Firewalls, Nmap"},
    {"track": "Network Administration", "trainer": "Ms. Haleema Sayyar",
     "tech": "CCNA 200-301, CCNP Enterprise, IP Routing, OSPF, VLANs, Cisco Racks"},
    {"track": "MERN Stack Web Development", "trainer": "Mr. Mughees",
     "tech": "MongoDB, Express.js, React.js, Node.js, REST APIs, JavaScript, React Native"},
    {"track": "Cloud Computing & DevOps", "trainer": "Ms. Abeera Javed",
     "tech": "AWS EC2/S3/Glue, Azure, MCSE, Docker, Virtualization, System Administration"},
]

TIMETABLE = [
    {"course": "AI / Python (Afternoon)", "days": "Mon–Fri", "time": "02:00 PM – 04:00 PM", "mode": "Onsite", "trainer": "Mr. Farooq Shehzad"},
    {"course": "AI / Python (Evening)", "days": "Mon–Fri", "time": "04:00 PM – 06:00 PM", "mode": "Onsite", "trainer": "Mr. Farooq Shehzad"},
    {"course": "CCNA", "days": "Mon–Fri", "time": "04:00 PM – 05:00 PM", "mode": "Onsite / Online", "trainer": "Ms. Haleema Sayyar"},
    {"course": "CCNP", "days": "Mon–Fri", "time": "05:00 PM – 06:00 PM", "mode": "Onsite", "trainer": "Ms. Haleema Sayyar"},
    {"course": "CEH / CHFI Security", "days": "Mon–Fri", "time": "04:00 PM – 06:00 PM", "mode": "Onsite", "trainer": "Mr. Waseem Abbas"},
    {"course": "MERN Stack Dev", "days": "Mon–Fri", "time": "04:00 PM – 06:00 PM", "mode": "Onsite", "trainer": "Mr. Mughees"},
    {"course": "AWS Cloud", "days": "Mon–Fri", "time": "02:00 PM – 03:00 PM", "mode": "Onsite", "trainer": "Ms. Abeera Javed"},
]

# All free for now — edit per-course if that changes.
FEES = [
    {"course": "AI / Python", "amount": "Free"},
    {"course": "CCNA", "amount": "Free"},
    {"course": "CCNP", "amount": "Free"},
    {"course": "CEH / CHFI Security", "amount": "Free"},
    {"course": "MERN Stack", "amount": "Free"},
    {"course": "AWS Cloud", "amount": "Free"},
]

INFRASTRUCTURE = [
    "High-Performance AI & Data Lab: workstations with dedicated NVIDIA GPUs, pre-configured Anaconda, PyTorch, TensorFlow, OpenCV and Jupyter environments.",
    "Cisco Hardware Rack Lab: physical Cisco Enterprise Routers (2900/3900 series), Layer 2/3 Switches (2960/3750), Fortinet Firewalls and patch panels.",
    "Server Room Infrastructure: dedicated rack servers hosting VMware ESXi hosts, an Active Directory domain controller lab, and NAS storage.",
]


def build_context_block() -> str:
    """Formats all the institute data into plain text the LLM can read as ground truth."""
    lines = [f"CAMPUS ADDRESS: {CAMPUS}", ""]

    lines.append("COURSE TRACKS:")
    for c in COURSES:
        lines.append(f"- {c['track']} | Trainer: {c['trainer']} | Tech: {c['tech']}")
    lines.append("")

    lines.append("TIMETABLE:")
    for t in TIMETABLE:
        lines.append(f"- {t['course']}: {t['days']}, {t['time']} ({t['mode']}) — Trainer: {t['trainer']}")
    lines.append("")

    lines.append("FEES:")
    for f in FEES:
        lines.append(f"- {f['course']}: {f['amount']}")
    lines.append("")

    lines.append("INFRASTRUCTURE:")
    for i in INFRASTRUCTURE:
        lines.append(f"- {i}")

    return "\n".join(lines)