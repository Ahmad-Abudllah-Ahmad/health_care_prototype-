"use client";

import React, { useState, useEffect } from "react";
import {
    Bold, Italic, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight,
    Eye, Code, Copy, Check, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ConsultationReport from "@/components/shared/ConsultationReport";

interface SoapNoteProps {
    initialData?: any;
    onUpdate?: (data: any) => void;
    onSave?: (data: any) => void;
}

export default function SoapNote({ initialData, onUpdate, onSave }: SoapNoteProps) {
    const [mode, setMode] = useState<"visual" | "markdown">("visual");

    // Internal state structure
    const [formData, setFormData] = useState({
        subjective: {
            cc: "",
            hpi: "",
            pmh: "",
            ros: ""
        },
        objective: {
            vitals: { bp: "", hr: "", rr: "", temp: "", o2: "", wt: "" },
            physicalExam: "",
            labs: ""
        },
        assessment: "",
        plan: ""
    });

    // Sync from Parent (Flat) to Internal (Nested)
    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                subjective: {
                    cc: initialData.cc || prev.subjective.cc,
                    hpi: initialData.hpi || prev.subjective.hpi,
                    pmh: initialData.pmh || prev.subjective.pmh,
                    ros: initialData.meds || prev.subjective.ros // Mapping 'meds' to 'ros' field for now as per previous logic
                },
                objective: {
                    vitals: {
                        bp: initialData.bp || prev.objective.vitals.bp,
                        hr: initialData.hr || prev.objective.vitals.hr,
                        rr: initialData.rr || prev.objective.vitals.rr,
                        temp: initialData.temp || prev.objective.vitals.temp,
                        o2: initialData.o2 || prev.objective.vitals.o2,
                        wt: initialData.wt || prev.objective.vitals.wt
                    },
                    physicalExam: initialData.physicalExam || prev.objective.physicalExam,
                    labs: initialData.labs || prev.objective.labs
                },
                assessment: initialData.assessment || prev.assessment,
                plan: initialData.plan || prev.plan
            }));
        }
    }, [initialData]);

    // Helper to update local state and notify parent
    const updateField = (section: keyof typeof formData, field: string | null, value: string) => {
        setFormData(prev => {
            const newState = { ...prev };
            if (section === "subjective" && field) {
                newState.subjective = { ...newState.subjective, [field]: value };
            } else if (section === "objective") {
                if (field && field in newState.objective.vitals) {
                    newState.objective = {
                        ...newState.objective,
                        vitals: { ...newState.objective.vitals, [field]: value }
                    };
                } else if (field) {
                    // @ts-ignore
                    newState.objective = { ...newState.objective, [field]: value };
                }
            } else {
                // @ts-ignore
                newState[section] = value;
            }

            // Notify parent with flattened data
            if (onUpdate) {
                const flatData = {
                    ...initialData,
                    cc: newState.subjective.cc,
                    hpi: newState.subjective.hpi,
                    pmh: newState.subjective.pmh,
                    meds: newState.subjective.ros,
                    bp: newState.objective.vitals.bp,
                    hr: newState.objective.vitals.hr,
                    rr: newState.objective.vitals.rr,
                    temp: newState.objective.vitals.temp,
                    o2: newState.objective.vitals.o2,
                    wt: newState.objective.vitals.wt,
                    physicalExam: newState.objective.physicalExam,
                    labs: newState.objective.labs,
                    assessment: newState.assessment,
                    plan: newState.plan
                };
                onUpdate(flatData);
            }

            return newState;
        });
    };

    const handleCopy = () => {
        const text = generateMakeDown();
        navigator.clipboard.writeText(text);
        // Toast notification could go here
    };

    const generateMakeDown = () => {
        return `
# SOAP NOTE
**Date**: ${new Date().toLocaleDateString()}

## SUBJECTIVE
**CC**: ${formData.subjective.cc}
**HPI**: ${formData.subjective.hpi}
**PMH**: ${formData.subjective.pmh}
**ROS**: ${formData.subjective.ros}

## OBJECTIVE
**Vitals**: BP: ${formData.objective.vitals.bp} | HR: ${formData.objective.vitals.hr} | Temp: ${formData.objective.vitals.temp}
**Exam**: ${formData.objective.physicalExam}
**Labs**: ${formData.objective.labs}

## ASSESSMENT
${formData.assessment}

## PLAN
${formData.plan}
        `.trim();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMode("visual")}
                        className={cn("h-8 px-2 text-xs gap-1.5", mode === "visual" && "bg-white shadow-sm text-primary")}
                    >
                        <Eye className="w-3.5 h-3.5" /> Visual
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMode("markdown")}
                        className={cn("h-8 px-2 text-xs gap-1.5", mode === "markdown" && "bg-white shadow-sm text-primary")}
                    >
                        <Code className="w-3.5 h-3.5" /> Markdown
                    </Button>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Save className="w-3.5 h-3.5 text-gray-500" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {mode === "visual" ? (
                    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0 divide-x divide-gray-200">
                        {/* LEFT COLUMN: EDITOR */}
                        <div className="overflow-y-auto p-6 space-y-8">
                            {/* Subjective */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-primary/10 pb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span> Subjective
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Chief Complaint (CC)</label>
                                        <input
                                            className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                                            placeholder="e.g. Chest Pain"
                                            value={formData.subjective.cc}
                                            onChange={(e) => updateField("subjective", "cc", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">History of Present Illness (HPI)</label>
                                        <textarea
                                            className="w-full text-sm p-2.5 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 focus:bg-white resize-none leading-relaxed"
                                            placeholder="Describe the onset, location, duration, characteristics..."
                                            value={formData.subjective.hpi}
                                            onChange={(e) => updateField("subjective", "hpi", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">PMH / PSH</label>
                                            <textarea
                                                className="w-full text-sm p-2.5 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 focus:bg-white resize-none"
                                                value={formData.subjective.pmh}
                                                onChange={(e) => updateField("subjective", "pmh", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Meds & Allergies</label>
                                            <textarea
                                                className="w-full text-sm p-2.5 border border-gray-200 rounded-lg h-24 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 focus:bg-white resize-none"
                                                value={formData.subjective.ros}
                                                onChange={(e) => updateField("subjective", "ros", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Objective */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider border-b border-green-100 pb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Objective
                                </h3>

                                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100/50">
                                    <label className="block text-xs font-bold text-green-800 mb-3">VITALS</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {Object.entries(formData.objective.vitals).map(([key, val]) => (
                                            <div key={key} className="bg-white p-2 rounded-lg border border-green-100 shadow-sm">
                                                <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-wider">{key}</span>
                                                <input
                                                    className="w-full text-sm p-0 border-none focus:ring-0 text-center font-bold text-gray-700"
                                                    value={val}
                                                    onChange={(e) => updateField("objective", key, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Physical Exam</label>
                                    <textarea
                                        className="w-full text-sm p-2.5 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50/50 focus:bg-white resize-none"
                                        placeholder="General: NAD, HEENT: ..."
                                        value={formData.objective.physicalExam}
                                        onChange={(e) => updateField("objective", "physicalExam", e.target.value)}
                                    />
                                </div>
                            </section>

                            {/* Assessment */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider border-b border-orange-100 pb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> Assessment
                                </h3>
                                <textarea
                                    className="w-full text-sm p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-orange-50/10 focus:bg-white transition-all"
                                    placeholder="1. Primary Diagnosis..."
                                    value={formData.assessment}
                                    onChange={(e) => updateField("assessment", null, e.target.value)}
                                />
                            </section>

                            {/* Plan */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider border-b border-purple-100 pb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-600"></span> Plan
                                </h3>
                                <textarea
                                    className="w-full text-sm p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 bg-purple-50/10 focus:bg-white transition-all"
                                    placeholder="- Treatment plan..."
                                    value={formData.plan}
                                    onChange={(e) => updateField("plan", null, e.target.value)}
                                />
                            </section>
                        </div>

                        {/* RIGHT COLUMN: LIVE PREVIEW */}
                        <div className="overflow-y-auto bg-gray-50/50 p-6">
                            <ConsultationReport data={formData} />
                        </div>
                    </div>
                ) : (
                    <div className="h-full bg-slate-900 text-slate-100 p-6 font-mono text-sm overflow-auto">
                        <pre className="whitespace-pre-wrap max-w-3xl mx-auto">{generateMakeDown()}</pre>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-2 text-center text-xs text-gray-400">
                {mode === "visual" ? "Visual Preview Mode" : "Markdown Source"}
                {/* Auto-save indicator could go here */}
            </div>
        </div>
    );
}
