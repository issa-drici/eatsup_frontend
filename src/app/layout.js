import { Nunito } from 'next/font/google'
import '@/app/global.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import Script from 'next/script'

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
                    src="https://analytics.eatsup.fr/js/script.hash.outbound-links.pageview-props.tagged-events.js"
                />
            </head>
            <body className="antialiased">
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Eatsup - votre menu qui propulse vos ventes',
}

export default RootLayout
