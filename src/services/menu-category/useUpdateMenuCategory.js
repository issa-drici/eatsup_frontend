import { useToast } from '@/hooks/use-toast'
import { putUpdateMenuCategory } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMenuCategory = ({
    handleCallbackSuccess,
    categoryId,
}) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => putUpdateMenuCategory(data, categoryId),
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
