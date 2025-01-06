import { getAllMenuCategoriesByMenuId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllMenuCategoriesByMenuId = menuId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuCategories', menuId],
        queryFn: () => getAllMenuCategoriesByMenuId(menuId),
        enabled: !!menuId,
    })

    const menuCategories = data?.data

    return { data: menuCategories, isLoading, isFetching }
}
