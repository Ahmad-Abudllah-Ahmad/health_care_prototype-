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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === "signup") {
                const { data, error } = await authClient.signUp.email({ // Adjust based on actual better-auth client API
                    email,
                    password,
                    name,
                    image: undefined, // Type fix if needed
                });
                if (error) throw error;
            } else {
                const { data, error } = await authClient.signIn.email({
                    email,
                    password,
                });
                if (error) throw error;
            }

            router.push("/patient/dashboard"); // Default redirect, can be role based later
            router.refresh();

        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === "signup" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                        />
                    </div>
                </motion.div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                    />
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">
                    {error}
                </div>
            )}

            <div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : mode === "login" ? "Sign in" : "Sign up"}
                </Button>
            </div>

            <div className="text-center text-sm">
                {mode === "login" ? (
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-primary hover:text-primary/90">
                            Sign up
                        </Link>
                    </p>
                ) : (
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                            Sign in
                        </Link>
                    </p>
                )}
            </div>
        </form>
    );
};
