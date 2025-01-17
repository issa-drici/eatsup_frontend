import { useToast } from '@/hooks/use-toast'
import { postUpdateMenuItem } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMenuItem = ({
    handleCallbackSuccess,
    itemId,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => postUpdateMenuItem(data, itemId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            return true
        },
        onError: async error => {
            toast({
                title: 'Une erreur est survenue',
                description: error?.response?.data?.message,
            })
            return false
        },
    })
}
