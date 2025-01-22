import { postCreateWebsiteSession } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useCreateWebsiteSession = ({ websiteId }) => {
    return useMutation({
        mutationFn: data => {
            if (websiteId) {
                return postCreateWebsiteSession(data, websiteId)
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
