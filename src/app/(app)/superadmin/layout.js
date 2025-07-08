'use client'

import { useAuth } from '@/hooks/auth'
import SidebarWrapper from '@/components/SidebarWrapper'
import Loading from '@/app/(app)/admin/Loading'
import { Toaster } from '@/shadcn-components/ui/toaster'
import { SidebarProvider } from '@/shadcn-components/ui/sidebar'

const SIDEBAR_WIDTH = 224 // px

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-background">
                {/* Sidebar */}
                <div
                    className="fixed inset-y-0 left-0 z-30 bg-white border-r"
                    style={{ width: SIDEBAR_WIDTH }}
                >
                    <SidebarWrapper user={user} />
                </div>
                {/* Main content */}
                <main
                    className="flex-1 px-6 py-8"
                    style={{ marginLeft: SIDEBAR_WIDTH }}
                >
                    {children}
                </main>
                <Toaster />
            </div>
        </SidebarProvider>
    )
}

export default AppLayout
