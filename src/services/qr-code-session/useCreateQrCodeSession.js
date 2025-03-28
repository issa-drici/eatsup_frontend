import { postCreateQrCodeSession } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useCreateQrCodeSession = ({ qrCodeId }) => {
    return useMutation({
        mutationFn: data => {
            if (qrCodeId) {
                return postCreateQrCodeSession(data, qrCodeId)
            }
            return null
        },
        onSuccess: async () => {
            return true
        },
        onError: async () => {
            return false
        },
    })
}
