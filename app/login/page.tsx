import { LoginForm } from "@/components/login-form";

export default async function Login() {
  return (
    <>
      <section className="flex items-center h-[90dvh] justify-center">
        <LoginForm />
      </section>
    </>
  );
}
