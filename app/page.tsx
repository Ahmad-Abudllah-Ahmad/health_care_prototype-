"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-secondary/30">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />

      {/* Footer (Simplified for now) */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2026 Sehat Guftagu. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
