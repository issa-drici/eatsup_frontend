'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const CookieConsent = () => {
    const [showConsent, setShowConsent] = useState(false)

    useEffect(() => {
        // Vérifie si le consentement a déjà été donné
        const consent = localStorage.getItem('cookieConsent')
        if (!consent) {
            setShowConsent(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted')
        setShowConsent(false)
    }

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined')
        setShowConsent(false)
    }

    if (!showConsent) return null

    return (
        <div className="fixed bottom-2 left-2 right-2 bg-slate-700 p-4 shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-xl z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/eatsy/hello.png"
                        alt="eatsy-hello"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                    />
                    <div className="text-sm text-white">
                        <p className="font-medium mb-1">
                            🍪 Nous utilisons des cookies
                        </p>
                        <p className="text-slate-300">
                            Ces cookies nous permettent d'améliorer votre expérience et de comprendre comment vous utilisez notre site.{' '}
                            <Link href="/legal/politique-confidentialite" className="text-violet-400 hover:text-violet-300 underline">
                                En savoir plus
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Button
                        variant="outline"
                        onClick={handleDecline}
                        className="whitespace-nowrap bg-transparent text-white border-white hover:bg-white hover:text-slate-900">
                        Refuser
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="whitespace-nowrap bg-violet-600 text-white hover:bg-violet-500">
                        Accepter
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CookieConsent 