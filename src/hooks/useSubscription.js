import { useAuth } from '@/hooks/auth'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { useState } from 'react'

export const useSubscription = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { data: plansData } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: async () => {
            const response = await axios.get('/api/subscription/plans')
            return response.data
        }
    })

    // Transformer l'objet des plans en tableau
    const plans = plansData ? Object.values(plansData) : []

    // Calcul des jours restants d'essai
    const getTrialDaysLeft = () => {
        if (!user?.trial_ends_at) return 0
        const trialEnd = new Date(user.trial_ends_at)
        const today = new Date()
        const diffTime = trialEnd - today
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    // Gestion de l'abonnement avec Stripe
    const subscribe = async (priceId, paymentMethodId) => {
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await axios.post('/api/subscribe', {
                price_id: priceId,
                payment_method_id: paymentMethodId
            })
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        plans,
        subscribe,
        isTrialing: user?.trial_ends_at && getTrialDaysLeft() > 0,
        trialDaysLeft: getTrialDaysLeft(),
        currentPlan: user?.user_plan,
        isSubscribed: user?.user_subscription_status === 'active'
    }
} 