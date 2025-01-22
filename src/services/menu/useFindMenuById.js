'use client'

import { getMenuById } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindMenuById = menuId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menu', menuId],
        queryFn: () => getMenuById(menuId),
        enabled: !!menuId,
    })

    const menu = data?.data

    return { data: menu, isLoading, isFetching }
}
