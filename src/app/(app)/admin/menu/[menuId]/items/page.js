'use client'

import { useParams } from 'next/navigation'
import CardStats from '@/components/CardStats'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { TableProperties } from 'lucide-react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'

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
                        title: 'Élements',
                        href: `/admin/menu/${menuId}/items`,
                    },
                ]}
            />
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
                            <div className="flex items-center gap-5">
                                {category.name?.fr}
                                {/* <CardButton
                                    title={category.name?.fr}
                                    widthFull
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200">
                                            <EllipsisVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItems>
                                            Modifier
                                            <DropdownMenuShortcut>
                                                <Pen width={10} />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItems>
                                        <DropdownMenuItems>
                                            Supprimer
                                            <DropdownMenuShortcut>
                                                <Trash width={10} />
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItems>
                                    </DropdownMenuContent>
                                </DropdownMenu> */}
                            </div>
                            <div className="ml-4 flex flex-col gap-2">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-5">
                                        {item.name?.fr}
                                        {/* <CardButton
                                            title={item.name?.fr}
                                            subtitle={`${item.price}€`}
                                            widthFull
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200">
                                                    <EllipsisVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItems>
                                                    Modifier
                                                    <DropdownMenuShortcut>
                                                        <Pen width={10} />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItems>
                                                <DropdownMenuItems>
                                                    Supprimer
                                                    <DropdownMenuShortcut>
                                                        <Trash width={10} />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItems>
                                            </DropdownMenuContent>
                                        </DropdownMenu> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Categories
