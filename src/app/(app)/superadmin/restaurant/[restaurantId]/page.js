'use client'

import { useParams } from 'next/navigation'
import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shadcn-components/ui/tabs'
import { useFindAllQrCodesByRestaurantId } from '@/services/qr-code/useFindAllQrCodesByRestaurantId'
import { useFindAllMenusByRestaurantId } from '@/services/menu/useFindAllMenusByRestaurantId'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shadcn-components/ui/table'
import { useState } from 'react'
import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import CardButton from '@/components/CardButton'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/shadcn-components/ui/sheet'
import { Button } from '@/shadcn-components/ui/button'
import {
    Plus,
    TableProperties,
    CookingPot,
} from 'lucide-react'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useCountMenuItemsByMenuId } from '@/services/menu-item/useCountMenuItemByMenuId'
import Link from 'next/link'
import CardStats from '@/components/CardStats'
import { QrCode } from 'lucide-react'
import MenuItem from '@/components/MenuItem'
import { useQueryClient } from '@tanstack/react-query'

export default function RestaurantPage() {
    const { restaurantId } = useParams()
    const queryClient = useQueryClient()
    const [selectedMenuId, setSelectedMenuId] = useState(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const { data: restaurant, isLoading } = useFindRestaurantById(restaurantId)
    const {
        data: qrCodes,
        isLoading: isLoadingQrCodes,
        isFetching: isFetchingQrCodes,
    } = useFindAllQrCodesByRestaurantId(restaurantId)
    const {
        data: menus,
        isLoading: isLoadingMenus,
        isFetching: isFetchingMenus,
    } = useFindAllMenusByRestaurantId(restaurantId)

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(selectedMenuId)

    const {
        data: menuCategoriesCount,
        isLoading: isLoadingMenuCategoriesCount,
        isFetching: isFetchingMenuCategoriesCount,
    } = useCountMenuCategoriesByMenuId(selectedMenuId)

    const {
        data: menuItemsCount,
        isLoading: isLoadingMenuItemsCount,
        isFetching: isFetchingMenuItemsCount,
    } = useCountMenuItemsByMenuId(selectedMenuId)

    const handleMenuClick = menuId => {
        setSelectedMenuId(menuId)
        setIsSheetOpen(true)
    }

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuItems', selectedMenuId])
    }

    return (
        <div className="space-y-4">
            <BreadcrumbCustom
                items={[
                    {
                        title: 'Dashboard',
                        href: '/superadmin/dashboard',
                    },
                    {
                        title: 'Restaurants',
                        href: '/superadmin/restaurants',
                    },
                    {
                        title: restaurant?.name || 'Chargement...',
                        href: `/superadmin/restaurant/${restaurantId}`,
                    },
                ]}
            />

            {isLoading ? (
                <Skeleton className="h-[100px] w-full" />
            ) : (
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">
                        {restaurant.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Plan</p>
                            <p className="font-medium capitalize">
                                {restaurant.owner.user_plan}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Statut</p>
                            <p className="font-medium capitalize">
                                {restaurant.owner.user_subscription_status}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Tabs defaultValue="qrcodes" className="w-full">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="qrcodes">QR Codes</TabsTrigger>
                        <TabsTrigger value="menus">Menus</TabsTrigger>
                    </TabsList>

                    <TabsContent value="qrcodes" className="m-0">
                        <Link
                            href={`/superadmin/configurate-qr-code/restaurant/${restaurantId}`}
                            asChild>
                            <Button>
                                <QrCode className="m1-2 h-4 w-4" />
                                Associer les QR codes
                            </Button>
                        </Link>
                    </TabsContent>
                    <TabsContent value="menus" className="m-0">
                        {/* <Link
                            href={`/superadmin/configurate-qr-code/restaurant/${restaurantId}`}
                            asChild> */}
                        <Button disabled>
                            <Plus className="h-4 w-4" />
                            Ajouter un menu
                        </Button>
                        {/* </Link> */}
                    </TabsContent>
                </div>

                <TabsContent value="qrcodes">
                    {isLoadingQrCodes || isFetchingQrCodes ? (
                        <Skeleton className="h-[200px] w-full" />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Label</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {qrCodes?.map(qr => (
                                    <TableRow key={qr.id}>
                                        <TableCell>{qr.label}</TableCell>
                                        <TableCell className="capitalize">
                                            {qr.qr_type}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {qr.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TabsContent>

                <TabsContent value="menus">
                    {isLoadingMenus || isFetchingMenus ? (
                        <Skeleton className="h-[200px] w-full" />
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {menus?.map(menu => (
                                <div
                                    key={menu.id}
                                    onClick={() => handleMenuClick(menu.id)}
                                    className="cursor-pointer">
                                    <CardButton
                                        title={menu.name.fr}
                                        subtitle="Cliquez pour voir les articles"
                                        widthFull
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Articles du menu</SheetTitle>
                    </SheetHeader>

                    <div className="mt-8 flex flex-col flex-wrap gap-4">
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
                            {isLoadingMenuItemsCount ||
                            isFetchingMenuItemsCount ? (
                                <Skeleton className="h-20 w-full" />
                            ) : (
                                <CardStats
                                    title="Articles"
                                    value={menuItemsCount?.count}
                                    icon={
                                        <CookingPot
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
                                <div
                                    key={category.id}
                                    className="flex flex-col gap-4">
                                    <div className="flex items-center gap-5 font-medium">
                                        {category.name?.fr}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {items.map(item => (
                                            <MenuItem
                                                key={item.id}
                                                item={item}
                                                category={category}
                                                menuId={selectedMenuId}
                                                handleCallbackSuccess={
                                                    handleCallbackSuccess
                                                }
                                            />
                                        ))}

                                        <Link
                                            href={`/admin/category/${category.id}/item/create`}
                                            className="w-full">
                                            <div className="h-fit border border-dashed bg-slate-50 hover:bg-slate-100 border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer w-full">
                                                <div className="flex flex-row gap-1 items-center">
                                                    <Plus width={15} />
                                                    <p className="text-sm text-slate-900 font-normal">
                                                        Ajouter un article ici
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
