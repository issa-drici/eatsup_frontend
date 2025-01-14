import { useToast } from '@/hooks/use-toast'
import { putMenuItemMoveDown } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMenuItemMoveDown = ({
    handleCallbackSuccess,
    itemId,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => putMenuItemMoveDown(data, itemId),
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
