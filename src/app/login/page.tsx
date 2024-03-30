import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="relative flex-col min-h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900">
                </div>
                <div className="relative z-20 mt-auto">

                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            “This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”</p>
                        <footer className="text-sm">
                            Sofia Davis</footer>
                    </blockquote>
                </div>

            </div>
            <div className="lg:p-8">

                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                    <div className="flex flex-col space-y-2 text-center">

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account</h1>

                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account</p>
                    </div>

                    <div className="grid gap-6">
                        
                            <Button asChild>
                                <Link href="/service/_auth/github">
                                    <Github className="mr-2" /> GitHub
                                </Link>
                            </Button>
                        
                    </div>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our <a className="underline underline-offset-4 hover:text-primary" href="/terms">
                            Terms of Service</a>
                        and <a className="underline underline-offset-4 hover:text-primary" href="/privacy">
                            Privacy Policy</a>
                        .</p>
                </div>
            </div>
        </div>



    )
}
export default LoginPage;