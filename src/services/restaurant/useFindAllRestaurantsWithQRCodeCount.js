import { useQuery } from '@tanstack/react-query'
import { getAllRestaurantsWithQRCodeCount } from '@/utils/api-requests'

export const useFindAllRestaurantsWithQRCodeCount = () => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['restaurants-with-qr-code-count'],
        queryFn: () => getAllRestaurantsWithQRCodeCount(),
    })

    const restaurants = data?.data

    return { data: restaurants, isLoading, isFetching }
}
