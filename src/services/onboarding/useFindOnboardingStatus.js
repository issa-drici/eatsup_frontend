import { useQuery } from '@tanstack/react-query'
import { getOnboardingStatus } from '@/utils/api-requests'

export const useFindOnboardingStatus = (restaurantId) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['onboarding-status', restaurantId],
        queryFn: () => getOnboardingStatus(restaurantId),
        enabled: !!restaurantId,
    })

    const onboardingStatus = data?.data

    return { data: onboardingStatus, isLoading, isFetching }
}
