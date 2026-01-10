"use client";

import React, { useState } from "react";
import SoapNote from "@/components/doctor/SoapNote";
import DoctorAI from "@/components/doctor/DoctorAI";
import { ArrowLeft, User, Calendar, Phone } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PatientView() {
    const params = useParams();
    const [soapData, setSoapData] = useState<any>({
        name: "Ahsan Khan",
        age: "45/M",
        date: new Date().toISOString().split('T')[0],
        cc: "Persistent Chest Pain",
        hpi: "Patient reports worsening chest pain over the last 3 days. Pain is 6/10, radiating to left arm. Aggravated by exertion, relieved by rest.",
        pmh: "Hypertension (diagnosed 2020), High Cholesterol",
        meds: "Lisinopril 10mg daily",
        v_bp: "150/95", // Note: SoapNote component uses 'bp', make sure keys match
        bp: "150/95",
        hr: "88",
        rr: "18",
        temp: "98.6",
        o2: "98",
        wt: "85kg"
    });

    const handleAIAction = (action: string, content: string) => {
        if (action === "fill_soap") {
            // content is JSON stringified data
            try {
                // In a real app, parse and map correctly
                const parsed = JSON.parse(content);
                setSoapData((prev: any) => ({
                    ...prev,
                    assessment: (prev.assessment || "") + "\n" + parsed.summary,
                    // Map other fields as needed
                }));
            } catch (e) { console.error(e); }
        } else if (action === "add_assessment") {
            setSoapData((prev: any) => ({
                ...prev,
                assessment: (prev.assessment || "") + "\n- " + content
            }));
        } else if (action === "add_plan") {
            setSoapData((prev: any) => ({
                ...prev,
                plan: (prev.plan || "") + "\n- " + content
            }));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <Link href="/doctor/dashboard" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-gray-900 text-lg">Patient Consultation</h1>
                        <p className="text-xs text-gray-500">ID: #{params.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-medium text-gray-900">Ahsan Khan</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>45 Y/O Male</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+92 300 1234567</span>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Main Workspace (SOAP) */}
                <div className="flex-1 overflow-y-auto">
                    <SoapNote initialData={soapData} onUpdate={setSoapData} />
                </div>

                {/* Right: AI Assistant Sidebar */}
                <div className="w-[400px] border-l border-gray-200 bg-white shadow-xl z-30 hidden lg:block">
                    <DoctorAI onAction={handleAIAction} />
                </div>
            </div>
        </div>
    );
}
