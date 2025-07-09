import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'

export const useDeleteMenuById = ({ handleCallbackSuccess }) => {
    return useMutation({
        mutationFn: async (menuId) => {
            const response = await axios.delete(`/api/menus/${menuId}`)
            return response.data
        },
        onSuccess: () => {
            if (handleCallbackSuccess) {
                handleCallbackSuccess()
            }
        },
    })
}
