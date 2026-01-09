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
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 max-w-4xl"
                    >
                        Bridging Healthcare <br />
                        <span className="text-secondary">Gaps with AI.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8 leading-relaxed font-urdu"
                    >
                        Sehat Guftagu connects rural patients with doctors through intelligent, multilingual voice interviews.
                        <br />
                        <span className="text-secondary text-lg mt-2 block">
                            "آپ کی صحت، ہماری ترجیح"
                        </span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/patient"
                            className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
                        >
                            Start Checkup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#demo"
                            className="px-8 py-4 bg-white text-primary text-lg font-semibold rounded-full border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-all flex items-center gap-2"
                        >
                            <Mic className="w-5 h-5" /> Voice Demo
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1: AI Analysis */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-2 bg-gradient-to-br from-primary to-[#2a4e8c] rounded-3xl p-8 text-white relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Activity size={200} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Smart Clinical Interviews</h3>
                            <p className="text-blue-100 max-w-md text-lg">
                                Our AI agent conducts thorough 15-minute interviews in Urdu & English, detecting "Red Flags" with 95% accuracy.
                            </p>
                            <div className="mt-8 flex gap-3">
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">Soap Notes</div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">Risk Analysis</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Urdu Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl p-8 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                                <Mic size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Native Urdu Voice</h3>
                            <p className="text-gray-500 mt-2 font-urdu text-right">
                                "طبی مشورے اب آپ کی اپنی زبان میں"
                            </p>
                            <p className="text-gray-500 mt-2 text-sm">
                                Breaking language barriers with fluent Urdu/English voice interactions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Doctor Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl p-8"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Instant SOAP Reports</h3>
                        <p className="text-gray-500 mt-2 text-sm">
                            Automated generation of Subjective, Objective, Assessment, and Plan notes for doctors.
                        </p>
                    </motion.div>

                    {/* Card 4: Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="md:col-span-2 bg-[#f8fafc] border border-gray-100 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-around gap-8"
                    >
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-1">15m</div>
                            <div className="text-gray-500 text-sm">Average Session</div>
                        </div>
                        <div className="h-12 w-[1px] bg-gray-200 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-secondary mb-1">95%</div>
                            <div className="text-gray-500 text-sm">Diagnostic Accuracy</div>
                        </div>
                        <div className="h-12 w-[1px] bg-gray-200 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-1">24/7</div>
                            <div className="text-gray-500 text-sm">Availability</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
