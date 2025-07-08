import { getAllRestaurants } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllRestaurants = (params = {}) => {
    const { name, page, perPage } = params

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['restaurants', { name, page, perPage }],
        queryFn: async () => {
            try {
                console.log('🔍 Fetching restaurants with params:', { name, page, perPage })
                const result = await getAllRestaurants({ name, page, perPage })
                console.log('✅ Restaurants API response:', result)
                return result
            } catch (error) {
                console.error('❌ Error fetching restaurants:', error)
                throw error
            }
        },
        keepPreviousData: true,
        retry: 1,
        retryDelay: 1000
    })

    const restaurants = data?.data
    const meta = data?.meta

    console.log('🔍 useFindAllRestaurants result:', {
        restaurants,
        meta,
        isLoading,
        isFetching,
        error: error?.message
    })

    return {
        data: restaurants,
        meta,
        isLoading,
        isFetching,
        error
    }
}
