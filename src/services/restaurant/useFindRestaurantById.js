'use client'

import { getRestaurantById } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindRestaurantById = (restaurantId) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['restaurant', restaurantId],
        queryFn: () => getRestaurantById(restaurantId),
        enabled: !!restaurantId,
    })

    const restaurant = data?.data

    return { data: restaurant, isLoading, isFetching }
} 