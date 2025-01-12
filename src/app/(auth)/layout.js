import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Suspense } from 'react'

export const metadata = {
    title: 'Laravel',
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="text-gray-900 antialiased">
                <AuthCard
                    logo={
                        <Link href="/">
                            <ApplicationLogo className="w-auto h-4 fill-current text-gray-500" />
                        </Link>
                    }>
                    <Suspense fallback={<div>Chargement...</div>}>
                        {children}
                    </Suspense>
                </AuthCard>
            </div>
        </div>
    )
}

export default Layout
