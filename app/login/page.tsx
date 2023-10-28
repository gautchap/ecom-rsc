import { LoginForm } from "@/components/login-form";

export default async function Login() {
    return (
        <>
            <section className="flex min-h-screen flex-col items-center justify-between p-24">
                <LoginForm />
            </section>
        </>
    );
}
