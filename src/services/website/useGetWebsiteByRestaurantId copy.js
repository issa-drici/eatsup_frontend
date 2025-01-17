import { getPublicWebsiteByRestaurantId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useGetPublicWebsiteByRestaurantId = (restaurantId) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['website', restaurantId],
        queryFn: () => getPublicWebsiteByRestaurantId(restaurantId),
        enabled: !!restaurantId,
    })

    const website = data?.data

    return { data: website, isLoading, isFetching }
} 