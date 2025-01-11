import { useToast } from '@/hooks/use-toast'
import { deleteMenuItemById } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMenuItemById = ({ handleCallbackSuccess }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: menuItemId => deleteMenuItemById(menuItemId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            toast({
                title: 'Élément supprimé avec succès',
                description: "L'élément a été supprimé de votre menu",
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
