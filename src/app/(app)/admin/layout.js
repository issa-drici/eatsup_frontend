'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/admin/Navigation'
import Loading from '@/app/(app)/admin/Loading'
import OnboardingCard from '@/app/(app)/admin/components/OnboardingCard'
import { Toaster } from '@/shadcn-components/ui/toaster'
import { redirect } from 'next/navigation'

const AppLayout = ({ children }) => {
    const { user, isLoading } = useAuth({ middleware: 'auth' })

    if (
        !isLoading &&
        !user?.restaurant?.address &&
        !user?.restaurant?.postal_code &&
        !user?.restaurant?.city
    ) {
        redirect('/register/address')
    }

    if (!isLoading && !user?.restaurant?.type_slug) {
        redirect('/register/type')
    }

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen flex flex-col bg-white sm:bg-gray-100">
            <Navigation user={user} />

            <main className="flex flex-col flex-grow">
                <div className="max-w-7xl w-full flex flex-col flex-grow mx-auto sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                    <div className="flex flex-col flex-grow overflow-hidden sm:bg-white sm:shadow-sm sm:rounded-b-lg">
                        <div className="p-6 pt-3 sm:border-b border-gray-200 flex flex-col flex-grow">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <OnboardingCard />
            <Toaster />
        </div>
    )
}

export default AppLayout
