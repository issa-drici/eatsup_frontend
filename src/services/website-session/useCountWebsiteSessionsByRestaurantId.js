'use client'

import { getWebsiteSessionsCountByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useCountWebsiteSessionsByRestaurantId = restaurantId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['website-sessions', restaurantId],
        queryFn: () => getWebsiteSessionsCountByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const websiteSessions = data?.data

    return { data: websiteSessions, isLoading, isFetching }
}
