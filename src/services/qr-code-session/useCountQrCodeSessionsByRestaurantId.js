'use client'

import { getQrCodeSessionsCountByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useCountQrCodeSessionsByRestaurantId = restaurantId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['qr-code-sessions', restaurantId],
        queryFn: () => getQrCodeSessionsCountByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const qrCodesSessions = data?.data

    return { data: qrCodesSessions, isLoading, isFetching }
}
