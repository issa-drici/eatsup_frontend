'use client'

import { useParams } from 'next/navigation'
import CardStats from '@/components/CardStats'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { TableProperties } from 'lucide-react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import CardButton from '@/components/CardButton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { Button } from '@/shadcn-components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import { Pen } from 'lucide-react'
import { Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const Categories = () => {
    const { menuId } = useParams()

    const {
        data: menuCategoriesCount,
        isLoading: isLoadingMenuCategoriesCount,
        isFetching: isFetchingMenuCategoriesCount,
    } = useCountMenuCategoriesByMenuId(menuId)

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(menuId)

    return (
        <>
            <div className="mb-4">
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
                            title: 'Éléments',
                            href: `/admin/menu/${menuId}/items`,
                        },
                    ]}
                />
            </div>
            <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
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
                </div>
                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuItems?.map(({ category, items }) => (
                        <div key={category.id} className="flex flex-col gap-4">
                            <div className="flex items-center gap-5 font-medium">
                                {category.name?.fr}
                            </div>
                            <div className="flex flex-col gap-2">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex gap-2 items-center">
                                        <CardButton
                                            title={item.name.fr}
                                            subtitle={item.description.fr}
                                            rightLabel={`${item.price}€`}
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
                                                        item.description?.fr
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
                                ))}

                                <Link href={`/admin/category/${category.id}/item/create`} className="w-full" asChild>
                                    <div className="h-fit border border-dashed bg-slate-50 hover:bg-slate-100 border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer w-full">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Plus width={15} />
                                            <p className="text-sm text-slate-900 font-normal">
                                                Ajouter un élément ici
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Categories
