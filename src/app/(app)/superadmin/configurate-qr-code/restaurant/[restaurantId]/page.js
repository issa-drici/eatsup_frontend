'use client'

import { Button } from '@/shadcn-components/ui/button'
// import { AssociateQRDialog } from '@/components/AssociateQRDialog'
// import { useState } from 'react'
import { useParams } from 'next/navigation'
// import { useAssociateQrCode } from '@/services/qr-code/useAssociateQrCode'
import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useFindAllQrCodesByRestaurantId } from '@/services/qr-code/useFindAllQrCodesByRestaurantId'
// import { useQueryClient } from '@tanstack/react-query'

export default function ConfigQRPage() {
    const { restaurantId } = useParams()
    // const [openDialog, setOpenDialog] = useState(false)
    // const [selectedItem, setSelectedItem] = useState(null)
    // const queryClient = useQueryClient()

    const {
        data: restaurant,
        isLoading,
        isFetching,
    } = useFindRestaurantById(restaurantId)
    const { data: qrCodes, isLoading: isLoadingQrCodes } =
        useFindAllQrCodesByRestaurantId(restaurantId)

    const getTableCountByPlan = plan => {
        const tableCounts = {
            basic: 15,
            premium: 30,
            expert: 60,
        }
        return tableCounts[plan] || 15
    }

    const items = restaurant
        ? [
              { name: 'Comptoir', id: 'counter', qrType: 'counter' },
              { name: 'Vitrine', id: 'showcase', qrType: 'showcase' },
              ...Array.from(
                  { length: getTableCountByPlan(restaurant.owner.user_plan) },
                  (_, i) => ({
                      name: `Table ${i + 1}`,
                      id: `table-${i + 1}`,
                      qrType: 'table',
                  }),
              ),
          ]
        : []

    // const handleCallbackSuccess = () => {
    //     queryClient.invalidateQueries(['qr-codes', restaurantId])
    //     setOpenDialog(false)
    // }

    // const { mutate: associateQrCode } = useAssociateQrCode({
    //     handleCallbackSuccess,
    // })

    // const handleAssociateClick = item => {
    //     setSelectedItem(item)
    //     setOpenDialog(true)
    // }

    // const handleScanSuccess = async qrId => {
    //     associateQrCode({
    //         qrId,
    //         data: {
    //             restaurant_id: restaurantId,
    //             label: selectedItem.name,
    //             status: 'active',
    //             qr_type: selectedItem.qrType,
    //         },
    //     })
    // }

    const isItemAssigned = itemName => {
        return qrCodes?.some(qr => qr.label === itemName)
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
                        title: 'Configurateur QR Code',
                        href: '/superadmin/configurate-qr-code',
                    },
                    {
                        title: restaurant?.name || 'Chargement...',
                        href: `/superadmin/configurate-qr-code/restaurant/${restaurantId}`,
                    },
                ]}
            />

            {isLoading || isFetching ? (
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

            {!isLoading &&
                !isLoadingQrCodes &&
                items.map(item => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center p-4 border rounded-lg">
                        <span>{item.name}</span>
                        <Button
                            // onClick={() => handleAssociateClick(item)}
                            disabled={isItemAssigned(item.name)}>
                            {isItemAssigned(item.name)
                                ? 'Associé'
                                : 'Associer le QR'}
                        </Button>
                    </div>
                ))}

            {/* <AssociateQRDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                onScanSuccess={handleScanSuccess}
            /> */}
        </div>
    )
}
