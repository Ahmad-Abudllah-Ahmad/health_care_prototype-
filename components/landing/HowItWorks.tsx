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
        <section id="how-it-works" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-primary mb-4"
                    >
                        How Sehat Guftagu Works
                    </motion.h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-urdu">
                        صحت گفتگو کا طریقہ کار
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative">

                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-gray-200 via-secondary/50 to-gray-200 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="relative flex flex-col items-center text-center max-w-sm"
                        >
                            <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10`}>
                                {step.icon}
                                <div className="absolute -bottom-2 bg-white px-2 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-100">
                                    Step 0{step.id}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
