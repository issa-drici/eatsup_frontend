'use client'

import { useToast } from '@/hooks/use-toast'
import { postCreateMenuCategory } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useCreateMenuCategory = ({ handleCallbackSuccess, menuId }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: data => postCreateMenuCategory(data, menuId),
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
