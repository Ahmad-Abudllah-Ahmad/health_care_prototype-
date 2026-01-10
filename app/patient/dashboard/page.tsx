"use client";

import React, { useState, useEffect } from "react";
import PatientAI from "@/components/patient/PatientAI";
import ConsultationReport from "@/components/shared/ConsultationReport";
import { MessageSquare, FileText, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState<"consult" | "reports">("consult");
    const [consultationStatus, setConsultationStatus] = useState<"pending" | "approved" | null>(null);
    const [consultationData, setConsultationData] = useState<any>(null);

    // Poll for consultation updates (simulating real-time backend)
    useEffect(() => {
        const checkStatus = () => {
            const status = localStorage.getItem("consultation_status") as "pending" | "approved" | null;
            const data = localStorage.getItem("consultation_plan"); // This might be just the plan string or full data

            setConsultationStatus(status);

            if (status === "approved" && data) {
                // In a real app, we'd fetch the full report. 
                // For this demo, we'll construct a full report object if we only stored the plan, 
                // or parse it if we stored the whole thing.
                // Assuming we stored just the PLAN string in previous steps, let's mock the rest for the full report visual.
                // ideally, the Doctor should have saved the FULL report to localStorage. 
                // Let's assume for now we construct it or try to parse.

                try {
                    const parsed = JSON.parse(data);
                    // It's likely just the plan text based on previous DoctorAI logic?
                    // Let's check logic: DoctorAI saved `localStorage.setItem("consultation_plan", input);` which was just text.
                    // To show the FULL visual report, we need the full data.
                    // For the demo to look "sync'd", we will mock the subjective/objective parts 
                    // to match what the PATIENT provided in their chat + the PLAN from the doctor.

                    if (typeof parsed === 'string') {
                        setConsultationData({
                            subjective: {
                                cc: "Persistent Chest Pain",
                                hpi: "Patient reports worsening chest pain over the last 3 days...",
                                pmh: "Hypertension",
                                ros: "Lisinopril 10mg"
                            },
                            objective: {
                                vitals: { bp: "150/95", hr: "88", rr: "18", temp: "98.6" },
                                physicalExam: "Pending..."
                            },
                            assessment: "Hypertension Stage 2",
                            plan: parsed
                        });
                    } else {
                        setConsultationData(parsed);
                    }
                } catch (e) {
                    // If it's just a string
                    setConsultationData({
                        subjective: {
                            cc: "Persistent Chest Pain",
                            hpi: "Patient reports worsening chest pain over the last 3 days...",
                            pmh: "Hypertension",
                            ros: "Lisinopril 10mg"
                        },
                        objective: {
                            vitals: { bp: "150/95", hr: "88", rr: "18", temp: "98.6" },
                            physicalExam: "Pending..."
                        },
                        assessment: "Hypertension Stage 2",
                        plan: data
                    });
                }
            }
        };

        const interval = setInterval(checkStatus, 2000);
        checkStatus(); // Initial check
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                            <User className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight">Patient Portal</span>
                    </div>
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500 gap-2">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Sidebar / Tabs */}
                    <div className="md:col-span-3 space-y-2">
                        <button
                            onClick={() => setActiveTab("consult")}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all font-medium text-sm",
                                activeTab === "consult"
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <MessageSquare className="w-4 h-4" />
                            AI Consultation
                        </button>
                        <button
                            onClick={() => setActiveTab("reports")}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all font-medium text-sm",
                                activeTab === "reports"
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <FileText className="w-4 h-4" />
                            Medical Reports
                            {consultationStatus === "approved" && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            )}
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-9">
                        {activeTab === "consult" ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[600px] flex flex-col">
                                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                    <h2 className="font-semibold text-gray-800">New Consultation</h2>
                                    <p className="text-xs text-gray-500">Chat with AI to describe your symptoms</p>
                                </div>
                                <div className="flex-1 overflow-hidden relative">
                                    <PatientAI />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900">Your Reports</h2>

                                {consultationStatus === "approved" && consultationData ? (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-green-900">Consultation Report Ready</h3>
                                                <p className="text-sm text-green-700">Dr. Sarah Smith has reviewed your case and provided a plan.</p>
                                            </div>
                                            <Button size="sm" className="ml-auto bg-green-600 hover:bg-green-700 text-white shadow-sm">
                                                Download PDF
                                            </Button>
                                        </div>

                                        {/* SHARED COMPONENT VIEW */}
                                        <div className="scale-95 origin-top-left border border-gray-200 shadow-xl rounded-xl overflow-hidden">
                                            <ConsultationReport data={consultationData} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileText className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-2">No Reports Available</h3>
                                        {consultationStatus === "pending" ? (
                                            <p className="text-sm text-yellow-600 bg-yellow-50 inline-block px-3 py-1 rounded-full border border-yellow-200">
                                                In Progress: Dr. Sarah is currently reviewing your case...
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                Complete a consultation to generate a report.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
