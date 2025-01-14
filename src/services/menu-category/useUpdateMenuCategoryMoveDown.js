import { useToast } from '@/hooks/use-toast'
import { putMenuCategoryMoveDown } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMenuCategoryMoveDown = ({
    handleCallbackSuccess,
    categoryId,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => putMenuCategoryMoveDown(data, categoryId),
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
