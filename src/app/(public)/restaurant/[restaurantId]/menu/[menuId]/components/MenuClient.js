'use client'

import { useState } from 'react'
import CategoryBar from '@/app/(public)/qr-code/[qrcodeId]/components/CategoryBar'
import MenuCategory from '@/app/(public)/qr-code/[qrcodeId]/components/MenuCategory'
import Banner from './Banner'
import EmptyMenu from './EmptyMenu'
import { useScrollManager } from '../services/useScrollManager'
import { translations } from '../config/translations'

const MenuClient = ({ menuItems, menu, activeLanguage }) => {
    const { activeSection, sectionRefs, scrollToSection } = useScrollManager(menuItems)

    if (menuItems.length === 0) {
        return <EmptyMenu activeLanguage={activeLanguage} />
    }

    return (
        <>
            <Banner banners={menu.banners} />
            <CategoryBar
                menuItems={menuItems}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                activeLanguage={activeLanguage}
                menuHasBanners={menu?.banners?.length > 0}
            />
            <div className="flex flex-col px-3 pt-2">
                {menuItems.map((categoryData, index) => (
                    <MenuCategory
                        key={categoryData.category.id}
                        categoryData={categoryData}
                        activeLanguage={activeLanguage}
                        sectionRef={sectionRefs.current[index]}
                        restaurantId={menu.restaurantId}
                    />
                ))}
            </div>
        </>
    )
}

export default MenuClient
