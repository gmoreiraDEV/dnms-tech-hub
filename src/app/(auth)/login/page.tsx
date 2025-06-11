"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/lib/validations/auth"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
    const [error, setError] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema)
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if (res?.error) {
            setError("Credenciais inválidas")
        } else {
            window.location.href = "/"
        }
    }

    const handleSocialLogin = (provider: "google" | "github") => () => {
        signIn(provider)
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Entrar</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input placeholder="Email" {...register("email")} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <Input type="password" placeholder="Senha" {...register("password")} />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <Button type="submit">Entrar</Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

            <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" onClick={handleSocialLogin("google")}>Entrar com Google</Button>
                <Button variant="outline" onClick={handleSocialLogin("github")}>Entrar com GitHub</Button>
            </div>

            <div className="text-center">
                <p>Não tem conta? <Link href="/register" className="text-blue-500">Criar Conta</Link></p>
            </div>
        </div>
    )
}
