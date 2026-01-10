import React from "react";
import { cn } from "@/lib/utils";

interface ConsultationReportProps {
    data: {
        subjective: {
            cc: string;
            hpi: string;
            pmh: string;
            ros: string;
        };
        objective: {
            vitals: { [key: string]: string };
            physicalExam: string;
        };
        assessment: string;
        plan: string;
    };
    doctorName?: string;
    date?: string;
    className?: string;
}

export default function ConsultationReport({
    data,
    doctorName = "Dr. Sarah Smith",
    date = new Date().toLocaleDateString(),
    className
}: ConsultationReportProps) {
    if (!data) return null;

    return (
        <div className={cn("bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-[210mm] mx-auto prose prose-sm", className)}>
            <div className="text-center border-b border-gray-100 pb-6 mb-8">
                <h1 className="text-2xl font-serif text-gray-900 m-0">Medical Consultation Note</h1>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{date}</p>
            </div>

            <div className="space-y-6 font-serif text-gray-800">
                {/* Subjective Preview */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Subjective</h4>
                    <div className="bg-white pl-4 border-l-2 border-primary/20 space-y-2">
                        <p><strong className="text-gray-600">CC:</strong> {data.subjective.cc || <span className="text-gray-300 italic">Pending...</span>}</p>
                        <p><strong className="text-gray-600">HPI:</strong> {data.subjective.hpi || <span className="text-gray-300 italic">Pending...</span>}</p>
                        <p><strong className="text-gray-600">PMH/PSH:</strong> {data.subjective.pmh || <span className="text-gray-300 italic">...</span>}</p>
                        <p><strong className="text-gray-600">Meds/Allergies:</strong> {data.subjective.ros || <span className="text-gray-300 italic">...</span>}</p>
                    </div>
                </div>

                {/* Objective Preview */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Objective</h4>
                    <div className="pl-4 border-l-2 border-green-500/20 space-y-4">
                        {/* Vitals Grid Preview */}
                        <div className="flex flex-wrap gap-4 text-sm bg-green-50/30 p-3 rounded-lg">
                            {data.objective.vitals && Object.entries(data.objective.vitals).map(([key, val]) => val && (
                                <div key={key}>
                                    <span className="text-gray-500 uppercase text-[10px] mr-1">{key}:</span>
                                    <span className="font-semibold">{val}</span>
                                </div>
                            ))}
                            {data.objective.vitals && !Object.values(data.objective.vitals).some(Boolean) && <span className="text-gray-300 italic">No vitals recorded</span>}
                        </div>

                        <p><strong className="text-gray-600">Physical Exam:</strong> {data.objective.physicalExam || <span className="text-gray-300 italic">Pending...</span>}</p>
                    </div>
                </div>

                {/* Assessment Preview */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Assessment</h4>
                    <div className="pl-4 border-l-2 border-orange-500/20">
                        <div className="whitespace-pre-wrap">{data.assessment || <span className="text-gray-300 italic">Pending...</span>}</div>
                    </div>
                </div>

                {/* Plan Preview */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Plan</h4>
                    <div className="pl-4 border-l-2 border-purple-600/20">
                        <div className="whitespace-pre-wrap">{data.plan || <span className="text-gray-300 italic">Pending...</span>}</div>
                    </div>
                </div>

                <div className="pt-12 mt-12 border-t border-gray-100 flex justify-between items-end">
                    <div className="text-xs text-gray-400">
                        Electronically signed by<br />
                        <strong className="text-gray-700">{doctorName}</strong>
                    </div>
                    <div className="h-12 w-32 bg-gray-50 rounded flex items-center justify-center text-[10px] text-gray-300 italic font-sans">
                        Signature
                    </div>
                </div>
            </div>
        </div>
    );
}
