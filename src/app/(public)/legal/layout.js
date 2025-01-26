import ApplicationLogo from '@/components/ApplicationLogo'
import LoginLinks from '@/app/LoginLinks'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function LegalLayout({ children }) {
    return (
        <div className="flex flex-col items-center max-w-[100vw] overflow-hidden">
            <div className="flex justify-between items-center w-full p-4 md:max-w-screen-xl md:mx-auto">
                <Link href={'/'}>
                    <ApplicationLogo className="h-4 md:h-5 w-auto fill-current text-gray-500" />
                </Link>
                <LoginLinks />
            </div>

            <main className="p-4 pb-10 w-full">
                <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}
