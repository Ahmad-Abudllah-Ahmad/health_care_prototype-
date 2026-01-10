"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Stethoscope, FileText } from "lucide-react";
import Image from "next/image";

export const Features = () => {
    return (
        <section className="py-24 overflow-hidden relative">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="container mx-auto px-4 md:px-6">

                {/* Feature 1: The Agent */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2 w-full"
                    >
                        <div className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
                            {/* Floating Elements Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

                            {/* Abstract UI Mockup */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Stethoscope size={28} />
                                </div>
                                <div>
                                    <div className="h-4 w-32 bg-foreground/10 rounded-full mb-2" />
                                    <div className="h-3 w-20 bg-foreground/5 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-5 bg-accent/50 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl w-[85%] border border-border/50">
                                    <div className="h-3 w-full bg-foreground/10 rounded-full mb-3" />
                                    <div className="h-3 w-[80%] bg-foreground/10 rounded-full" />
                                </div>
                                <div className="p-5 bg-primary/5 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl w-[85%] ml-auto border border-primary/10">
                                    <div className="h-3 w-full bg-primary/10 rounded-full mb-3" />
                                    <div className="h-3 w-[60%] bg-primary/10 rounded-full" />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-custom">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50" />
                                <span className="font-semibold text-sm text-foreground">Live Transcript</span>
                            </div>
                        </div>
                    </motion.div>
                    <div className="md:w-1/2">
                        <span className="text-secondary font-medium tracking-wide uppercase text-sm mb-3 block">Advanced Reasoning</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-urdu leading-tight">
                            فہم و فراست کے ساتھ <br />
                            <span className="font-sans text-3xl md:text-4xl text-foreground mt-2 block">Empathetic AI Reasoning</span>
                        </h2>
                        <p className="text-xl text-muted leading-relaxed max-w-lg">
                            Our Agent doesn't just record; it understands. Using advanced medical reasoning (Gemini 1.5), it adapts questions based on patient answers, effectively triaging cases before they reach the doctor.
                        </p>
                    </div>
                </div>

                {/* Feature 2: Data Security & Integration */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2 w-full"
                    >
                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-gradient-to-br from-primary to-[#2a4e8c] p-8 rounded-[2rem] text-white transform translate-y-8 shadow-xl shadow-primary/20">
                                <ShieldCheck size={36} className="mb-4 text-white/90" />
                                <h4 className="text-lg font-bold">Secure Hipaa Compliant</h4>
                                <p className="text-white/70 text-sm mt-3 leading-relaxed">End-to-end encryption for all patient data.</p>
                            </div>
                            <div className="bg-white border border-border p-8 rounded-[2rem] shadow-sm">
                                <BookOpen size={36} className="mb-4 text-secondary" />
                                <h4 className="text-lg font-bold text-foreground">RAG Knowledge Base</h4>
                                <p className="text-muted text-sm mt-3 leading-relaxed">Grounded in verified medical datasets (MedQA, PubMed).</p>
                            </div>
                            <div className="bg-white border border-border p-8 rounded-[2rem] shadow-sm">
                                <FileText size={36} className="mb-4 text-green-600" />
                                <h4 className="text-lg font-bold text-foreground">SOAP Notes</h4>
                                <p className="text-muted text-sm mt-3 leading-relaxed">Automated documentation.</p>
                            </div>
                            <div className="glass p-8 rounded-[2rem] transform translate-y-8 flex items-center justify-center">
                                <h4 className="text-lg font-bold text-muted">...and more</h4>
                            </div>
                        </div>
                    </motion.div>
                    <div className="md:w-1/2">
                        <span className="text-secondary font-medium tracking-wide uppercase text-sm mb-3 block">Built for Trust</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Secure, Grounded, <br /> & Verified.
                        </h2>
                        <p className="text-xl text-muted leading-relaxed max-w-lg mb-8">
                            We prioritize patient privacy and medical accuracy. Every diagnosis is supported by verifiable citations from medical literature, ensuring doctors can trust the AI's assessment.
                        </p>

                        <ul className="space-y-5">
                            {["Encrypted Data Storage (Supabase)", "Knowledge grounding (Pinecone)", "Doctor Human-in-the-loop verification"].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-foreground/80 font-medium"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                                        <span className="text-sm font-bold">✓</span>
                                    </div>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};
