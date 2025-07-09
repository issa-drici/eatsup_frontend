'use client'

import * as React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/shadcn-components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/shadcn-components/ui/avatar'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Home, ChefHat, Store } from 'lucide-react'
import useIsMobile from '@/hooks/useIsMobile'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { User } from 'lucide-react'
import { useAuth } from '@/hooks/auth'
import { EllipsisVertical } from 'lucide-react'

export function AppSidebar(props) {
    const pathname = usePathname()
    const router = useRouter()
    const sidebar = useSidebar()
    const isMobile = useIsMobile()
    const restaurantId = props.user?.restaurant?.id

    const { user, logout } = useAuth({ middleware: 'auth' })

    // Navigation simplifiée - seulement les sections principales
    const navItems = [
        {
            title: 'Gestion',
            items: [
                {
                    title: 'Accueil',
                    url: '/admin/dashboard',
                    icon: <Home size={20} />,
                },
                {
                    title: 'Mon menu',
                    url: '/admin/menus',
                    icon: <ChefHat size={20} />,
                },
                {
                    title: 'Mon restaurant',
                    url: restaurantId
                        ? `/admin/restaurant/${restaurantId}/update`
                        : null,
                    icon: <Store size={20} />,
                },
            ],
        },
    ]

    // Marquer l'item actif
    const nav = navItems.map(group => ({
        ...group,
        items: group.items.map(item => {
            let isActive = false
            if (item.url && pathname) {
                if (item.title === 'Mon menu') {
                    isActive =
                        (pathname.includes('/menu') &&
                            pathname.includes('/restaurant/')) ||
                        pathname.includes('/menus')
                } else if (item.title === 'Mon restaurant') {
                    isActive =
                        pathname.includes('/restaurant') &&
                        !pathname.includes('/menu')
                } else {
                    isActive = pathname.startsWith(item.url)
                }
            }
            return { ...item, isActive }
        }),
    }))

    const handleMenuClick = (url, e) => {
        if (!url) return
        if (isMobile && sidebar && sidebar.open) {
            e.preventDefault()
            sidebar.setOpenMobile(false)
            setTimeout(() => {
                router.push(url)
            }, 200)
        }
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader className="flex items-center">
                <ApplicationLogo className="h-4 mt-3 w-auto" />
            </SidebarHeader>
            <SidebarContent>
                {nav.map(group => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map(item => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.isActive}
                                            tooltip={item.title}
                                            className="group">
                                            {item.url ? (
                                                <Link
                                                    href={item.url}
                                                    onClick={e =>
                                                        handleMenuClick(
                                                            item.url,
                                                            e,
                                                        )
                                                    }
                                                    className="flex items-center gap-3 p-3">
                                                    <span className="text-muted-foreground group-hover:text-foreground group-data-[active=true]:text-foreground transition-colors">
                                                        {item.icon}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <span className="opacity-50 cursor-not-allowed flex items-center gap-3 p-3">
                                                    <span className="text-muted-foreground">
                                                        {item.icon}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {item.title}
                                                    </span>
                                                </span>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 p-2 bg-white hover:bg-gray-50 rounded-xl transition-colors shadow-sm border">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-sm">
                                <span className="font-medium text-gray-900">
                                    {user?.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {user?.email}
                                </span>
                            </div>
                            <EllipsisVertical className="ml-auto w-4 h-4" />
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
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
