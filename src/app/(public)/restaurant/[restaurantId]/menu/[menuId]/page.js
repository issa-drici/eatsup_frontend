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

// const labels = {
//     share: {
//         fr: 'Partager',
//         en: 'Share',
//         es: 'Compartir',
//         ar: 'مشاركة',
//         de: 'Teilen',
//         it: 'Condividi',
//         pt: 'Compartilhar',
//         ru: 'Поделиться',
//     },
//     discount: {
//         fr: 'Je profite de -5% de réduction',
//         en: "I'm enjoying a -5% discount",
//         es: 'Estoy disfrutando de un descuento del -5%',
//         ar: 'أستمتع بخصم قدره -5%',
//         de: 'Ich genieße einen Rabatt von -5%',
//         it: 'Sto approfittando di uno sconto del -5%',
//         pt: 'Estou aproveitando um desconto de -5%',
//         ru: 'Я пользуюсь скидкой -5%',
//     },
//     googleReview: {
//         fr: 'Laisser un avis Google au restaurant',
//         en: 'Leave a Google review for the restaurant',
//         es: 'Dejar una reseña en Google para el restaurante',
//         ar: 'اترك تقييمًا على Google للمطعم',
//         de: 'Eine Google-Bewertung für das Restaurant hinterlassen',
//         it: 'Lascia una recensione su Google per il ristorante',
//         pt: 'Deixe uma avaliação no Google para o restaurante',
//         ru: 'Оставьте отзыв о ресторане на Google',
//     },
// }

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
    console.log(menu)
    const [activeSection, setActiveSection] = useState('')
    // eslint-disable-next-line no-unused-vars
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
        <div className="relative bg-slate-100 min-h-[100dvh]">
            <div className="text-xs h-full pb-5">
                {isLoadingMenu || isFetchingMenu ? null : (
                    <TitleBar restaurant={menu?.restaurant} />
                )}

                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <LoadingSkeleton />
                ) : menuItems?.length > 0 ? (
                    <>
                        <CategoryBar
                            menuItems={menuItems}
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                            activeLanguage={activeLanguage}
                            menuHasBanners={menu?.banners?.length > 0}
                        />
                        <Carousel
                            opts={{
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 5000,
                                }),
                            ]}
                            className="w-full h-[30vh] mb-3">
                            <CarouselContent className="h-full">
                                {menu?.banners?.map((banner, index) => (
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
                        <div className="flex flex-col px-3">
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
                            Ce restaurant n'a pas encore configuré son menu.
                        </p>
                        <p className="text-center">
                            Vous êtes le propriétaire ?
                        </p>
                        <Button
                            className=""
                            onClick={() => router.push('/login')}>
                            Je remplis mon menu dès maintenant !
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full bg-slate-900 py-1 gap-1 flex items-center justify-center absolute bottom-0">
                <p className="text-white text-xs">Menu propulsé par</p>
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
