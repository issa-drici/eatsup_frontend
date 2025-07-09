'use client'

import { useState, useEffect, useRef, createRef } from 'react'

export const useScrollManager = (menuItems) => {
    const [activeSection, setActiveSection] = useState('')
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

            // Calculer l'offset en vérifiant l'existence des éléments
            const titleBar = document.querySelector('#titleBar')
            const categoryBar = document.querySelector('#categoryBar')

            const titleBarHeight = titleBar ? titleBar.offsetHeight : 0
            const categoryBarHeight = categoryBar ? categoryBar.offsetHeight : 0

            window.scrollTo({
                top: offsetTop - (titleBarHeight + categoryBarHeight),
                behavior: 'smooth',
            })
            setActiveSection(sectionId)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            sectionRefs.current.forEach(ref => {
                if (ref.current) {
                    const position = ref.current.getBoundingClientRect()

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

    return {
        activeSection,
        sectionRefs,
        scrollToSection
    }
}
