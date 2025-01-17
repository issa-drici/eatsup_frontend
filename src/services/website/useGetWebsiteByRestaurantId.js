import { getWebsiteByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useGetWebsiteByRestaurantId = (restaurantId) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['website', restaurantId],
        queryFn: () => getWebsiteByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const website = data?.data

    return { data: website, isLoading, isFetching }
} 