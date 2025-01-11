import { postCreateQrCodeSession } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useCreateQrCodeSession = ({ qrCodeId }) => {
    return useMutation({
        mutationFn: data => postCreateQrCodeSession(data, qrCodeId),
        onSuccess: async () => {
            return true
        },
        onError: async () => {
            return false
        },
    })
}
