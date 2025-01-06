
import { getMenuItemsByMenuCategoryId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllMenuItemsByMenuCategoryId = menuCategoryId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuItems', menuCategoryId],
        queryFn: () => getMenuItemsByMenuCategoryId(menuCategoryId),
        enabled: !!menuCategoryId,
    })

    const menuItems = data?.data

    return { data: menuItems, isLoading, isFetching }
}
