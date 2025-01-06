import { getMenuCategoryById } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindMenuCategoryById = categoryId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menuCategory', categoryId],
        queryFn: () => getMenuCategoryById(categoryId),
        enabled: !!categoryId,
    })

    const menuCategory = data?.data

    return { data: menuCategory, isLoading, isFetching }
}
