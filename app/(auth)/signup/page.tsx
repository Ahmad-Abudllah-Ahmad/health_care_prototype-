import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
    return (
        <div>
            <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">Create a new account</h3>
            <AuthForm mode="signup" />
        </div>
    );
}
