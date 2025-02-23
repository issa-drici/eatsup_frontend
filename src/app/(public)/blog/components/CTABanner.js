import { Outfit } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
const outfitFont = Outfit({
    subsets: ['latin'],
})

const CTABanner = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center bg-violet-500 p-8 rounded-[28px] md:gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                <div className="flex flex-col items-center w-full">
                    <h1
                        className={`${outfitFont.className} text-white text-3xl font-extrabold text-center md:text-7xl md:tracking-tight md:max-w-4xl`}>
                        La dernière étape pour faire exploser votre CA
                    </h1>
                    <p className="text-white text-center font-medium mt-5 md:text-left md:text-xl">
                        Configurez dès maintenant votre menu digital ainsi que
                        votre site internet OFFERT pour doubler votre visibilité
                        ✨
                    </p>
                    <Link
                        href="/register"
                        className="hover:scale-95 transition-all bg-white px-4 py-2 rounded-[6px] w-full text-center font-medium mt-6 mb-2 md:w-fit md:min-w-72">
                        Commencer gratuitement
                    </Link>
                    <p className="text-white text-xs sm:text-sm">
                        Sans engagement, sans carte bancaire
                    </p>
                </div>
            </div>
            <Image
                src="/images/eatsy/come-here.png"
                alt="menu-digital"
                className="absolute bottom-0 right-2 w-24 h-auto md:w-48 md:h-auto md:right-24"
                width={969}
                height={853}
            />
        </>
    )
}

export default CTABanner
