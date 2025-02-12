'use client'

import { useState, useEffect } from 'react'

export default function TableOfContents({ sections }) {
    const [activeSection, setActiveSection] = useState('introduction')

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section')
            sections.forEach(section => {
                const rect = section.getBoundingClientRect()
                if (rect.top <= 100 && rect.bottom >= 100) {
                    setActiveSection(section.id)
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="flex flex-col gap-3">
            <h2 className="font-semibold text-slate-800 text-lg mb-2">Sommaire</h2>
            {sections.map((section, index) => (
                <button
                    key={index}
                    onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }}
                    className={`text-left text-sm transition-all duration-200 hover:text-violet-800 ${
                        activeSection === section.id
                            ? 'text-violet-800'
                            : 'text-slate-800'
                    }`}
                >
                    {section.title}
                </button>
            ))}
        </nav>
    )
}
