'use client'

import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import { useFindFirstMenuByRestaurantId } from '@/services/menu/useFindFirstMenuByRestaurantId'
import MenuClient from './MenuClient'
import LoadingSkeleton from '@/app/(public)/qr-code/[qrcodeId]/components/LoadingSkeleton'
import TitleBar from '@/app/(public)/qr-code/[qrcodeId]/components/TitleBar'
import { useLanguage } from '../context/LanguageContext'

const MenuDataFetcher = ({ restaurantId, menuId }) => {
    const { activeLanguage } = useLanguage()

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(menuId, {
        enabled: !!menuId,
        suspense: true
    })

    const {
        data: menu,
        isLoading: isLoadingMenu,
        isFetching: isFetchingMenu,
    } = useFindFirstMenuByRestaurantId(restaurantId, {
        enabled: !!restaurantId,
        suspense: true
    })

    if (isLoadingMenuItems || isFetchingMenuItems || isLoadingMenu || isFetchingMenu) {
        return <LoadingSkeleton />
    }

    return (
        <>
            <TitleBar
                restaurant={menu.restaurant}
                activeLanguage={activeLanguage}
            />
            <MenuClient
                menuItems={menuItems}
                menu={menu}
                activeLanguage={activeLanguage}
            />
        </>
    )
}

export default MenuDataFetcher
