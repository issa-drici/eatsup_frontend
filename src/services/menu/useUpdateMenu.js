import { useMutation } from '@tanstack/react-query'
import { postUpdateMenu } from '@/utils/api-requests'
import { useToast } from '@/hooks/use-toast'

export const useUpdateMenu = ({ handleCallbackSuccess, menuId, restaurantId }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => postUpdateMenu(data, menuId, restaurantId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            toast({
                title: 'Menu mis à jour avec succès',
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