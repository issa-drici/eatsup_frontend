import { getMenuItemsByMenuIdCount } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useCountMenuItemsByMenuId = menuId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuItems-count', menuId],
        queryFn: () => getMenuItemsByMenuIdCount(menuId),
        enabled: !!menuId,
    })

    const menuItemsCount = data?.data

    return { menuItemsCount, isLoading, isFetching }
}
