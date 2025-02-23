'use client'

import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/shadcn-components/ui/button'
import Image from 'next/image'
import { outfitFont } from '@/ui/fonts'

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/register/address',
    })
    const searchParams = useSearchParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const submitForm = event => {
        event.preventDefault()
        setIsLoading(true)
        console.log(errors)
        try {
            register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                user_plan: searchParams.get('user_plan') ?? 'basic',
                setErrors,
            })
        } catch (error) {
            console.log(error, errors)
            // setErrors(error.response.data.errors)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full sm:max-w-md">
            <Image
                src="/images/eatsy/hello-violet.png"
                alt="Register page"
                className="mx-auto mb-10 "
                width={150}
                height={150}
            />
            <h2 className={`${outfitFont.className} text-2xl font-bold`}>
                Créez votre compte en quelques clics 🚀
            </h2>
            <p className="text-slate-500 text-sm mb-8">
                Nous avons besoin de quelques informations pour créer votre
                compte Eatsup.
            </p>
            <form onSubmit={submitForm}>
                {/* Name */}
                <div>
                    <Label htmlFor="name">Nom du restaurant</Label>

                    <Input
                        id="name"
                        type="text"
                        value={name}
                        className="block mt-1 w-full"
                        onChange={event => setName(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.name} className="mt-2" />
                </div>

                {/* Email Address */}
                <div className="mt-4">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label htmlFor="password">Mot de passe</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                    />

                    <InputError messages={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <Label htmlFor="passwordConfirmation">
                        Confirmation du mot de passe
                    </Label>

                    <Input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                    />

                    <InputError
                        messages={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/login"
                        className="underline text-sm text-gray-600 hover:text-gray-900">
                        Déjà inscrit ?
                    </Link>

                    <Button
                        type="submit"
                        className="ml-4"
                        isLoading={isLoading}>
                        Commencer gratuitement
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Page
