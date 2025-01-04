import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Les données restent fraîches pendant 5 minutes
            cacheTime: 1000 * 60 * 10, // Les données sont gardées en cache pendant 10 minutes
            retry: 2, // Réessaie automatiquement en cas d'erreur (2 fois)
        },
    },
})

export default queryClient
