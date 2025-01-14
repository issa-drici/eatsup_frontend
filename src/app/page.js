import LoginLinks from '@/app/LoginLinks'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'Eatsup - votre menu qui propulse vos ventes',
}

const outfitFont = Outfit({
    subsets: ['latin'],
})

const Home = () => {
    return (
        <div className="flex flex-col items-center max-w-[100vw] overflow-hidden">
            <div className="flex justify-between items-center w-full p-4 md:max-w-screen-xl md:mx-auto">
                <ApplicationLogo className="h-3 md:h-5 w-auto fill-current text-gray-500" />
                <LoginLinks />
            </div>
            <div className="p-4 w-full">
                <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] md:flex-row md:gap-32 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                    <div className="flex flex-col items-center">
                        <h1
                            className={`${outfitFont.className} text-white text-5xl font-extrabold text-center md:text-7xl md:text-left md:tracking-tight md:max-w-2xl`}>
                            Boostez vos ventes en un seul scan
                        </h1>
                        <p className="text-slate-300 text-center mt-5 md:text-left">
                            Stimulez vos ventes avec un menu disponible en
                            continu, même en dehors du restaurant !
                        </p>
                        <div className="mt-4 flex flex-col justify-center items-center gap-4 w-full md:flex-row-reverse md:items-start">
                            <Link
                                href="#pricing"
                                className="bg-white hover:scale-95 transition-all border border-slate-200 text-slate-900 px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                Voir un vrai menu
                            </Link>
                            <div className="w-full flex flex-col gap-1">
                                <Link
                                    href="#pricing"
                                    className="bg-violet-600 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                    Essayer Gratuitement
                                </Link>
                                <p className="text-slate-400 text-center text-sm">
                                    Sans engagement, sans carte bancaire
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center md:max-w-xs">
                        <Image
                            src="/images/preview-header.png"
                            alt="preview-header"
                            className="w-full mt-10"
                            width={557}
                            height={631}
                        />
                        <Image
                            src="/images/eatsy/hello-violet.png"
                            alt="eatsy-hello"
                            className="w-28 mt-10"
                            width={557}
                            height={631}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-violet-500 w-[calc(100%+30px)] p-4 flex flex-col items-center -rotate-2 mt-4 translate-y-4">
                <p className="text-white text-center font-extrabold">
                    88 % des restaurants ont envisagé de passer aux menus
                    numériques
                </p>
            </div>
            <div className="flex flex-col p-4 pt-20 gap-16 bg-slate-100 w-full md:p-20 md:gap-36">
                <div className="flex flex-col gap-4 md:flex-row md:gap-32 md:items-center md:max-w-screen-xl md:mx-auto">
                    <Image
                        src="/images/augmentez.png"
                        alt="augmentez"
                        className="w-full h-auto mt-3 rounded-[28px] md:w-2/5"
                        width={2232}
                        height={2461}
                    />

                    <div className="flex flex-col gap-4 md:w-3/5">
                        <h2
                            className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl md:text-left`}>
                            Augmentez vos ventes
                        </h2>
                        <h5 className="text-slate-500 font-medium md:text-xl">
                            Un menu attractif qui incite vos clients à consommer
                            plus.
                        </h5>
                        <ul className="list-disc list-inside text-slate-500 md:text-xl md:space-y-3">
                            <li>
                                Des photos appétissantes qui incitent vos
                                clients à commander plus.
                            </li>
                            <li>
                                Accessible en permanence pour ajouter un
                                dessert, une boisson ou un plat à tout moment.
                            </li>
                        </ul>
                        <Link
                            href="#pricing"
                            className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium md:w-fit">
                            Essayer Gratuitement
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-32 md:items-center md:max-w-screen-xl md:mx-auto">
                    <Image
                        src="/images/maximisez.png"
                        alt="maximisez"
                        className="w-full h-auto mt-3 rounded-[28px] md:w-2/5"
                        width={2232}
                        height={2460}
                    />
                    <div className="flex flex-col gap-4 md:w-3/5">
                        <h2
                            className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl md:text-left`}>
                            Maximisez votre visibilité
                        </h2>
                        <h5 className="text-slate-500 font-medium md:text-xl">
                            Votre menu et votre restaurant visibles partout.
                        </h5>
                        <ul className="list-disc list-inside text-slate-500 md:text-xl md:space-y-3">
                            <li>
                                Une fiche restaurant offerte avec vos infos
                                essentielles et un bouton direct vers votre
                                menu.
                            </li>
                            <li>
                                Partagez-la facilement sur Instagram, Facebook
                                ou WhatsApp pour attirer plus de clients.
                            </li>
                            <li>
                                Affichez le QR code en vitrine pour convaincre
                                les passants hésitants à entrer.
                            </li>
                        </ul>
                        <Link
                            href="#pricing"
                            className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium md:w-fit">
                            Essayer Gratuitement
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:gap-32 md:items-center md:max-w-screen-xl md:mx-auto">
                    <Image
                        src="/images/simple.png"
                        alt="simple"
                        className="w-full h-auto mt-3 rounded-[28px] md:w-2/5"
                        width={2232}
                        height={2460}
                    />
                    <div className="flex flex-col gap-4 md:w-3/5">
                        <h2
                            className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl md:text-left`}>
                            Simple, rapide, fait pour vous
                        </h2>
                        <h5 className="text-slate-500 font-medium md:text-xl">
                            Une plateforme souple et sans limites.
                        </h5>
                        <ul className="list-disc list-inside text-slate-500 md:text-xl md:space-y-3">
                            <li>
                                Modifiez votre menu gratuitement et à volonté,
                                autant de fois que nécessaire.
                            </li>
                            <li>
                                Tout est prêt en quelques minutes, sans
                                compétences techniques requises.
                            </li>
                        </ul>
                        <Link
                            href="#pricing"
                            className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium md:w-fit">
                            Essayer Gratuitement
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 p-5 px-12 md:gap-16 md:max-w-screen-xl md:mx-auto">
                <h2
                    className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl`}>
                    Comment ça fonctionne ?
                </h2>
                <div className="flex flex-col items-center md:flex-row md:gap-10">
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="/images/eatsy/activate.png"
                            alt="eatsy-activate"
                            className="w-24 h-auto "
                            width={384}
                            height={373}
                        />
                        <h5
                            className={`${outfitFont.className} text-slate-900 text-2xl font-bold text-center md:text-3xl`}>
                            1- Saisissez votre menu
                        </h5>
                        <p className="text-slate-500 text-center">
                            Entrez votre menu sur le site et modifiez le quand
                            vous voulez
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="/images/eatsy/hello-violet.png"
                            alt="eatsy-hello"
                            className="w-24 h-auto "
                            width={384}
                            height={373}
                        />
                        <h5
                            className={`${outfitFont.className} text-slate-900 text-2xl font-bold text-center md:text-3xl`}>
                            2- Collez les QR codes
                        </h5>
                        <p className="text-slate-500 text-center">
                            Collez les QR codes sur vos tables une fois reçus
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="/images/eatsy/money.png"
                            alt="eatsy-money"
                            className="w-24 h-auto "
                            width={384}
                            height={373}
                        />
                        <h5
                            className={`${outfitFont.className} text-slate-900 text-2xl font-bold text-center md:text-3xl`}>
                            3- Contemplez les profits
                        </h5>
                        <p className="text-slate-500 text-center">
                            Voyez vos ventes augmenter en temps réel
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full md:mt-14">
                <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] md:gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                    <div className="flex flex-col items-center w-full">
                        <h1
                            className={`${outfitFont.className} text-white text-5xl font-extrabold text-center md:text-7xl md:tracking-tight md:max-w-4xl`}>
                            Augmentez vos revenus avec un menu digital
                        </h1>
                        <p className="text-slate-300 text-center mt-5 md:text-left">
                            Attirez plus de clients, simplifiez les commandes et
                            maximisez vos bénéfices
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
                        <div className="flex flex-col items-center bg-slate-100 p-5 rounded-2xl">
                            <p
                                className={`${outfitFont.className}  font-bold text-center md:text-2xl md:tracking-tight`}>
                                Basic
                            </p>
                            <p>en moyenne le prix d'un sandwich</p>
                            <p
                                className={`${outfitFont.className}  font-bold text-center mb-10 md:text-2xl md:tracking-tight`}>
                                7.99€ par mois
                            </p>
                            <Link
                                href="#pricing"
                                className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                Essayer Gratuitement
                            </Link>
                        </div>
                        <div className="flex flex-col items-center bg-slate-100 p-5 rounded-2xl">
                            <p
                                className={`${outfitFont.className}  font-bold text-center md:text-2xl md:tracking-tight`}>
                                Premium
                            </p>
                            <p>en moyenne le prix d'un menu + dessert</p>
                            <p
                                className={`${outfitFont.className}  font-bold text-center mb-10 md:text-2xl md:tracking-tight`}>
                                15.99€ par mois
                            </p>
                            <Link
                                href="#pricing"
                                className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                Essayer Gratuitement
                            </Link>
                        </div>
                        <div className="flex flex-col items-center bg-violet-500 p-5 rounded-2xl">
                            <p
                                className={`${outfitFont.className} text-white font-bold text-center md:text-2xl md:tracking-tight`}>
                                Expert
                            </p>
                            <p className="text-white">
                                en moyenne le prix de deux menus
                            </p>
                            <p
                                className={`${outfitFont.className} text-white font-bold text-center mb-10 md:text-2xl md:tracking-tight`}>
                                19.99€ par mois
                            </p>
                            <Link
                                href="#pricing"
                                className="hover:scale-95 transition-all bg-white px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                Essayer Gratuitement
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

{
    /* <div className="relative flex items-top justify-center min-h-screen bg-white sm:pt-0">
<div className="max-w-6xl mx-auto px-6 w-full lg:px-8">
    <div className="flex justify-between items-center pt-4 ">
        <ApplicationLogo className="h-3 w-auto fill-current text-gray-500" />
        <LoginLinks />
    </div>

    <div className="flex flex-col mt-10">
        <div className="text-5xl font-bold">
            Augmentez vos ventes
        </div>
        <div className="text-lg">
            Gagnez du temps en salle, offrez un accès continu au
            menu pour stimuler les ventes, et partagez l'excellence
            de votre établissement.
        </div>
        <Image
            src="/images/eatsy/hello.png"
            alt="eatsy-hello"
            className="w-60 h-60 mx-auto mt-10"
            width={351}
            height={325}
        />
        <AnimatedBeamFicheRestaurant />
        <div className="p-10 text-center">
            Footer avec les liens vers les pages de contact et les
            mentions légales
        </div>
    </div>
</div>
</div> */
}
