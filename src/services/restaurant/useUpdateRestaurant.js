import { useToast } from '@/hooks/use-toast'
import { putUpdateRestaurant } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateRestaurant = ({
    handleCallbackSuccess,
    restaurantId,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => putUpdateRestaurant(data, restaurantId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            toast({
                title: 'Restaurant mis à jour avec succès',
            })
            return true
        },
        onError: async error => {
            toast({
                title: 'Une erreur est survenue',
                description: error?.response?.data?.message,
                variant: 'destructive',
            })
            return false
        },
    })
} 