# 🏥 Project: Agentic AI Healthcare Interface (Multi-Step Clinical Interview Agent)

## 📋 Overview
[cite_start]An autonomous clinical intelligence system designed to bridge the gap in rural healthcare by conducting thorough 15-minute adaptive interviews[cite: 22, 30]. [cite_start]The system identifies medical "Red Flags" [cite: 56, 113] [cite_start]and generates structured SOAP summaries for doctors[cite: 42, 114].

---

## 🛠 Technical Stack
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** | Unified web interface for Patient and Doctor Portals. |
| **Auth & Database** | **BetterAuth + Supabase** | Secure login/signup and relational storage of patient history and reports. |
| **Orchestration** | **LangChain / LangGraph** | [cite_start]Agentic multi-step reasoning and state management[cite: 155]. |
| **LLM (Reasoning)** | **Gemini 1.5 Flash / Pro** | [cite_start]High-performance reasoning with strong Urdu language support[cite: 155]. |
| **Vector DB** | **Pinecone** | [cite_start]RAG for MedQA, PubMedQA, and MedMCQA datasets[cite: 127, 128, 129, 130, 155]. |
| **Voice / TTS** | **ElevenLabs API** | Multilingual voice (Liam/Urdu) for empathetic patient interaction. |
| **STT (Speech-to-Text)** | **OpenAI Whisper** | Converting real-time patient voice into text for the LLM. |

---

## 🔄 System Workflow & Architecture

### 1. Patient Portal (The Interview)
* **Greeting & History:** Upon first login, a voice agent asks 10-20 general Q&A about medical history (Family history, allergies, chronic conditions).
* **The Interview Agent:**
    * **Inputs:** User Query + Pinecone (Medical Knowledge) + Supabase (History).
    * [cite_start]**Persona:** 5th-grade literacy level (Level 1)[cite: 87].
    * [cite_start]**Adaptation:** Uses analogies (e.g., "Bimari ki Sugar" instead of Diabetes Mellitus)[cite: 93].
    * **Threshold:** Continues for 3–10 minutes or until 95% accuracy threshold for diagnosis is met.

### 2. Clinical Documentation (The SOAP Report)
* [cite_start]**SUBJECTIVE:** Patient’s chief complaint and history in their words[cite: 44].
* [cite_start]**OBJECTIVE:** Recorded symptoms and vital signs[cite: 44].
* [cite_start]**ASSESSMENT:** High-priority suspected diagnosis and red-flag analysis[cite: 46].
* [cite_start]**PLAN:** Immediate next steps (e.g., "Urgent Blood Glucose test")[cite: 47].

### 3. Doctor Portal (The Review)
* **Dashboard:** View "Pending," "In Review," and "Reviewed" reports.
* **Interaction:** Doctors can read the PDF report or chat with a bot trained specifically on that patient's session context.
* **Verification:** * If **REJECTED**: Feedback is sent back to the LLM to re-evaluate Pinecone data and fix errors.
    * If **ACCEPTED**: Doctor adds personal recommendations/prescriptions.

---

## ⚖️ Safety & Constraints
* [cite_start]**Clinical Safety:** Zero false negatives on Red Flags (e.g., Chest pain = Immediate Triage)[cite: 172].
* [cite_start]**Boundaries:** The system is a decision-support tool, NOT a replacement for a doctor[cite: 116, 117].
* [cite_start]**Hallucination Prevention:** Strict grounding in the provided official datasets[cite: 127, 172].

---

## 🎯 Success Metrics (Judging)
* [cite_start]**Clinical Safety (35 pts):** Accuracy in detecting emergency red flags[cite: 172].
* [cite_start]**Agentic Sophistication (25 pts):** Multi-step reasoning vs. simple chatbot response[cite: 173].
* [cite_start]**Communication (20 pts):** Cultural empathy and language handling[cite: 173].