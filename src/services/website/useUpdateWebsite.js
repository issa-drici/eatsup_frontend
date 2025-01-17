import { postUpdateWebsite } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
export const useUpdateWebsite = ({ handleCallbackSuccess, restaurantId }) => {
    const { toast } = useToast()
    return useMutation({
        mutationFn: data => postUpdateWebsite(data, restaurantId),
        onSuccess: () => {
            if (handleCallbackSuccess) {
                handleCallbackSuccess()
            }
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
