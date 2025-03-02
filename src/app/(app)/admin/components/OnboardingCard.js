'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { useFindOnboardingStatus } from '@/services/onboarding/useFindOnboardingStatus'

const OnboardingCard = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [isMinimized, setIsMinimized] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { user } = useAuth({ middleware: 'auth' })
    const { data: onboardingSteps, isLoading, isFetching } = useFindOnboardingStatus(user?.restaurant?.id)

    useEffect(() => {
        const lastClosedDate = localStorage.getItem('onboardingCardLastClosed')
        const today = new Date().toDateString()

        if (lastClosedDate === today) {
            setIsVisible(false)
        }
    }, [])

    // Nouvel useEffect pour gérer l'état minimisé en fonction de la route
    useEffect(() => {
        if (pathname === '/admin/dashboard') {
            setIsMinimized(false)
        }
    }, [pathname])

    const handleClose = () => {
        setIsVisible(false)
        localStorage.setItem('onboardingCardLastClosed', new Date().toDateString())
    }

    const handleMinimize = () => {
        setIsMinimized(!isMinimized)
    }

    const handleTaskClick = (url) => {
        setIsMinimized(true)
        router.push(url)
    }

    // Vérifier si toutes les étapes sont complétées et les états de chargement
    if (!isVisible || isLoading || isFetching || !onboardingSteps || onboardingSteps.filter(step => !step.completed).length === 0) return null

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <div className={`bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 ${
                isMinimized
                    ? 'shadow-md w-12 rounded-full sm:w-96'
                    : 'shadow-[0px_0px_57px_26px_rgba(0,_0,_0,_0.1)] w-96'
            }`}>
                <div
                    onClick={handleMinimize}
                    className="p-3 border-b border-gray-100 cursor-pointer"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                                <span className={isMinimized ? 'hidden sm:inline' : ''}>Débloquez tout 🔑</span>
                                <span className={isMinimized ? 'inline sm:hidden' : 'hidden'}>💡</span>
                            </h3>
                            <span className={`text-sm text-gray-500 ${isMinimized ? 'hidden sm:inline' : ''}`}>
                                {onboardingSteps?.filter(step => !step.completed).length} étapes restantes
                            </span>
                            <span className={`absolute text-xs font-bold top-0 right-0 bg-red-600 w-5 h-5 translate-x-1/3 -translate-y-1/3 flex items-center justify-center text-white rounded-full ${isMinimized ? 'sm:hidden' : 'hidden'}`}>
                                {onboardingSteps?.filter(step => !step.completed).length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                {isMinimized ? (
                                    <svg className={`${isMinimized ? 'hidden sm:block sm:w-5 sm:h-5 w-4 h-4' : 'w-5 h-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClose()
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className={`${isMinimized ? 'hidden sm:block sm:w-5 sm:h-5 w-4 h-4' : 'w-5 h-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`transition-all duration-300 ease-in-out ${
                    isMinimized
                        ? 'max-h-0 opacity-0'
                        : 'max-h-[500px] opacity-100'
                }`}>
                    <div className="p-4">
                        <ul className="space-y-2">
                            {onboardingSteps?.map((step) => (
                                <li
                                    key={step.id}
                                    onClick={() => handleTaskClick(step.url)}
                                    className={`group flex items-center gap-3 py-1 px-2 -mx-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                        step.completed
                                            ? 'opacity-50'
                                            : 'hover:bg-gray-50/80 hover:shadow-sm hover:translate-x-1'
                                    }`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                        !step.completed
                                            ? 'bg-indigo-100 group-hover:bg-indigo-200'
                                            : 'bg-gray-100'
                                    }`}>
                                        <span className="text-base">{step.icon}</span>
                                    </div>
                                    <div className="flex-grow flex items-center justify-between">
                                        <h4 className={`font-medium text-sm ${step.completed ? 'line-through' : ''}`}>
                                            {step.title}
                                        </h4>
                                        {step.completed ? (
                                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <span className="text-indigo-600 text-xs font-medium transition-transform group-hover:translate-x-0.5">
                                                →
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingCard
