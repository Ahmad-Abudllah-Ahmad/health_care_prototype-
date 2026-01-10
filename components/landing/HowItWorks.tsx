"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Activity, FileCheck, ArrowRight } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Start Interview",
        description: "Connect with our AI agent via voice or text. The agent asks adaptive medical questions in Urdu or English.",
        icon: <User className="w-8 h-8 text-primary" />,
        color: "bg-blue-50",
    },
    {
        id: 2,
        title: "AI Analysis",
        description: "Our system analyzes your responses against medical databases to identify red flags and potential diagnoses.",
        icon: <Activity className="w-8 h-8 text-secondary" />,
        color: "bg-indigo-50",
    },
    {
        id: 3,
        title: "Doctor Review",
        description: "A structured SOAP report is generated for the doctor to review, verify, and prescribe treatment.",
        icon: <FileCheck className="w-8 h-8 text-green-600" />,
        color: "bg-green-50",
    },
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-32 bg-accent/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-urdu">
                            صحت گفتگو کا طریقہ کار
                            <span className="block font-sans text-2xl md:text-3xl font-bold text-primary mt-2">How Sehat Guftagu Works</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-center justify-center relative max-w-7xl mx-auto">

                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-border via-secondary/30 to-border -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="relative flex flex-col items-center text-center max-w-xs group"
                        >
                            <div className={`w-32 h-32 ${step.color} rounded-full flex items-center justify-center mb-8 shadow-xl relative z-10 border-4 border-white group-hover:scale-110 transition-transform duration-500`}>
                                {step.icon}
                                <div className="absolute -bottom-4 bg-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md border border-border text-foreground">
                                    Step 0{step.id}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                            <p className="text-muted leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
