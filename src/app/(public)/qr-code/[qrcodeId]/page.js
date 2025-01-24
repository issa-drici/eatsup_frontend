'use client'

import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import { useFindQrCodeById } from '@/services/qr-code/useFindQrCodeById'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, createRef } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import TitleBar from './components/TitleBar'
import CategoryBar from './components/CategoryBar'
import MenuCategory from './components/MenuCategory'
import LoadingSkeleton from './components/LoadingSkeleton'
import { useCreateQrCodeSession } from '@/services/qr-code-session/useCreateQrCodeSession'

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

    const { mutate: createQrCodeSession } = useCreateQrCodeSession({
        qrCodeId: qrcodeId,
    })

    const handleCreateSession = async () => {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json')
            const ipData = await ipResponse.json()

            await createQrCodeSession({
                ip_address: ipData.ip,
                user_agent: window.navigator.userAgent,
                location: '',
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Erreur lors de la création de la session:', error)
        }
    }

    useEffect(() => {
        // Création initiale de la session
        handleCreateSession()

        // Gestionnaire d'événement pour le focus
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                handleCreateSession()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            )
        }
    }, [])

    return (
        <div className="relative bg-slate-100 min-h-[100dvh]">
            <div className="text-xs h-full pb-5">
                <TitleBar />

                {isLoadingMenuItems ||
                isFetchingMenuItems ||
                isLoadingQrcode ||
                isFetchingQrcode ? (
                    <LoadingSkeleton />
                ) : menuItems?.length > 0 ? (
                    <>
                        <CategoryBar
                            menuItems={menuItems}
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                            activeLanguage={activeLanguage}
                        />
                        <div className="flex flex-col px-3">
                            {menuItems.map((categoryData, index) => (
                                <MenuCategory
                                    key={categoryData.category.id}
                                    categoryData={categoryData}
                                    activeLanguage={activeLanguage}
                                    sectionRef={sectionRefs.current[index]}
                                    restaurantId={qrcode?.restaurant_id}
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
