'use client'

import { useToast } from '@/hooks/use-toast'
import { postCreateMenuItem } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useCreateMenuItem = ({ handleCallbackSuccess, categoryId }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => postCreateMenuItem(data, categoryId),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            toast({
                title: 'Élément créé avec succès',
                description: 'L\'élément a été ajouté à votre menu',
            })
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