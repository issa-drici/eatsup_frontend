'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Check } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import Image from 'next/image'

const languages = [
    { code: 'fr', name: 'Français', flag: '/images/flags/fr.svg' },
    { code: 'en', name: 'English', flag: '/images/flags/gb.svg' },
    { code: 'es', name: 'Español', flag: '/images/flags/es.svg' },
    { code: 'de', name: 'Deutsch', flag: '/images/flags/de.svg' },
    { code: 'it', name: 'Italiano', flag: '/images/flags/it.svg' },
    { code: 'nl', name: 'Nederlands', flag: '/images/flags/nl.svg' },
    { code: 'pt', name: 'Português', flag: '/images/flags/pt.svg' },
    { code: 'ar', name: 'العربية', flag: '/images/flags/sa.svg' },
]

const LanguageSelector = ({ activeLanguage, setActiveLanguage }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(
        languages.find(lang => lang.code === activeLanguage) || languages[0],
    )

    useEffect(() => {
        setActiveLanguage(selectedLanguage.code)
    }, [selectedLanguage, setActiveLanguage])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 px-3 h-8">
                    <Image
                        src={selectedLanguage.flag}
                        alt={selectedLanguage.name}
                        width={20}
                        height={15}
                        className="rounded-sm"
                    />
                    <span className="text-xs font-medium uppercase">
                        {selectedLanguage.code}
                    </span>
                    {/* <ChevronDown className="h-4 w-4 opacity-50" /> */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
                {languages.map(language => (
                    <DropdownMenuItem
                        key={language.code}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setSelectedLanguage(language)}>
                        <Image
                            src={language.flag}
                            alt={language.name}
                            width={20}
                            height={15}
                            className="rounded-sm"
                        />
                        <span className="flex-1">{language.name}</span>
                        {language.code === selectedLanguage.code && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSelector
