import { useToast } from '@/hooks/use-toast'
import { postUpdateRestaurant } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateRestaurant = ({
    handleCallbackSuccess,
    restaurantId,
    withToast = false,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => postUpdateRestaurant(data, restaurantId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            if (withToast) {
                toast({
                    title: 'Restaurant mis à jour avec succès',
                })
            }
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
