import { LoginForm } from "@/components/login-form";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Login() {
    return (
        <>
            <section className="flex items-center h-[90dvh] justify-center">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Se connecter</CardTitle>
                        <CardDescription>Entrez votre adresse mail ci-dessous pour vous connecter</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>
            </section>
        </>
    );
}
