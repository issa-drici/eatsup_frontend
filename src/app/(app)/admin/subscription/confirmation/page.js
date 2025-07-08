'use client'

import { Button } from '@/shadcn-components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

const ConfirmationPage = () => {
    const router = useRouter()

    useEffect(() => {
        // Animation de confetti à l'arrivée sur la page
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white p-4 lg:p-8">
            <div className="w-full text-center">
                <div className="mb-8">
                    <Image
                        src="/images/success-check.png"
                        alt="Succès"
                        width={502}
                        height={497}
                        className="h-28 w-auto mx-auto"
                    />
                </div>

                <h1 className="text-3xl font-bold text-violet-900 mb-4">
                    Merci de votre confiance !
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                    Votre abonnement Premium est maintenant actif. Votre affiche avec QR code
                    sera expédiée sous 48h ouvrées.
                </p>

                <div className="bg-violet-50 p-6 rounded-xl mb-8">
                    <h2 className="font-semibold text-violet-900 mb-4">
                        Prochaines étapes :
                    </h2>
                    <ul className="text-left space-y-3 text-gray-700">
                        <li className="flex items-center">
                            <span className="w-6 h-6 bg-violet-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Personnalisez votre menu avec des images et descriptions détaillées</span>
                        </li>
                        <li className="flex items-center">
                            <span className="w-6 h-6 bg-violet-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Configurez votre site web gratuit inclus dans votre abonnement</span>
                        </li>
                        <li className="flex items-center">
                            <span className="w-6 h-6 bg-violet-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Attendez la réception de votre affiche professionnelle</span>
                        </li>
                    </ul>
                </div>

                <Button
                    onClick={() => router.push('/admin/dashboard')}
                    className="bg-violet-600 hover:bg-violet-700"
                >
                    Accéder à mon tableau de bord
                </Button>
            </div>
        </div>
    )
}

export default ConfirmationPage
