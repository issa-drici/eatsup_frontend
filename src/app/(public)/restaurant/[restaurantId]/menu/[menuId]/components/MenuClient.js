'use client'

import CategoryBar from '@/app/(public)/qr-code/[qrcodeId]/components/CategoryBar'
import MenuCategory from '@/app/(public)/qr-code/[qrcodeId]/components/MenuCategory'
import Banner from './Banner'
import EmptyMenu from './EmptyMenu'
import { useScrollManager } from '../services/useScrollManager'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/shadcn-components/ui/button'
import { cn } from '@/lib/utils'

const MenuClient = ({ menuItems, menu, activeLanguage }) => {
    const { activeSection, sectionRefs, scrollToSection } =
        useScrollManager(menuItems)
    const isMobile = useIsMobile()

    if (menuItems.length === 0) {
        return <EmptyMenu activeLanguage={activeLanguage} />
    }

    // Composant pour la sidebar desktop
    const DesktopSidebar = () => (
        <div className="hidden md:block w-80 fixed left-0 top-0 h-screen bg-sidebar overflow-y-auto ">
            <div className="p-4">
                {/* Banner dans la sidebar */}
                <div className="mb-6">
                    <Banner banners={menu.banners} />
                </div>

                {/* Category Bar dans la sidebar */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        {activeLanguage === 'fr' ? 'Catégories' : 'Categories'}
                    </h3>
                    <div className="flex flex-col gap-2">
                        {menuItems.map(({ category }) => (
                            <Button
                                key={category.id}
                                className="px-2 py-1 h-fit"
                                variant={
                                    activeSection === category.id
                                        ? 'default'
                                        : 'white'
                                }
                                onClick={() => scrollToSection(category.id)}>
                                {category.name?.[activeLanguage]}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Sidebar desktop */}
            <DesktopSidebar />

            {/* Contenu principal avec marge pour la sidebar sur desktop */}
            <div
                className={cn(
                    // 'md:rounded-t-xl md:shadow-[3px_0px_px_5px_rgba(0,_0,_0,_0.1)] md:mt-4 md:mr-2 md:ml-[21rem]',
                    !isMobile && 'md:ml-80',
                )}>
                {/* Banner mobile seulement */}
                {isMobile && <Banner banners={menu.banners} />}

                {/* Category Bar mobile seulement */}
                {isMobile && (
                    <CategoryBar
                        menuItems={menuItems}
                        activeSection={activeSection}
                        scrollToSection={scrollToSection}
                        activeLanguage={activeLanguage}
                        menuHasBanners={menu?.banners?.length > 0}
                    />
                )}

                {/* Contenu du menu */}
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
            </div>
        </>
    )
}

export default MenuClient
