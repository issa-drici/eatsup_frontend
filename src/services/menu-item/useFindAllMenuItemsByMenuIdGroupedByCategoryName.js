
import { getAllMenuItemsByMenuIdGroupedByCategoryName } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllMenuItemsByMenuIdGroupedByCategoryName = menuId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuItems', menuId],
        queryFn: () => getAllMenuItemsByMenuIdGroupedByCategoryName(menuId),
        enabled: !!menuId,
    })

    const menuItems = data?.data

    return { data: menuItems, isLoading, isFetching }
}