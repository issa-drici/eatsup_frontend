import { getAllRestaurants } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAllRestaurants = ({ name, page, perPage }) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['restaurants', { name, page, perPage }],
        queryFn: () => getAllRestaurants({ name, page, perPage }),
        keepPreviousData: true
    })

    const restaurants = data?.data
    const meta = data?.meta

    return { 
        data: restaurants, 
        meta,
        isLoading,
        isFetching
    }
} 