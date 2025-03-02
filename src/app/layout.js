import '@/app/global.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import CookieConsent from '@/components/CookieConsent'
import Script from 'next/script'
import { nunitoFont } from '@/ui/fonts'

const RootLayout = ({ children }) => {
    return (
        <html lang="fr" className={`${nunitoFont.className} scroll-smooth`}>
            <head>
                {process.env.NODE_ENV === 'production' && (
                    <>
                        <Script
                            defer
                            data-domain="eatsup.fr"
                            src="https://plausible.alliance-tech.fr/js/script.hash.outbound-links.js"
                        />
                        {/* <Script
                            src="//code.tidio.co/njwdbxwjdorcgnntlysxylf7wmkcvl47.js"
                            async
                        /> */}
                        <Script id="hotjar">
                            {`(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5306072,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
                        </Script>
                    </>
                )}
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
    title: 'Eatsup - le menu qui propulse vos ventes',
}

export default RootLayout
