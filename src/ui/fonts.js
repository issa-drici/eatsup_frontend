import { Outfit } from 'next/font/google'
import { Nunito } from 'next/font/google'

export const outfitFont = Outfit({
    subsets: ['latin'],
})

export const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})
