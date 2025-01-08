'use client'

import { getQrCodesByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllQrCodesByRestaurantId = (restaurantId) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['qr-codes', restaurantId],
        queryFn: () => getQrCodesByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const qrCodes = data?.data

    return { data: qrCodes, isLoading, isFetching }
} 