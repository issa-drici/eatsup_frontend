'use client'

import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, createRef } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import TitleBar from '@/app/(public)/qr-code/[qrcodeId]/components/TitleBar'
import CategoryBar from '@/app/(public)/qr-code/[qrcodeId]/components/CategoryBar'
import MenuCategory from '@/app/(public)/qr-code/[qrcodeId]/components/MenuCategory'
import LoadingSkeleton from '@/app/(public)/qr-code/[qrcodeId]/components/LoadingSkeleton'
// import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import { useFindFirstMenuByRestaurantId } from '@/services/menu/useFindFirstMenuByRestaurantId'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/shadcn-components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const translations = {
    emptyMenu: {
        fr: "Ce restaurant n'a pas encore configuré son menu.",
        en: "This restaurant hasn't set up its menu yet.",
        es: "Este restaurante aún no ha configurado su menú.",
        de: "Dieses Restaurant hat sein Menü noch nicht konfiguriert.",
        it: "Questo ristorante non ha ancora configurato il suo menu.",
        nl: "Dit restaurant heeft zijn menu nog niet ingesteld.",
        pt: "Este restaurante ainda não configurou seu menu.",
        ar: "لم يقم هذا المطعم بإعداد قائمته بعد."
    },
    ownerQuestion: {
        fr: "Vous êtes le propriétaire ?",
        en: "Are you the owner?",
        es: "¿Eres el propietario?",
        de: "Sind Sie der Besitzer?",
        it: "Sei il proprietario?",
        nl: "Bent u de eigenaar?",
        pt: "Você é o proprietário?",
        ar: "هل أنت المالك؟"
    },
    fillMenu: {
        fr: "Je remplis mon menu dès maintenant !",
        en: "I'll fill my menu right now!",
        es: "¡Rellenaré mi menú ahora mismo!",
        de: "Ich fülle mein Menü jetzt aus!",
        it: "Compilo il mio menu adesso!",
        nl: "Ik vul mijn menu nu in!",
        pt: "Vou preencher meu menu agora!",
        ar: "سأملأ قائمتي الآن!"
    },
    poweredBy: {
        fr: "Menu propulsé par",
        en: "Menu powered by",
        es: "Menú impulsado por",
        de: "Menü bereitgestellt von",
        it: "Menu alimentato da",
        nl: "Menu aangedreven door",
        pt: "Menu desenvolvido por",
        ar: "قائمة مدعومة من"
    }
}

const Menu = () => {
    const { restaurantId, menuId } = useParams()
    const router = useRouter()

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(menuId)

    const {
        data: menu,
        isLoading: isLoadingMenu,
        isFetching: isFetchingMenu,
    } = useFindFirstMenuByRestaurantId(restaurantId)

    const [activeSection, setActiveSection] = useState('')
    const [activeLanguage, setActiveLanguage] = useState('fr')

    const sectionRefs = useRef([])

    useEffect(() => {
        if (menuItems?.length > 0) {
            sectionRefs.current = menuItems.map(() => createRef())
        }
    }, [menuItems])

    const scrollToSection = sectionId => {
        const section = document.getElementById(sectionId)

        if (section) {
            const offsetTop =
                section.getBoundingClientRect().top + window.pageYOffset

            window.scrollTo({
                top:
                    offsetTop -
                    (document.querySelector('#titleBar').offsetHeight +
                        document.querySelector('#categoryBar').offsetHeight),
                behavior: 'smooth',
            })
            setActiveSection(sectionId)
        }
    }

    useEffect(() => {
        const firstBar = document.querySelector('#titleBar') // Remplacer par le sélecteur de votre première barre
        const secondBar = document.querySelector('#categoryBar') // Remplacer par le sélecteur de votre deuxième barre

        if (firstBar && secondBar) {
            const height = firstBar.offsetHeight
            secondBar.style.top = `${height}px`
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            // Parcourir chaque section et vérifier si elle est visible
            sectionRefs.current.forEach(ref => {
                if (ref.current) {
                    const position = ref.current.getBoundingClientRect()

                    // Vérifiez si la section est visible et ajustez l'état actif si nécessaire
                    if (
                        position &&
                        position.top >= 0 &&
                        position.top <= window.innerHeight / 2
                    ) {
                        setActiveSection(ref.current.id)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (menuItems?.length > 0 && !activeSection) {
            const firstCategoryId = menuItems[0].category.id
            setActiveSection(firstCategoryId)
        }
    }, [menuItems, activeSection])

    return (
        <div className="relative bg-slate-100 min-h-[100dvh] md:bg-white md:max-w-lg md:mx-auto">
            <div className="text-xs h-full pb-5">
                {isLoadingMenu || isFetchingMenu ? null : (
                    <>
                        <TitleBar
                            restaurant={menu?.restaurant}
                            activeLanguage={activeLanguage}
                            setActiveLanguage={setActiveLanguage}
                        />
                    </>
                )}

                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <LoadingSkeleton />
                ) : menuItems?.length > 0 ? (
                    <>
                        {menu?.banners && menu.banners.length > 0 ? (
                            menu.banners.length > 1 ? (
                                <Carousel
                                    opts={{
                                        loop: true,
                                    }}
                                    plugins={[
                                        Autoplay({
                                            delay: 5000,
                                        }),
                                    ]}
                                    className="w-full h-[30vh] md:rounded-lg md:overflow-hidden">
                                    <CarouselContent className="h-full">
                                        {menu.banners.map((banner, index) => (
                                            <CarouselItem
                                                className="w-full h-[30vh] relative"
                                                key={index}>
                                                <Image
                                                    key={banner.id}
                                                    src={banner.url}
                                                    alt={`Banner ${index + 1}`}
                                                    className="object-cover"
                                                    priority
                                                    fill
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            ) : (
                                <div className="w-full h-[30vh] relative md:rounded-lg md:overflow-hidden">
                                    <Image
                                        key={menu.banners[0].id}
                                        src={menu.banners[0].url}
                                        alt={`Banner ${1}`}
                                        className="object-cover"
                                        priority
                                        fill
                                    />
                                </div>
                            )
                        ) : null}
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
                                    restaurantId={restaurantId}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col h-[calc(100vh_-_88px)] justify-center items-center text-base p-14 gap-3">
                        <p className="text-center">
                            {translations.emptyMenu[activeLanguage] || translations.emptyMenu.fr}
                        </p>
                        <p className="text-center">
                            {translations.ownerQuestion[activeLanguage] || translations.ownerQuestion.fr}
                        </p>
                        <Button
                            className=""
                            onClick={() => router.push('/login')}>
                            {translations.fillMenu[activeLanguage] || translations.fillMenu.fr}
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full bg-slate-900 py-1 gap-1 flex items-center justify-center absolute bottom-0">
                <p className="text-white text-xs">
                    {translations.poweredBy[activeLanguage] || translations.poweredBy.fr}
                </p>
                <Link href={`/`} legacyBehavior>
                    <a className="text-white bg-white rounded-md px-1 no-underline hover:text-white hover:no-underline">
                        <Image
                            src="/images/logo.png"
                            className="h-6 object-contain"
                            width={100}
                            height={100}
                        />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Menu
