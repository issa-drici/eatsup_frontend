import { getMenusByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllMenusByRestaurantId = restaurantId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menus', restaurantId],
        queryFn: () => getMenusByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const menus = data?.data

    return { menus, isLoading, isFetching }
}
