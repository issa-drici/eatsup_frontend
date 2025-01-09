'use client'

import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useRouter } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn-components/ui/table"
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { useFindAllRestaurantsWithQRCodeCount } from '@/services/restaurant/useFindAllRestaurantsWithQRCodeCount'


const SuperAdminDashboard = () => {
    const router = useRouter()

    const {
        data: restaurants,
        isLoading: isLoadingRestaurants,
        isFetching: isFetchingRestaurants,
    } = useFindAllRestaurantsWithQRCodeCount()

    const handleRowClick = restaurantId => {
        router.push(`/superadmin/configurate-qr-code/restaurant/${restaurantId}`)
    }

    const getQrCodeCountByPlan = plan => {
        switch (plan) {
            case 'basic':
                return 17
            case 'premium':
                return 32
            case 'enterprise':
                return 62
            default:
                return 0
        }
    }

    return (
        <>
            <div className="mb-4">
                <BreadcrumbCustom
                    items={[
                        {
                            title: 'Dashboard',
                            href: '/superadmin/dashboard',
                        },
                        {
                            title: 'Configurateur QR Code',
                            href: '/superadmin/configurate-qr-code',
                        },

                    ]}
                />
            </div>

            <div className="flex flex-col flex-wrap gap-4">
                <p>Cliquez sur un restaurant pour accéder à la config de ses QR</p>
                {isLoadingRestaurants || isFetchingRestaurants ? (
                    <Skeleton className="h-[400px] w-full" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom du restaurant</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>QR manquants</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restaurants?.map(restaurant => (
                                <TableRow
                                    key={restaurant.id}
                                    className="cursor-pointer hover:bg-slate-100"
                                    onClick={() =>
                                        handleRowClick(restaurant.id)
                                    }>
                                    <TableCell>{restaurant.name}</TableCell>
                                    <TableCell className="capitalize">
                                        {restaurant.owner.user_plan}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {
                                            restaurant.owner
                                                .user_subscription_status
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {getQrCodeCountByPlan(
                                            restaurant.owner.user_plan,
                                        ) - restaurant.qr_code_count}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    )
}

export default SuperAdminDashboard
