import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Suspense } from 'react'
import LoginLinks from '../LoginLinks'
import { CheckIcon } from 'lucide-react'
import { outfitFont } from '@/ui/fonts'

export const metadata = {
    title: 'Eatsup - votre menu qui propulse vos ventes',
}

const Layout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col items-center max-w-[100vw] md:max-w-screen-xl md:mx-auto">
            <div className="flex justify-between items-center w-full p-4">
                <Link href={'/'}>
                    <ApplicationLogo className="h-4 md:h-5 w-auto fill-current text-gray-500" />
                </Link>
                <LoginLinks />
            </div>

            <div className="flex flex-row items-center flex-1 p-4 gap-4 w-full overflow-hidden">
                <div className="hidden md:flex flex-1 relative bg-slate-900 text-white pt-14 px-16 rounded-[28px] h-full min-h-0 max-h-[750px] bg-[url('/images/restaurant-auth-page.jpg')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 via-70% to-slate-900/70 rounded-[28px]" />
                    <div className="relative z-10">
                        <div className="flex flex-row gap-4">
                            <a
                                href="mailto:contact@eatsup.fr"
                                className="hover:underline">
                                contact@eatsup.fr
                            </a>
                            <a
                                href="tel:+33600000000"
                                className="hover:underline">
                                +33 6 00 00 00 00
                            </a>
                        </div>
                        <div className="mt-20 mb-8">
                            <p
                                className={`${outfitFont.className} text-5xl font-bold mb-2`}>
                                Vos clients n'iront plus chez vos concurrents
                            </p>
                            <p className="text-xl font-extralight">
                                Donnez leur accès à votre carte en continu, ou
                                quils soient afin qu'ils soient plus proche de
                                vous. Soyez + visible et augmentez vos ventes.
                            </p>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex flex-row items-center gap-2">
                                <CheckIcon className="w-4 h-4" />
                                Disponible 24h/24, 7j/7
                            </li>
                            <li className="flex flex-row items-center gap-2">
                                <CheckIcon className="w-4 h-4" />
                                Sans engagement
                            </li>
                            <li className="flex flex-row items-center gap-2">
                                <CheckIcon className="w-4 h-4" />
                                Sans commission
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 text-gray-900 antialiased">
                    <AuthCard>
                        <Suspense fallback={<div>Chargement...</div>}>
                            {children}
                        </Suspense>
                    </AuthCard>
                </div>
            </div>
        </div>
    )
}

export default Layout
