import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className="flex flex-col w-full items-center p-4 py-10 bg-slate-900 gap-5 md:p-20">
            <div className="flex flex-col w-full items-center gap-5 md:flex-row md:justify-between">
                <Image
                    src="/images/logo-white.png"
                    alt="Logo Eatsup"
                    className="w-36 h-auto"
                    width={593}
                    height={85}
                />
                <div className="flex flex-col w-full items-center gap-3 md:flex-row md:w-fit md:gap-10">
                    <Link
                        href="/blog"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        Blog
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        Menu démo
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        Tarifs
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        FAQ
                    </Link>
                    <Link
                        href="/legal/mentions-legales"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        Mentions légales
                    </Link>
                    <Link
                        href="/legal/politique-confidentialite"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        Politique de confidentialité
                    </Link>
                    <Link
                        href="/legal/cgv"
                        className="text-slate-300 hover:text-slate-50 hover:underline transition-all duration-150">
                        CGV
                    </Link>
                </div>
            </div>

            <div className="w-full h-px bg-slate-700 my-5" />
            <div className="flex items-center gap-4 md:ml-auto">
                <Link
                    href="#pricing"
                    className="hover:scale-90 transition-all duration-150">
                    <Image
                        src="/icons/tiktok.png"
                        alt="Logo Eatsup"
                        className="w-6 h-auto"
                        width={73}
                        height={73}
                    />
                </Link>
                <Link
                    href="#pricing"
                    className="hover:scale-90 transition-all duration-150">
                    <Image
                        src="/icons/facebook.png"
                        alt="Logo Eatsup"
                        className="w-6 h-auto"
                        width={74}
                        height={73}
                    />
                </Link>
                <Link
                    href="#pricing"
                    className="hover:scale-90 transition-all duration-150">
                    <Image
                        src="/icons/x.png"
                        alt="Logo Eatsup"
                        className="w-6 h-auto"
                        width={74}
                        height={73}
                    />
                </Link>
                <Link
                    href="#pricing"
                    className="hover:scale-90 transition-all duration-150">
                    <Image
                        src="/icons/linkedin.png"
                        alt="Logo Eatsup"
                        className="w-6 h-auto"
                        width={73}
                        height={73}
                    />
                </Link>
                <Link
                    href="#pricing"
                    className="hover:scale-90 transition-all duration-150">
                    <Image
                        src="/icons/instagram.png"
                        alt="Logo Eatsup"
                        className="w-6 h-auto"
                        width={73}
                        height={73}
                    />
                </Link>
            </div>
            <p className="text-slate-300 text-xs mt-3 md:mr-auto">
                © Eatsup - 2025 | Made with ❤️ in 🇫🇷
            </p>
        </div>
    )
}

export default Footer
