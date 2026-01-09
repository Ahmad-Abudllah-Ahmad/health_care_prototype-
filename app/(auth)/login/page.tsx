import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div>
            <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">Sign in to your account</h3>
            <AuthForm mode="login" />
        </div>
    );
}
