'use client'

import { useParams } from 'next/navigation'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { EllipsisVertical, Pen, Plus, Trash } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { Button } from '@/shadcn-components/ui/button'
import { useFindAllMenuCategoriesByMenuId } from '@/services/menu-category/useFindAllMenuCategoriesByMenuId'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Categories = () => {
    const { menuId } = useParams()

    const {
        data: menuCategories,
        isLoading: isLoadingMenuCategories,
        isFetching: isFetchingMenuCategories,
    } = useFindAllMenuCategoriesByMenuId(menuId)

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <BreadcrumbCustom
                    items={[
                        {
                            title: 'Dashboard',
                            href: '/admin/dashboard',
                        },
                        {
                            title: 'Menu',
                            href: `/admin/menu/${menuId}`,
                        },
                        {
                            title: 'Catégories',
                            href: `/admin/menu/${menuId}/categories`,
                        },
                    ]}
                />
                    <Link href={`/admin/menu/${menuId}/category/create`}>
                        <Button>
                            <Plus /> Nouveau
                        </Button>
                    </Link>
            </div>
            <div className="flex flex-col flex-wrap gap-4">
                {/* <div className="flex gap-4">
                    {isLoadingMenuCategoriesCount ||
                    isFetchingMenuCategoriesCount ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <CardStats
                            title="Catégories"
                            progression="30 derniers jours"
                            value={menuCategoriesCount?.count}
                            icon={
                                <TableProperties
                                    size={16}
                                    className="text-slate-400"
                                />
                            }
                        />
                    )}
                </div> */}
                {isLoadingMenuCategories || isFetchingMenuCategories ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuCategories?.map(category => (
                        <div
                            key={category.id}
                            className="flex items-center gap-2">
                            <CardButton
                                title={category.name?.fr}
                                subtitle={category.description?.fr}
                                url={`/admin/menu/${menuId}/category/${category.id}`}
                                widthFull
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className={cn(
                                            'shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200',
                                            category.description?.fr
                                                ? 'h-[66px]'
                                                : 'h-[46px]',
                                        )}>
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        Modifier
                                        <DropdownMenuShortcut>
                                            <Pen width={10} />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Supprimer
                                        <DropdownMenuShortcut>
                                            <Trash width={10} />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Categories
