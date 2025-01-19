import { useMutation } from '@tanstack/react-query'
import { subscribe } from '@/utils/api-requests'

export const useSubscribe = ({ handleCallbackSuccess }) => {
    return useMutation({
        mutationFn: ({ priceId, paymentMethodId }) => 
            subscribe(priceId, paymentMethodId),
        onSuccess: () => {
            if (handleCallbackSuccess) {
                handleCallbackSuccess()
            }
        }
    })
} 