"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Stethoscope, FileText } from "lucide-react";
import Image from "next/image";

export const Features = () => {
    return (
        <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Feature 1: The Agent */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 relative">
                            {/* Abstract UI Mockup */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                                    <Stethoscope size={24} />
                                </div>
                                <div>
                                    <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                                    <div className="h-3 w-20 bg-gray-50 rounded" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="p-4 bg-gray-50 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl w-[80%]">
                                    <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                                    <div className="h-3 w-[80%] bg-gray-200 rounded" />
                                </div>
                                <div className="p-4 bg-blue-50 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl w-[80%] ml-auto">
                                    <div className="h-3 w-full bg-blue-200 rounded mb-2" />
                                    <div className="h-3 w-[60%] bg-blue-200 rounded" />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-semibold text-gray-700">Live Transcript</span>
                            </div>
                        </div>
                    </motion.div>
                    <div className="md:w-1/2">
                        <h3 className="text-secondary font-semibold uppercase tracking-wider mb-2">Advanced Reasoning</h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-urdu">
                            ذہین اور ہمدردانہ گفتگو <br />
                            <span className="font-sans text-3xl md:text-4xl text-gray-700 mt-2 block">Empathetic AI Reasoning</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            Our Agent doesn't just record; it understands. Using advanced medical reasoning (Gemini 1.5), it adapts questions based on patient answers, effectively triaging cases before they reach the doctor.
                        </p>
                    </div>
                </div>

                {/* Feature 2: Data Security & Integration */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#1e3b70] p-6 rounded-2xl text-white transform translate-y-8">
                                <ShieldCheck size={32} className="mb-4" />
                                <h4 className="text-lg font-bold">Secure Hipaa Compliant</h4>
                                <p className="text-blue-200 text-sm mt-2">End-to-end encryption for all patient data.</p>
                            </div>
                            <div className="bg-[#3e6fcb] p-6 rounded-2xl text-white">
                                <BookOpen size={32} className="mb-4" />
                                <h4 className="text-lg font-bold">RAG Knowledge Base</h4>
                                <p className="text-blue-100 text-sm mt-2">Grounded in verified medical datasets (MedQA, PubMed).</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
                                <FileText size={32} className="mb-4 text-green-600" />
                                <h4 className="text-lg font-bold text-gray-900">SOAP Notes</h4>
                                <p className="text-gray-500 text-sm mt-2">Automated documentation.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl transform translate-y-8">
                                <h4 className="text-lg font-bold text-gray-400">...and more</h4>
                            </div>
                        </div>
                    </motion.div>
                    <div className="md:w-1/2">
                        <h3 className="text-secondary font-semibold uppercase tracking-wider mb-2">Built for Trust</h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Secure, Grounded, & Verified.
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            We prioritize patient privacy and medical accuracy. Every diagnosis is supported by verifiable citations from medical literature, ensuring doctors can trust the AI's assessment.
                        </p>

                        <ul className="mt-8 space-y-4">
                            {["Encrypted Data Storage (Supabase)", "Knowledge grounding (Pinecone)", "Doctor Human-in-the-loop verification"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <span className="text-sm">✓</span>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};
