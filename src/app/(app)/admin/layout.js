'use client'

import * as React from 'react'
import { useAuth } from '@/hooks/auth'
import AppSidebar from '@/components/AppSidebar'
import Loading from '@/app/(app)/admin/Loading'
import { Toaster } from '@/shadcn-components/ui/toaster'
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/shadcn-components/ui/sidebar'
import { Separator } from '@/shadcn-components/ui/separator'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/shadcn-components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { User } from 'lucide-react'
import ApplicationLogo from '@/components/ApplicationLogo'

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
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                {/* Header simple */}
                {/* <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-white sticky top-0 z-10"> */}
                {/* Partie gauche - Trigger sidebar */}

                {/* Partie droite - Utilisateur */}
                {/* <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                                            {user?.name?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="hidden sm:flex flex-col items-start text-sm">
                                        <span className="font-medium text-gray-900">
                                            {user?.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Propriétaire
                                        </span>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Mon profil</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <span>Se déconnecter</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header> */}

                {/* Contenu principal */}
                <main className="flex flex-1 flex-col min-h-0 md:pt-4 px-3 bg-sidebar">
                    <div className="md:hidden flex items-center justify-between gap-4 py-3">
                        <SidebarTrigger className="md:hidden" />

                        <ApplicationLogo className="h-4 w-auto" />
                        <div className="w-7" />
                    </div>
                    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-white rounded-t-xl shadow-[3px_0px_39px_5px_rgba(0,_0,_0,_0.1)] z-30">
                        <div className="w-full max-w-4xl mx-auto ">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    )
}

export default AppLayout
