'use client'

import { useToast } from '@/hooks/use-toast'
import { putAssociateQrCode } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useAssociateQrCode = ({ handleCallbackSuccess }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: ({ qrId, data }) => putAssociateQrCode(qrId, data),
        onSuccess: async () => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess()
            }
            toast({
                title: "QR Code associé",
                description: "Le QR Code a été associé avec succès",
            })
            return true
        },
        onError: async error => {
            toast({
                title: "Erreur",
                description: error?.response?.data?.message || "Une erreur est survenue lors de l'association du QR Code",
                variant: "destructive"
            })
            return false
        },
    })
} 