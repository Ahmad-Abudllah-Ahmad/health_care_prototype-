"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mic, Activity, FileText } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl leading-[1.1]">
                            Bridging Healthcare <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Gaps with AI.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-muted max-w-2xl mb-10 leading-relaxed font-light"
                    >
                        Sehat Guftagu connects rural patients with doctors through intelligent, multilingual voice interviews.
                        <span className="block mt-4 font-urdu text-foreground text-2xl">
                            "آپ کی صحت، ہماری ترجیح"
                        </span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Link
                            href="/patient"
                            className="px-8 py-4 bg-primary text-white text-lg font-medium rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 group"
                        >
                            Start Checkup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#demo"
                            className="px-8 py-4 bg-white/50 backdrop-blur-sm text-foreground text-lg font-medium rounded-full border border-border hover:border-primary/30 hover:bg-white transition-all flex items-center gap-2"
                        >
                            <Mic className="w-5 h-5 text-secondary" /> Voice Demo
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1: AI Analysis */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-2 bg-gradient-to-br from-primary to-[#2a4e8c] rounded-[2rem] p-10 text-white relative overflow-hidden group shadow-lg shadow-primary/10"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                            <Activity size={240} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-3">Smart Clinical Interviews</h3>
                            <p className="text-blue-100 max-w-md text-lg leading-relaxed">
                                Our AI agent conducts thorough 15-minute interviews in Urdu & English, detecting "Red Flags" with 95% accuracy.
                            </p>
                            <div className="mt-8 flex gap-3">
                                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Soap Notes</div>
                                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Risk Analysis</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Urdu Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-500"
                    >
                        <div>
                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                                <Mic size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Native Urdu Voice</h3>
                            <p className="text-muted mt-4 font-urdu text-right text-lg">
                                "طبی مشورے اب آپ کی اپنی زبان میں"
                            </p>
                            <p className="text-muted mt-4 text-sm leading-relaxed">
                                Breaking language barriers with fluent Urdu/English voice interactions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Doctor Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="glass rounded-[2rem] p-8 hover:shadow-lg transition-shadow duration-500"
                    >
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                            <FileText size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Instant SOAP Reports</h3>
                        <p className="text-muted mt-3 text-sm leading-relaxed">
                            Automated generation of Subjective, Objective, Assessment, and Plan notes for doctors.
                        </p>
                    </motion.div>

                    {/* Card 4: Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="md:col-span-2 bg-accent/50 border border-border rounded-[2rem] p-8 flex flex-col sm:flex-row items-center justify-around gap-8 hover:bg-accent/80 transition-colors duration-500"
                    >
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">15m</div>
                            <div className="text-muted text-sm font-medium">Average Session</div>
                        </div>
                        <div className="h-16 w-[1px] bg-border hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-secondary mb-2">95%</div>
                            <div className="text-muted text-sm font-medium">Diagnostic Accuracy</div>
                        </div>
                        <div className="h-16 w-[1px] bg-border hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                            <div className="text-muted text-sm font-medium">Availability</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
