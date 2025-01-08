import { useQuery } from '@tanstack/react-query'
import { getAllRestaurantsWithoutQRCode } from '@/utils/api-requests'

export const useFindAllRestaurantsWithoutQRCode = () => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['restaurants-without-qrcode'],
        queryFn: () => getAllRestaurantsWithoutQRCode(),
    })

    const restaurants = data?.data

    return { data: restaurants, isLoading, isFetching }
}