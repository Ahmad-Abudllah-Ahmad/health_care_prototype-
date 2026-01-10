import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication | Sehat Guftagu",
    description: "Login or Signup to Sehat Guftagu",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-secondary/5 rounded-full blur-[150px]" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold text-foreground font-urdu tracking-tight">
                    خوش آمدید
                    <br />
                    <span className="font-sans text-2xl text-primary mt-3 block">Sehat Guftagu</span>
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[400px]">
                <div className="glass py-10 px-6 sm:rounded-[2rem] sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
