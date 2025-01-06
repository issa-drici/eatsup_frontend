import { getMenuCategoriesByMenuIdCount } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useCountMenuCategoriesByMenuId = menuId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuCategories-count', menuId],
        queryFn: () => getMenuCategoriesByMenuIdCount(menuId),
        enabled: !!menuId,
    })

    const menuCategoriesCount = data?.data

    return { data: menuCategoriesCount, isLoading, isFetching }
}
