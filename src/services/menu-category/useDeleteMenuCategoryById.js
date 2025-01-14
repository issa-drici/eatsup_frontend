import { useToast } from '@/hooks/use-toast'
import { deleteMenuCategoryById } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMenuCategoryById = ({ handleCallbackSuccess }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: menuCategoryId => deleteMenuCategoryById(menuCategoryId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            toast({
                title: 'Catégorie supprimée avec succès',
                description: "La catégorie a été supprimée de votre menu",
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