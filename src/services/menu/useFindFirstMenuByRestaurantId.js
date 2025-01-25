import { getFirstMenuByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindFirstMenuByRestaurantId = restaurantId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menu-first', restaurantId],
        queryFn: () => getFirstMenuByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const menu = data?.data

    return { data: menu, isLoading, isFetching }
}
