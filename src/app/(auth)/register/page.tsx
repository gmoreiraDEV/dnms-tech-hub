"use client"

import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/lib/validations/auth"
import { z } from "zod"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema)
    })

    const password = useWatch({ control, name: "password", defaultValue: "" })
    const confirmPassword = useWatch({ control, name: "confirmPassword", defaultValue: "" })

    const checkRules = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
    }

    const showRules = password.length > 0
    const showStrength = password.length > 0 && password !== confirmPassword

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setLoading(true)
        setError("")
        setSuccess("")
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const result = await res.json()
            setError(result.error || "Erro desconhecido")
        } else {
            setSuccess("Conta criada com sucesso!")
            reset()
        }

        setLoading(false)
    }

    const handleSocialRegister = (provider: "google" | "github") => () => {
        signIn(provider)
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input placeholder="Email" {...register("email")} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Senha" className="pr-10" {...register("password")} />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                    {showStrength && <PasswordStrengthIndicator rules={checkRules} />}
                    {showRules && <PasswordRules rules={checkRules} />}
                </div>

                <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Confirme a Senha" className="pr-10" {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>

                <Button type="submit" disabled={loading}>{loading ? "Criando Conta..." : "Criar Conta"}</Button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>

            <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" onClick={handleSocialRegister("google")}>Continuar com Google</Button>
                <Button variant="outline" onClick={handleSocialRegister("github")}>Continuar com GitHub</Button>
            </div>

            <div className="text-center">
                <p>Já possui conta? <Link href="/login" className="text-blue-500">Entrar</Link></p>
            </div>
        </div>
    )
}


function calculatePasswordStrength(rules: { length: boolean, upper: boolean, lower: boolean, number: boolean }): number {
    let score = 0
    if (rules.length) score++
    if (rules.upper) score++
    if (rules.lower) score++
    if (rules.number) score++
    return score
}

export const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
)

export const EyeOffIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.966 9.966 0 012.302-4.162M15 12a3 3 0 00-4.243-4.243M9.88 9.88a3 3 0 004.243 4.243M3 3l18 18" />
    </svg>
)


function PasswordStrengthIndicator({ rules }: { rules: { length: boolean, upper: boolean, lower: boolean, number: boolean } }) {
    const score = calculatePasswordStrength(rules)

    const getColor = () => {
        switch (score) {
            case 4: return 'bg-green-500'
            case 3: return 'bg-yellow-400'
            case 2: return 'bg-orange-400'
            default: return 'bg-red-500'
        }
    }

    return (
        <div className="my-4">
            <div className="h-2 w-full bg-gray-300 rounded">
                <div className={`h-2 rounded transition-all duration-300 ${getColor()}`} style={{ width: `${(score / 4) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Força da senha: {score}/4
            </p>
        </div>
    )
}


function PasswordRules({ rules }: { rules: { length: boolean, upper: boolean, lower: boolean, number: boolean } }) {
    const getClass = (valid: boolean) => clsx("flex items-center gap-2 text-sm", valid ? "text-green-500" : "text-red-500")

    const CheckIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    )

    const XIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )

    const Rule = ({ valid, text }: { valid: boolean, text: string }) => (
        <p className={getClass(valid)}>
            {valid ? <CheckIcon /> : <XIcon />} {text}
        </p>
    )

    return (
        <div className="p-2 border rounded-md bg-gray-50">
            <Rule valid={rules.length} text="Pelo menos 8 caracteres" />
            <Rule valid={rules.upper} text="Pelo menos 1 letra maiúscula" />
            <Rule valid={rules.lower} text="Pelo menos 1 letra minúscula" />
            <Rule valid={rules.number} text="Pelo menos 1 número" />
        </div>
    )
}
