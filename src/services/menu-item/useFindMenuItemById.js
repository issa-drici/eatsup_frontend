import { getMenuItemById } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindMenuItemById = itemId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuItem', itemId],
        queryFn: () => getMenuItemById(itemId),
        enabled: !!itemId,
    })

    const menuItem = data?.data

    return { data: menuItem, isLoading, isFetching }
}
