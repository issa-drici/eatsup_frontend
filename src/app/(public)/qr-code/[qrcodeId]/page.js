'use client'

import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import { useFindQrCodeById } from '@/services/qr-code/useFindQrCodeById'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, createRef } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import Link from 'next/link'
import { Card } from '@/shadcn-components/ui/card'
import Image from 'next/image'
import { Skeleton } from '@/shadcn-components/ui/skeleton'

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
    const { qrcodeId } = useParams()
    const router = useRouter()

    const {
        data: qrcode,
        isLoading: isLoadingQrcode,
        isFetching: isFetchingQrcode,
    } = useFindQrCodeById(qrcodeId)

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(qrcode?.menu_id)

    const [activeSection, setActiveSection] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [activeLanguage, setActiveLanguage] = useState('fr')

    const sectionRefs = useRef(menuItems?.data?.map(() => createRef()) || [])

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

    return (
        <div className="relative bg-slate-100 min-h-[100dvh]">
            <div className="text-xs h-full pb-5">
                <div
                    className="flex justify-between items-center py-1 pl-3 pr-3 sticky top-0 z-50 bg-white"
                    id="titleBar">
                    <div className="flex items-center gap-x-0.5">
                        <p className="text-lg font-semibold">Mon restaurant</p>
                    </div>
                </div>

                {isLoadingMenuItems ||
                isFetchingMenuItems ||
                isLoadingQrcode ||
                isFetchingQrcode ? (
                    <div className="flex flex-col  gap-y-3">
                        <div className="flex py-3 px-3 gap-x-1 sticky top-9 z-40 bg-slate-100 shadow-md mb-3 overflow-x-scroll">
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-9 w-20" />
                        </div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="px-3">
                                <Skeleton className="h-6 w-32 mb-3" />
                                <Card className="overflow-hidden flex p-0">
                                    <Skeleton className="w-32 h-32" />
                                    <div className="flex flex-col p-4 gap-1 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : menuItems?.length > 0 ? (
                    <>
                        <div
                            className="flex px-3 py-3 gap-x-1 sticky top-9 z-40 bg-slate-100 shadow-md mb-3 overflow-x-scroll"
                            id="categoryBar">
                            {menuItems.map(({ category }) => (
                                <Button
                                    key={category.id}
                                    className="px-2 py-1 h-fit"
                                    variant={
                                        activeSection === category.id
                                            ? 'default'
                                            : 'white'
                                    }
                                    onClick={() =>
                                        scrollToSection(category.id)
                                    }>
                                    {category.name[activeLanguage]}
                                </Button>
                            ))}
                        </div>
                        <div className="flex flex-col px-3">
                            {menuItems.map((categoryData, index) => (
                                <div key={categoryData.category.id}>
                                    <div
                                        id={categoryData.category.id}
                                        ref={sectionRefs.current[index]}>
                                        <p className="text-lg font-bold mb-3">
                                            {
                                                categoryData.category.name[
                                                    activeLanguage
                                                ]
                                            }
                                        </p>
                                        <div className="flex flex-col gap-y-3">
                                            {categoryData.items?.map(item => (
                                                <Card
                                                    className="overflow-hidden flex p-0"
                                                    key={item.id}>
                                                    {item.images?.[0] && (
                                                        <Image
                                                            src={item.images[0]}
                                                            alt="imagePlat"
                                                            className="w-32 h-32 object-cover"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    )}
                                                    <div className="flex flex-col p-4 gap-1">
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-900">
                                                                {
                                                                    item.name[
                                                                        activeLanguage
                                                                    ]
                                                                }
                                                            </p>
                                                        </div>
                                                        {item.description?.[
                                                            activeLanguage
                                                        ] && (
                                                            <p className="text-sm text-[#64748B]">
                                                                {
                                                                    item
                                                                        .description[
                                                                        activeLanguage
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                        <p className="text-sm text-[#64748B]">
                                                            {item.price} €
                                                        </p>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                        <div className="w-full h-px bg-slate-200 my-5" />
                                    </div>
                                </div>
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
