import { Nunito } from 'next/font/google'
import '@/app/global.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="fr" className={nunitoFont.className}>
            <body className="antialiased">
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Eatsup - votre menu qui propulse vos ventes',
}

export default RootLayout
