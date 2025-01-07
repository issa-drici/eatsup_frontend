'use client'

import { useParams } from 'next/navigation'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { EllipsisVertical, Pen, Trash } from 'lucide-react'
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
import { useFindAllMenuItemsByMenuCategoryId } from '@/services/menu-item/useFindAllMenuItemsByMenuCategoryId'
import { useFindMenuCategoryById } from '@/services/menu-category/useFindMenuCategoryById'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const Category = () => {
    const { menuId, categoryId } = useParams()

    const {
        data: menuCategory,
        isLoading: isLoadingMenuCategory,
        isFetching: isFetchingMenuCategory,
    } = useFindMenuCategoryById(categoryId)

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuCategoryId(categoryId)

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                {!isLoadingMenuCategory || !isFetchingMenuCategory ? (
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
                            {
                                title: menuCategory?.name?.fr,
                                href: `/admin/menu/${menuId}/categories`,
                            },
                        ]}
                    />
                ) : null}
                <Link href={`/admin/category/${categoryId}/item/create`}>
                    <Button>
                        <Plus /> Nouveau
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col flex-wrap gap-4">
                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuItems?.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                            <CardButton
                                title={item.name?.fr}
                                subtitle={item.description?.fr}
                                rightLabel={`${item.price}€`}
                                url={`/admin/menu/${menuId}/category/${item.id}`}
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
                    ))
                )}
            </div>
        </>
    )
}

export default Category
