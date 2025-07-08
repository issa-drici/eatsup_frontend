'use client'

import { SidebarTrigger } from '@/shadcn-components/ui/sidebar'
import AppSidebar from './AppSidebar'

const SidebarWrapper = ({ user }) => {
    return (
        <>
            <AppSidebar user={user} />
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <SidebarTrigger />
            </div>
        </>
    )
}

export default SidebarWrapper
