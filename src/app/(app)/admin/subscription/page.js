'use client'

import { useSubscription } from '@/hooks/useSubscription'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import PaymentForm from '@/components/PaymentForm'
import { Check } from 'lucide-react'
import Image from 'next/image'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const SubscriptionPage = () => {
    const { plans, subscribe } = useSubscription()
    const router = useRouter()

    const handleSubmit = async paymentMethod => {
        await subscribe(plans?.[0]?.price_id, paymentMethod.id)
        // Redirection vers la page de confirmation
        router.push('/admin/subscription/confirmation')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6">
                    <div className="inline-block bg-red-50 text-red-800 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                        ⚠️ Votre période d'essai se termine bientôt
                    </div>
                    <h1 className="text-3xl font-bold text-violet-900 mb-2">
                        Ne perdez pas vos fonctionnalités Premium
                    </h1>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Après votre période d'essai, vous passerez
                        automatiquement au forfait Basic gratuit
                    </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-3xl mx-auto mb-6">
                    <h3 className="font-semibold text-red-800 mb-2 text-sm">
                        Vous perdrez ceci avec le forfait Basic gratuit :
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-red-700">
                        <div className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Limité à 10 tables
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            500 scans/mois
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            3 catégories max.
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Publicités imposées
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-3/5">
                        <div className="bg-white p-6 rounded-xl border border-violet-200 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-violet-900">
                                    Premium
                                </h2>
                                <span className="bg-gradient-to-r from-violet-600 to-violet-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Offre Spéciale Fin d'Essai
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-4xl font-bold text-violet-900">
                                    9,99€
                                    <span className="text-lg text-gray-600 ml-2">
                                        /mois
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Annulable à tout moment
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 mb-4">
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Nombre de tables illimité
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Scans illimités
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Catégories illimitées
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Plats illimités
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Menu avec images
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Traductions multilingues
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Site web OFFERT
                                    </span>
                                </div>
                                <div className="flex items-start md:bg-violet-50 p-2 rounded-lg">
                                    <Check className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                        Menu 100% sans publicité
                                    </span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <div className="flex items-start">
                                    <Check className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-sm text-yellow-800">
                                            Affiche avec QR pour vitrine OFFERTE
                                        </span>
                                        <p className="text-xs text-yellow-700 mt-0.5">
                                            Uniquement si vous souscrivez avant
                                            la fin de votre période d'essai
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/5">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-violet-900 to-violet-800 p-4 text-white">
                                <h3 className="text-lg font-semibold mb-1">
                                    Finalisez votre commande
                                </h3>
                                <p className="text-violet-100 text-xs">
                                    Votre affiche professionnelle sera expédiée
                                    sous 48h
                                </p>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg mb-4">
                                    <div>
                                        <p className="font-medium text-sm text-violet-900">
                                            Total à payer aujourd'hui
                                        </p>
                                        <p className="text-xs text-violet-600">
                                            Facturation mensuelle
                                        </p>
                                    </div>
                                    <p className="text-xl font-bold text-violet-900">
                                        9,99€
                                    </p>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-600">
                                            Paiement sécurisé par Stripe
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-600">
                                            Accès immédiat à votre compte
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-600">
                                            Annulation facile en 1 clic
                                        </span>
                                    </div>
                                </div>

                                <Elements stripe={stripePromise}>
                                    <PaymentForm onSubmit={handleSubmit} />
                                </Elements>

                                <div className="mt-4 flex items-center justify-center space-x-4">
                                    <Image
                                        src="/images/payment-methods.png"
                                        alt="Moyens de paiement acceptés"
                                        className="h-5 w-auto object-contain"
                                        width={374}
                                        height={45}
                                    />
                                    <div className="h-5 w-px bg-gray-200" />
                                    <Image
                                        src="/images/stripe-badge.png"
                                        alt="Powered by Stripe"
                                        className="h-5 w-auto object-contain"
                                        width={2560}
                                        height={1066}
                                    />
                                </div>

                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Vos données de paiement sont chiffrées et
                                    sécurisées
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage
