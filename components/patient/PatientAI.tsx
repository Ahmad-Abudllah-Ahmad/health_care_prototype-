"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Loader2, ShieldAlert, FileCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type ChatState = "GREETING" | "HISTORY" | "SYMPTOMS" | "ANALYZING" | "COMPLETE";

export default function PatientAI() {
    const [state, setState] = useState<ChatState>("GREETING");
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial Greeting
    useEffect(() => {
        if (state === "GREETING" && messages.length === 0) {
            simulateAgentResponse("Hello, I am your Sehat Guftagu Assistant. I'm here to gather some preliminary information for Dr. Sarah. \n\nTo start, could you please tell me if you have any past medical history or chronic diseases (e.g., Diabetes, Hypertension)?");
            setState("HISTORY");
        }
    }, [state]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const simulateAgentResponse = (text: string, delay = 1000) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now(), role: "agent", content: text }]);
            setIsTyping(false);
        }, delay);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Safety Guardrail: Check for medication requests
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("medicine") || lowerInput.includes("drug") || lowerInput.includes("prescribe") || lowerInput.includes("medication") || lowerInput.includes("tablet")) {
            simulateAgentResponse("I apologize, but I am an AI assistant designed to gather information for your doctor. I cannot prescribe medication or provide medical advice. \n\nPlease discuss treatment options directly with Dr. Sarah during your consultation.");
            return;
        }

        // State Machine Logic
        if (state === "HISTORY") {
            simulateAgentResponse("Thank you for sharing that. \n\nNow, could you please describe in detail the current problem or symptoms you are facing today?");
            setState("SYMPTOMS");
        } else if (state === "SYMPTOMS") {
            setIsTyping(true);
            setState("ANALYZING");

            // Artificial delay for "Analysis"
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    role: "agent",
                    content: "Thank you. I have analyzed your symptoms and generated a preliminary clinical report."
                }]);

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        role: "system",
                        content: "Report forwarded to Dr. Sarah successfully."
                    }]);
                    setState("COMPLETE");
                }, 800);

            }, 2000);
        } else if (state === "COMPLETE") {
            simulateAgentResponse("Your information has already been sent to Dr. Sarah. She will review it shortly. Is there anything else you'd like to add to the notes?");
        }
    };

    return (
        <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Medical Assistant</h3>
                        <p className="text-xs text-green-600 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                {state === "COMPLETE" && (
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center border border-green-100">
                        <FileCheck className="w-3 h-3 mr-1.5" />
                        Report Ready
                    </div>
                )}
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-6 bg-slate-50/50 scroll-smooth">
                {/* Disclaimer */}
                <div className="flex justify-center">
                    <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 text-xs px-4 py-2 rounded-lg flex items-start max-w-md">
                        <ShieldAlert className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <p>This automated interview helps your doctor prepare. The AI <strong>does not</strong> provide diagnosis or prescriptions.</p>
                    </div>
                </div>

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'system' ? (
                                <div className="w-full flex justify-center my-2">
                                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                                        {msg.content}
                                    </span>
                                </div>
                            ) : (
                                <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-primary/10 text-primary'}`}>
                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                        }`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={state === 'ANALYZING' || isTyping}
                        placeholder={state === 'ANALYZING' ? "Analyzing symptoms..." : "Type your answer..."}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl h-12 pl-4 pr-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || state === 'ANALYZING' || isTyping}
                        className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 shrink-0"
                    >
                        {state === 'ANALYZING' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
