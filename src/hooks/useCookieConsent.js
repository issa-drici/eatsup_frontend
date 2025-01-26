import { useState, useEffect } from 'react'

export const useCookieConsent = () => {
    const [cookieConsent, setCookieConsent] = useState(null)

    useEffect(() => {
        const storedConsent = localStorage.getItem('cookieConsent')
        setCookieConsent(storedConsent)
    }, [])

    const isConsentAccepted = () => cookieConsent === 'accepted'

    // Fonction utilitaire pour vérifier si on peut utiliser le stockage
    const canUseStorage = () => {
        const consent = localStorage.getItem('cookieConsent')
        return consent === 'accepted'
    }

    return {
        cookieConsent,
        isConsentAccepted,
        canUseStorage
    }
} 