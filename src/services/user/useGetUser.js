import { useQuery } from 'react-query'
import axios from '@/lib/axios'

/**
 * Recherche du user
 * @author Issa DRICI <issadricipro@gmail.com>
 * @param {boolean} enabled
 * @returns
 */
export const useGetUser = (enabled = true) => {
    const { data, isLoading, isFetching, isError } = useQuery(
        ['user'],
        () => axios.get('/api/user'),
        {
            retry: false,
            enabled,
        },
    )

    const { station, biocentres } = data?.data ?? {}

    return {
        station: station ?? [],
        biocentres: biocentres ?? [],
        isError,
        isLoading,
        isFetching,
    }
}
