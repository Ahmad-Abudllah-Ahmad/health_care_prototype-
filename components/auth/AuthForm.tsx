"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AuthFormProps {
    mode: "login" | "signup";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
    const [role, setRole] = useState<"patient" | "doctor">("patient");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [customDepartment, setCustomDepartment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const departments = [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "General Medicine",
        "Pediatrics",
        "Dermatology",
        "Psychiatry",
        "Other"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === "signup") {
                const finalDepartment = department === "Other" ? customDepartment : department;

                // For now, we'll pass role and department as metadata or top-level fields
                // dependent on the authClient implementation. 
                // Assuming better-auth or custom backend handles distinct fields.
                const { data, error } = await authClient.signUp.email({
                    email,
                    password,
                    name,
                    // If the library supports custom fields in metadata, we'd add them here.
                    // For this UI task, we ensure the data is collected.
                    // metadata: { role, department: role === 'doctor' ? finalDepartment : undefined }
                });
                if (error) throw error;
            } else {
                const { data, error } = await authClient.signIn.email({
                    email,
                    password,
                });
                if (error) throw error;
            }

            router.push(role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard");
            router.refresh();

        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            {mode === "signup" && (
                <div className="flex p-1 bg-accent/50 rounded-xl mb-6 border border-border/50">
                    <button
                        type="button"
                        onClick={() => setRole("patient")}
                        className={`
                            flex-1 py-2 text-sm font-medium rounded-lg transition-all
                            ${role === "patient"
                                ? "bg-white text-primary shadow-sm"
                                : "text-muted hover:text-foreground hover:bg-white/50"}
                        `}
                    >
                        Patient
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("doctor")}
                        className={`
                            flex-1 py-2 text-sm font-medium rounded-lg transition-all
                            ${role === "doctor"
                                ? "bg-white text-primary shadow-sm"
                                : "text-muted hover:text-foreground hover:bg-white/50"}
                        `}
                    >
                        Doctor
                    </button>
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === "signup" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex h-10 w-full rounded-xl border border-border/70 bg-white/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    placeholder={role === "doctor" ? "Dr. Sarah Smith" : "John Doe"}
                                />
                            </div>

                            {role === "doctor" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-1.5">
                                        <label htmlFor="department" className="text-sm font-medium text-foreground/80">
                                            Specialization / Department
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="department"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                className="flex h-10 w-full rounded-xl border border-border/70 bg-white/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary appearance-none transition-all"
                                                required
                                            >
                                                <option value="" disabled>Select Department</option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {department === "Other" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="space-y-1.5"
                                        >
                                            <label htmlFor="custom-dept" className="text-sm font-medium text-foreground/80">
                                                Specify Department
                                            </label>
                                            <input
                                                id="custom-dept"
                                                type="text"
                                                required
                                                value={customDepartment}
                                                onChange={(e) => setCustomDepartment(e.target.value)}
                                                className="flex h-10 w-full rounded-xl border border-border/70 bg-white/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                                placeholder="e.g. Oncology"
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-xl border border-border/70 bg-white/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        placeholder="name@example.com"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-foreground/80">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex h-10 w-full rounded-xl border border-border/70 bg-white/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm font-medium bg-red-50/50 p-3 rounded-lg border border-red-100/50"
                    >
                        {error}
                    </motion.div>
                )}

                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : mode === "login" ? "Sign in" : "Create Account"}
                    </Button>
                </div>

                <div className="text-center text-sm pt-2">
                    {mode === "login" ? (
                        <p className="text-muted">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors">
                                Sign up
                            </Link>
                        </p>
                    ) : (
                        <p className="text-muted">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-4 py-4">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-muted text-xs font-medium uppercase tracking-wider">
                        Or Login with Demo
                    </span>
                    <div className="h-px bg-border flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => router.push("/doctor/dashboard")}
                        className="h-10 rounded-xl border border-border/50 bg-white/50 hover:bg-white hover:border-primary/30 text-slate-600 hover:text-primary text-xs font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                    >
                        <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            DR
                        </span>
                        Doctor Demo
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => router.push("/patient/dashboard")}
                        className="h-10 rounded-xl border border-border/50 bg-white/50 hover:bg-white hover:border-primary/30 text-slate-600 hover:text-primary text-xs font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                    >
                        <span className="w-6 h-6 rounded-lg bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            PT
                        </span>
                        Patient Demo
                    </motion.button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-muted text-sm">
                        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <Link
                            href={mode === "login" ? "/signup" : "/login"}
                            className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
                        >
                            {mode === "login" ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
