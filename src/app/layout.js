import { Nunito } from 'next/font/google'
import '@/app/global.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import CookieConsent from '@/components/CookieConsent'
import Script from 'next/script'
// import Script from 'next/script'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="fr" className={nunitoFont.className}>
            <head>
                <Script
                    defer
                    data-domain="eatsup.fr"
                    src="https://plausible.alliance-tech.fr/js/script.hash.outbound-links.js"
                />
            </head>
            <body className="antialiased">
                <ReactQueryProvider>
                    {children}
                    <CookieConsent />
                </ReactQueryProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Eatsup - votre menu qui propulse vos ventes',
}

export default RootLayout
