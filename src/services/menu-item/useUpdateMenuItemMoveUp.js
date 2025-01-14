import { useToast } from '@/hooks/use-toast'
import { putMenuItemMoveUp } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMenuItemMoveUp = ({
    handleCallbackSuccess,
    itemId,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => putMenuItemMoveUp(data, itemId),
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
