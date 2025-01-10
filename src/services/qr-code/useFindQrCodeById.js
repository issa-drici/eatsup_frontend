'use client'

import { getQrCodeById } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindQrCodeById = qrcodeId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['qrcode', qrcodeId],
        queryFn: () => getQrCodeById(qrcodeId),
        enabled: !!qrcodeId,
    })

    const qrcode = data?.data

    return { data: qrcode, isLoading, isFetching }
}
