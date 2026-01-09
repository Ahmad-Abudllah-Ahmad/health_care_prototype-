Okay basically we participated in hackathon and they gave us this theme (health) and gave us 7-case-studies. After careful review each. we came with idea with the case-study 1.


As you can see I attached the rough written text and overview of what we are building.


so basically we will go with step by step implementation. 


Make me correct if I am wrong.

tech stacks

we are using nextjs for web interface development, langchain for agentic oreshtration, login/sign via betterauth storing data in supabase, elevenlabs api used for voice agents, pinecone vector db as we are storing embedding of this datasets in this

MedQA: GitHub Link.

● PubMedQA: GitHub Link.

● MedMCQA: MedMCQA Website.

--

This is for ai to relate the question/query of the patient with the pinecone database and the medical history of the patient and then make the counter clarification question to the patient for example if patient say `i have pain in chest` the ai took three things - user query, pinecone database, user medical history and link to certain diease for example let suppose cardiac perfusion, as ai look and narrow down it prediction like can ask other symptoms of cardiac perfusion before came to conclusion like ai ask - `does you have yellow eyes` the patient (user) says no and it leads to some other diease with symtom of chest pain and no yellow eyes - ai narrow down to that diease, I hope you understand This conversion longs almost you can 3-10 mins and when the ai finalized or have high probabitlity of diagonsis AI says `thanks for the information, you query is passed to the doctor something like this.`

Something like this.



As I have given the system architecture design ---> 

I want to know how it works perfectly with which stacks, will our stacks enough or should we add some more.



below is detail of architecture diagram -

There will be two portals - one doctor and one patient.

The patient login/signup ---> On first login --> Greeting popup or some animation occur which says like `Hi Kaleem, welcome to our platform, let do tidbits about your medical history` The vocie agent should be multilingual so we default use urdu language for it so AI ask approx 10-20 questions related to medical history like general to all people like any family heredity issues, diabetes, cancer, heart diease etc. After that The popup or some animation says `Thanks for sharing your medical history Now let chat/talk about your real problem`. Now the user is directed to the interface with two tabs one is for Clinial interview/Session, Doctor Preception or SOAP status/ review etc something. Initially the Doctor Preception tab will be empty and the patient starts with clinical interview/session ---> Now this gives you two option, one is real-time voice like conversation or secondly is by chat.(NOTE - In all modules it should be support both urdu and english). let's say the user starts with text so as above example given (This conversation longs till 3-10 mins max) or you can say untill the ai find out the accurate or 95% threshold accuracy that this diagnosis is correct. When the conversion ends it says thanks the diagnosis has been shared with the doctor.

So here it generate the SOAP report format with detail and everything medical history of patient, info and all the SOAP  that AI thought, with this generated report with also generate a label you can like if it is more about heart diease we select the department Cardiologist like. as it is assigned to cardiology department.

So on doctor portal same workflow like login/signup and then doctor select the department in which he is. And then we show the Pending Reports, In Review, Reviewed tabs. and as the above patient SOAP format generated pdf report is visble here in pending tab the doctor could read out the pdf directly or have option to chat with the chatbot which have only that generated report context or you can say doctor can do questions/answer from pdf. And in both cases it will ask to review that IS DIAGONSIS CORRECT/ACCEPTABLE or it is completely red flag diagnosis. If it is red flag the report is resend to llm and it thinks, check database and check whether it made mistake and correct it and then regenerate the report. This process continues until the red flag is gone and the doctor is satidfied with the diagnosis. Then after careful review of report The doctor then write himself the perception or test or suggestion or recommendation like to do this test or this etc. After this is done and sent. In patient portal, in Doctor Preception or report status tab is updated and the report written by doctor is shared.

This is basically complete workflow in the architecture.

Now, what I need to clarify is these things (Kindly correct if I am missing something or not accurate or could suggest right way) 
--- 

we do login/signup via betterauth and store data in supabase. The voice agent (First Agent asking medical history) uses LLM (basically gemini 3 api) connected with system prompt etc. Then the medical history data should be stored in supabase or pinecone. Then the 2nd chatbot ---> which tackle with real problem uses ---> user query, system prompt, medical history data, pinecone embebbed data (MedMCQA and MedQA), so LLM response to the user query with these things. Then we use AI to generate the Clinical Narration SOAP Report. 

Kindly clear the workflow we use and the final techstack we are using.


NOTE - The LLM should talk like talking to children level (The persona of LLM agent will never use the complex jargons, terms used in medical exam it will ask simple and yet easily question something like this
Agent Translation Levels:
● Level 1: 5th-grade literacy (analogies).
● Level 2: High-school graduate.
● Level 3: College-educated.
● Contextual adaptation: e.g., Diabetes → "بیماری کی شوگر".
 like this app should work for peoples like Rural patients often do not understand complex English medical terminology)

