'use client'

import Link from 'next/link'
import Image from 'next/image'
import { translations } from '../config/translations'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
    const { activeLanguage } = useLanguage()

    return (
        <div className="w-full bg-slate-900 py-1 gap-1 flex items-center justify-center absolute bottom-0">
            <p className="text-white text-xs">
                {translations.poweredBy[activeLanguage] || translations.poweredBy.fr}
            </p>
            <Link href={`/`} legacyBehavior>
                <a className="text-white bg-white rounded-xl px-1 no-underline hover:text-white hover:no-underline">
                    <Image
                        src="/images/logo.png"
                        className="h-6 object-contain"
                        width={100}
                        height={100}
                    />
                </a>
            </Link>
        </div>
    )
}

export default Footer
