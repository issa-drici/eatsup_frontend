import { getMenuInfosHomeByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindMenuInfosHomeByRestaurantId = restaurantId => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['menu-infos-home', restaurantId],
        queryFn: () => getMenuInfosHomeByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const menuInfosHome = data?.data

    return { data: menuInfosHome, isLoading, isFetching }
}
