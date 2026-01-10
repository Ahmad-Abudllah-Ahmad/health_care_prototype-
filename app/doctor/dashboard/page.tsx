"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users,
    Calendar,
    Activity,
    ChevronRight,
    Search,
    Bell
} from "lucide-react";

// Mock Data
const patients = [
    {
        id: "1",
        name: "Ahsan Khan",
        age: 45,
        gender: "Male",
        lastVisit: "2025-10-15",
        status: "Critical",
        chiefComplaint: "Chest Pain",
        avatar: "AK"
    },
    {
        id: "2",
        name: "Fatima Bibi",
        age: 32,
        gender: "Female",
        lastVisit: "2025-10-18",
        status: "Stable",
        chiefComplaint: "Migraine",
        avatar: "FB"
    },
    {
        id: "3",
        name: "Muhammad Ali",
        age: 58,
        gender: "Male",
        lastVisit: "2025-10-20",
        status: "Follow-up",
        chiefComplaint: "Hypertension",
        avatar: "MA"
    },
    {
        id: "4",
        name: "Zainab Ahmed",
        age: 28,
        gender: "Female",
        lastVisit: "2025-10-21",
        status: "New",
        chiefComplaint: "Fever",
        avatar: "ZA"
    }
];

export default function DoctorDashboard() {
    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg text-gray-900">Sehat Guftagu <span className="text-primary font-normal">MD</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search patients..."
                                className="h-9 pl-9 pr-4 rounded-full bg-gray-50 border-none text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all"
                            />
                        </div>
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                            DR
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Good Morning, Dr. Sarah</h1>
                    <p className="text-gray-500">You have 4 patients pending review today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">24</h3>
                        <p className="text-sm text-gray-500">Total Patients</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <Calendar className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">8</h3>
                        <p className="text-sm text-gray-500">Appointments Today</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">2</h3>
                        <p className="text-sm text-gray-500">Critical Cases</p>
                    </div>
                </div>

                {/* Patient List */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Recent Patients</h2>
                        <button className="text-sm text-primary font-medium hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {patients.map((patient, index) => (
                            <motion.div
                                key={patient.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-4 hover:bg-gray-50/50 transition-colors"
                            >
                                <Link href={`/doctor/patient/${patient.id}`} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                        {patient.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-semibold text-gray-900 truncate">{patient.name}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide 
                                                ${patient.status === 'Critical' ? 'bg-red-50 text-red-600' :
                                                    patient.status === 'New' ? 'bg-blue-50 text-blue-600' :
                                                        'bg-gray-100 text-gray-600'}`}>
                                                {patient.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate flex items-center gap-2">
                                            <span>{patient.age} Y/O {patient.gender}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="text-gray-700 font-medium">{patient.chiefComplaint}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span className="hidden sm:block">{patient.lastVisit}</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
