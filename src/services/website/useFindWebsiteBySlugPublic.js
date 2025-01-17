'use client'

import { getPublicWebsiteBySlug } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindWebsiteBySlugPublic = (typeSlug, citySlug, nameSlug) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['public-website', typeSlug, citySlug, nameSlug],
        queryFn: () => getPublicWebsiteBySlug(typeSlug, citySlug, nameSlug),
        enabled: !!typeSlug && !!citySlug && !!nameSlug,
    })

    const website = data?.data

    return { data: website, isLoading, isFetching }
} 