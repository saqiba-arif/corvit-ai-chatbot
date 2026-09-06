// =================================================================
// Corvit Rawalpindi — real dataset, sourced from
// SRS-CORVIT-CHATBOT-2026-V6-FINAL
// Used by script.js as the offline fallback when the backend
// (app.py) is unavailable, and as the reference data your backend
// should also be built around.
// =================================================================

window.CORVIT_LOCAL_DATA = {

    campus: "2nd Floor, Zarwar Center, Main Murree Road, 6th Road Stop, Block A, Satellite Town, Rawalpindi.",

    courses: [
        {
            track: "AI & Python Development",
            fields: "AI, ML, DL, Computer Vision, NLP, Speech, GenAI, LLMs, Data Science, Data Analytics, Applied Math, Reinforcement Learning, Bioinformatics, FinTech, Healthcare AI, Autonomous Vehicles, MLOps, Information Retrieval, Knowledge Representation",
            tech: "Python, Pandas, NumPy, Scikit-Learn, PyTorch, TensorFlow, OpenCV, spaCy, Streamlit",
            trainer: "Mr. Farooq Shehzad"
        },
        {
            track: "Cyber Security & VAPT",
            fields: "Cybersecurity, Digital Forensics, Penetration Testing (VAPT), SOC Operations, Blockchain Auditing",
            tech: "CEH v12, CHFI, Wireshark, Metasploit, Fortinet Firewalls, Nmap",
            trainer: "Mr. Waseem Abbas"
        },
        {
            track: "Network Administration",
            fields: "Computer Networks, Enterprise Routing & Switching, IoT Infrastructure, Systems Administration",
            tech: "CCNA 200-301, CCNP Enterprise, IP Routing, OSPF, VLANs, Cisco Racks",
            trainer: "Ms. Haleema Sayyar"
        },
        {
            track: "MERN Stack Web Development",
            fields: "Web Development, Software Engineering, Mobile App Development (React Native), Database Management",
            tech: "MongoDB, Express.js, React.js, Node.js, REST APIs, JavaScript, React Native",
            trainer: "Mr. Mughees"
        },
        {
            track: "Cloud Computing & DevOps",
            fields: "Cloud Architecture, Data Engineering, Server Management, MLOps Infrastructure",
            tech: "AWS EC2/S3/Glue, Azure, MCSE, Docker, Virtualization, System Administration",
            trainer: "Ms. Abeera Javed"
        }
    ],

    timetable: [
        { course: "AI / Python (Afternoon)", days: "Mon–Fri", time: "02:00 PM – 04:00 PM", mode: "Onsite", trainer: "Mr. Farooq Shehzad" },
        { course: "AI / Python (Evening)", days: "Mon–Fri", time: "04:00 PM – 06:00 PM", mode: "Onsite", trainer: "Mr. Farooq Shehzad" },
        { course: "CCNA", days: "Mon–Fri", time: "04:00 PM – 05:00 PM", mode: "Onsite / Online", trainer: "Ms. Haleema Sayyar" },
        { course: "CCNP", days: "Mon–Fri", time: "05:00 PM – 06:00 PM", mode: "Onsite", trainer: "Ms. Haleema Sayyar" },
        { course: "CEH / CHFI Security", days: "Mon–Fri", time: "04:00 PM – 06:00 PM", mode: "Onsite", trainer: "Mr. Waseem Abbas" },
        { course: "MERN Stack Dev", days: "Mon–Fri", time: "04:00 PM – 06:00 PM", mode: "Onsite", trainer: "Mr. Mughees" },
        { course: "AWS Cloud", days: "Mon–Fri", time: "02:00 PM – 03:00 PM", mode: "Onsite", trainer: "Ms. Abeera Javed" }
    ],

    // Add real numbers here — leave empty and the bot stays honest
    // ("not loaded yet") instead of inventing a price.
    fees: [
        { course: "AI / Python", amount: "Free" },
        { course: "CCNA", amount: "Free" },
        { course: "CCNP", amount: "Free" },
        { course: "CEH / CHFI Security", amount: "Free" },
        { course: "MERN Stack", amount: "Free" },
        { course: "AWS Cloud", amount: "Free" }
    ],

    recommendationMatrix: [
        { field: "Artificial Intelligence", track: "AI & Python Development", tech: "Python, Scikit-Learn, PyTorch, Neural Networks" },
        { field: "Machine Learning", track: "AI & Python Development", tech: "Supervised/Unsupervised Learning, Regression, SVM" },
        { field: "Deep Learning", track: "AI & Python Development", tech: "PyTorch, Neural Networks, Backpropagation" },
        { field: "Computer Vision", track: "AI & Python Development", tech: "OpenCV, Torchvision, Image Classification, YOLO" },
        { field: "Natural Language Processing", track: "AI & Python Development", tech: "spaCy, NLTK, Transformers, Tokenization" },
        { field: "Speech Recognition", track: "AI & Python Development", tech: "Audio Signal Processing, Whisper API, Speech-to-Text" },
        { field: "Generative AI", track: "AI & Python Development", tech: "GANs, Diffusion Models, Prompt Engineering, LangChain" },
        { field: "Large Language Models", track: "AI & Python Development", tech: "Transformers, RAG Architecture, Fine-Tuning, Llama" },
        { field: "Data Science", track: "AI & Python Development", tech: "Pandas, NumPy, Matplotlib, Data Wrangling" },
        { field: "Data Analytics", track: "AI & Python Development", tech: "Exploratory Data Analysis, Pandas, Seaborn, Excel" },
        { field: "Data Engineering", track: "AI & Python Development + Cloud Computing & DevOps", tech: "SQL, Data Pipelines, ETL, AWS S3/Glue" },
        { field: "Mathematics / Applied Math", track: "AI & Python Development", tech: "Linear Algebra, Matrices, SVD, Calculus, Probability" },
        { field: "Cybersecurity", track: "Cyber Security & VAPT", tech: "Ethical Hacking, VAPT, Fortinet, Wireshark, SOC" },
        { field: "Internet of Things", track: "Network Administration + AI & Python Development", tech: "IP Routing, Network Protocols, Edge Hardware" },
        { field: "Robotics", track: "AI & Python Development + Network Administration", tech: "OpenCV Vision Systems, Embedded Kinematics" },
        { field: "Reinforcement Learning", track: "AI & Python Development", tech: "Q-Learning, Policy Gradients, Gym/Farama Environments" },
        { field: "AI in Bioinformatics", track: "AI & Python Development", tech: "Sequence Classification, Biological Data Pipelines" },
        { field: "AI in Finance / FinTech", track: "AI & Python Development", tech: "Time-Series Forecasting, Algorithmic Trading Models" },
        { field: "AI in Healthcare", track: "AI & Python Development", tech: "Medical Image Analysis (OpenCV/PyTorch DICOM)" },
        { field: "Autonomous Vehicles", track: "AI & Python Development", tech: "Object Detection, Lane Segmentation, Radar Processing" },
        { field: "Cloud Computing", track: "Cloud Computing & DevOps", tech: "AWS EC2, S3, IAM, Virtualization, Docker" },
        { field: "MLOps", track: "AI & Python Development + Cloud Computing & DevOps", tech: "Model Deployment, Streamlit Cloud, FastAPI, Docker" },
        { field: "Information Retrieval", track: "AI & Python Development", tech: "Vector Embeddings, RAG, ChromaDB, TF-IDF Search" },
        { field: "Knowledge Representation", track: "AI & Python Development", tech: "Knowledge Graphs, Ontologies, Semantic Search" },
        { field: "Blockchain", track: "Cyber Security & VAPT + MERN Stack Web Development", tech: "Smart Contract Auditing, Cryptography, Web3 APIs" },
        { field: "Software Engineering", track: "MERN Stack Web Development", tech: "System Design, OOP, REST APIs, Git Workflow" },
        { field: "Database Management", track: "MERN Stack Web Development + Cloud Computing & DevOps", tech: "MongoDB, SQLite, SQL Query Optimization, Indexing" },
        { field: "Computer Networks", track: "Network Administration", tech: "Routing Protocols, Switches, VLANs, Subnetting" },
        { field: "Web Development", track: "MERN Stack Web Development", tech: "HTML5, CSS3, JavaScript, React.js, Express, Node.js" },
        { field: "Mobile App Development", track: "MERN Stack Web Development", tech: "React Native Framework, Cross-Platform Mobile Apps" }
    ],

    infrastructure: [
        "High-Performance AI & Data Lab: workstations with dedicated NVIDIA GPUs, pre-configured Anaconda, PyTorch, TensorFlow, OpenCV and Jupyter environments.",
        "Cisco Hardware Rack Lab: physical Cisco Enterprise Routers (2900/3900 series), Layer 2/3 Switches (2960/3750), Fortinet Firewalls and patch panels.",
        "Server Room Infrastructure: dedicated rack servers hosting VMware ESXi hosts, an Active Directory domain controller lab, and NAS storage."
    ]
};