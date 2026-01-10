"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles, FileText, CheckCircle, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DoctorAIProps {
    onAction: (action: string, content: string) => void;
}

export default function DoctorAI({ onAction }: DoctorAIProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Mock Initial Analysis (Simulating data received from Patient Chat)
    useEffect(() => {
        const initialReport = {
            id: 1,
            role: "assistant",
            content: `**Patient Report (Ahsan Khan #8492)**
**Source**: Patient AI Interview

**History**: Hypertension (2020), High Cholesterol.
**Complaint**: "Severe headache, blurred vision, dizziness."
**Risk**: High (Hypertensive Urgency?).
**Plan**: Check BP, R/O Neuro issues.`,
            type: "report",
            data: {
                summary: "Patient reports severe headache, blurred vision, and dizziness. History of HTN.",
                vitals_analysis: "Immediate BP check required.",
                risk_factors: "Hypertension, potential urgency."
            }
        };

        setTimeout(() => {
            setMessages([initialReport]);
        }, 500);
    }, []);

    const handleSend = (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim()) return;

        const userMsg = { id: Date.now(), role: "user", content: textToSend };
        setMessages(prev => [...prev, userMsg]);

        const lowerInput = textToSend.toLowerCase();
        let aiResponseContent = "";

        // Text-to-Action Logic
        if (lowerInput.startsWith("assessment:") || lowerInput.startsWith("add assessment")) {
            const content = input.replace(/assessment:|add assessment/i, "").trim();
            onAction("add_assessment", content);
            aiResponseContent = `Added to Assessment: "${content}"`;
        } else if (lowerInput.startsWith("plan:") || lowerInput.startsWith("add plan")) {
            const content = input.replace(/plan:|add plan/i, "").trim();
            onAction("add_plan", content);
            aiResponseContent = `Added to Plan: "${content}"`;
        } else if (lowerInput.includes("approve")) {
            // Simulate finalizing the plan
            const planData = "Start Amlodipine 5mg daily. Monitor BP twice daily. Follow up in 1 week.";
            localStorage.setItem("consultation_status", "approved");
            localStorage.setItem("consultation_plan", planData);
            // Also trigger the parent 'fill' action with the plan data
            onAction("fill_soap", JSON.stringify({ plan: planData }));

            aiResponseContent = "Consultation Approved. Plan sent to Patient Portal.";
        } else {
            // General Chat
            aiResponseContent = "I've noted that. You can also type 'Plan: [text]' to update the SOAP note directly.";
        }

        setInput("");

        // Simulate AI response
        setTimeout(() => {
            const responseMsg = {
                id: Date.now() + 1,
                role: "assistant",
                content: aiResponseContent,
                type: "text"
            };
            setMessages(prev => [...prev, responseMsg]);
        }, 600);
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 p-3 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center">
                        <Sparkles className="w-3 h-3" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wide">AI Assistant</h3>
                        <p className="text-[10px] text-gray-500">Connected to Patient Interview</p>
                    </div>
                </div>
                <div className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                    Online
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50/30 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] ${msg.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm shadow-md shadow-indigo-200'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm'
                            } p-3 text-xs leading-relaxed`}>
                            {msg.type === 'report' ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-1">
                                        <FileText className="w-4 h-4 text-indigo-500" />
                                        <span className="font-bold text-indigo-900">Patient Report Received</span>
                                    </div>
                                    <div className="prose prose-xs max-w-none text-gray-600">
                                        <pre className="whitespace-pre-wrap font-sans text-xs">{msg.content}</pre>
                                    </div>
                                    <div className="pt-2 flex flex-wrap gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-6 text-[10px] bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
                                            onClick={() => onAction("fill_soap", JSON.stringify(msg.data))}
                                        >
                                            <Checks className="w-3 h-3 mr-1" /> Use Data
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-2 border-t border-gray-100 bg-white shrink-0">
                {/* Quick Chips */}
                <div className="flex gap-2 mb-2 overflow-x-auto pb-1 px-1 no-scrollbar">
                    <button
                        onClick={() => setInput("Assessment: ")}
                        className="text-[10px] whitespace-nowrap bg-gray-50 border border-gray-200 px-2 py-1 rounded-full text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                    >
                        + Assessment
                    </button>
                    <button
                        onClick={() => setInput("Plan: ")}
                        className="text-[10px] whitespace-nowrap bg-gray-50 border border-gray-200 px-2 py-1 rounded-full text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                    >
                        + Plan
                    </button>
                    <button
                        onClick={() => handleSend("Approve")}
                        className="text-[10px] whitespace-nowrap bg-green-50 border border-green-200 px-2 py-1 rounded-full text-green-700 hover:bg-green-100 transition-all"
                    >
                        ✓ Approve & Send
                    </button>
                </div>

                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type 'Plan: ...' or chat..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg h-9 pl-3 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    <button
                        onClick={() => handleSend()}
                        className="absolute right-1 w-7 h-7 bg-indigo-600 text-white rounded-md flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Check icon helper
function Checks({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

// Wrapper for quick action buttons to simulate input
function DoctorAIWrapper(props: DoctorAIProps) {
    return <DoctorAI {...props} />;
}
