'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeFavicon() {
    const { theme, systemTheme } = useTheme()

    useEffect(() => {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
        const currentTheme = theme === 'system' ? systemTheme : theme

        if (link) {
            if (currentTheme === 'dark') {
                link.href = 'https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos_ael8fg.png'
            } else {
                link.href = 'https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos-black_osqvyo.png'
            }
        }
    }, [theme, systemTheme])

    return null
}