import LoginLinks from '@/app/LoginLinks'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Check, X } from 'lucide-react'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shadcn-components/ui/accordion'

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
                <ApplicationLogo className="h-4 md:h-5 w-auto fill-current text-gray-500" />
                <LoginLinks />
            </div>
            <div className="p-4 w-full">
                <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] md:gap-14 md:px-28 md:py-16 md:max-w-screen-2xl md:mx-auto">
                    <div className="flex flex-col items-center">
                        <h1
                            className={`${outfitFont.className} text-white text-5xl font-extrabold text-center md:text-7xl md:text-left md:tracking-tight`}>
                            Boostez vos ventes en un seul scan
                        </h1>
                        <p className="text-slate-300 text-center mt-2 md:text-xl md:text-left">
                            Augmentez vos ventes avec un menu disponible en
                            continu, même en dehors du restaurant !
                        </p>
                        <div className="mt-8 flex flex-col justify-center items-center gap-4 w-full md:flex-row md:items-start md:max-w-2xl">
                            <Link
                                href="#pricing"
                                className="bg-white hover:scale-95 transition-all border border-slate-200 text-slate-900 px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                Voir un vrai menu
                            </Link>
                            <div className="w-full flex flex-col gap-1">
                                <Link
                                    href="/register"
                                    className="bg-violet-600 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium">
                                    Commencer gratuitement ✨
                                </Link>
                                <p className="text-slate-400 text-center text-sm">
                                    Sans engagement, sans carte bancaire
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-row items-center justify-between gap-8">
                        <div className="flex flex-col items-center gap-5">
                            <Image
                                src="/images/10k-restaurateurs.png"
                                alt="10k-restaurateurs"
                                className="w-64 h-auto"
                                width={260}
                                height={70}
                            />
                            <Image
                                src="/images/recevez-autocollants.png"
                                alt="recevez-autocollants"
                                className="w-64 h-auto"
                                width={260}
                                height={335}
                            />
                        </div>
                        <Image
                            src="/images/serveuse.png"
                            alt="serveuse"
                            className="w-[37rem] h-auto"
                            width={600}
                            height={470}
                        />
                        <div className="flex flex-col items-center gap-10">
                            <div className="flex flex-col gap-2">
                                <p className="text-slate-300">
                                    ✔ Modifications illimitées et simple
                                </p>
                                <p className="text-slate-300">
                                    ✔ Autocollants offerts
                                </p>
                                <p className="text-slate-300">
                                    ✔ Site web offert
                                </p>
                            </div>
                            <Image
                                src="/images/augmentez-revenus.png"
                                alt="augmentez-revenus"
                                className="w-64 h-auto"
                                width={260}
                                height={335}
                            />
                        </div>
                    </div>

                    <div className="md:hidden flex flex-col items-center gap-5 w-full mt-8">
                        <div className="flex flex-col items-center gap-2 w-full">
                            <p className="text-slate-300">
                                ✔ Autocollants offerts
                            </p>
                            <p className="text-slate-300">
                                ✔ Modifications illimitées et simple
                            </p>
                            <p className="text-slate-300">✔ Site web offert</p>
                        </div>
                        <Image
                            src="/images/10k-restaurateurs.png"
                            alt="10k-restaurateurs"
                            width={230}
                            height={56}
                        />

                        <Image
                            src="/images/serveuse.png"
                            alt="serveuse"
                            className="w-full h-auto"
                            width={600}
                            height={470}
                        />
                        <div className="flex flex-row items-center gap-5 w-full">
                            <Image
                                src="/images/recevez-autocollants.png"
                                alt="recevez-autocollants"
                                className="w-full h-auto"
                                width={260}
                                height={335}
                            />
                            <Image
                                src="/images/augmentez-revenus.png"
                                alt="augmentez-revenus"
                                className="w-full h-auto"
                                width={260}
                                height={335}
                            />
                        </div>
                    </div>

                    {/* <div className="flex flex-col w-full items-center md:max-w-xs">
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
                    </div> */}
                </div>
            </div>
            <div className="bg-violet-500 w-[calc(100%+30px)] p-4 flex flex-col items-center -rotate-2 mt-4 translate-y-4">
                <p className="text-white text-center font-extrabold">
                    88 % des restaurants ont envisagé de passer aux menus
                    numériques
                </p>
            </div>
            <div className="flex flex-col p-4 py-20 gap-16 bg-slate-100 w-full md:p-20 md:gap-36">
                <div className="flex flex-col gap-4 md:flex-row md:gap-32 md:items-center md:max-w-screen-xl md:mx-auto">
                    <Image
                        src="/images/augmentez.png"
                        alt="augmentez"
                        className="w-full h-auto mt-3 rounded-[28px] md:w-2/5"
                        width={460}
                        height={507}
                    />

                    <div className="flex flex-col gap-4 md:w-3/5">
                        <h2
                            className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl md:text-left`}>
                            Augmentez vos ventes
                        </h2>
                        <h5 className="text-slate-500 font-medium md:text-xl">
                            Un menu attractif qui{' '}
                            <span className="text-slate-900">
                                incite vos clients à consommer plus.
                            </span>
                        </h5>
                        <ul className="list-disc list-inside text-slate-500 md:text-xl md:space-y-3">
                            <li>
                                Des photos appétissantes qui incitent vos
                                clients à commander plus.
                            </li>
                            <li>
                                <span className="text-slate-900">
                                    Accessible en permanence
                                </span>{' '}
                                pour ajouter un dessert, une boisson ou un plat
                                à tout moment.
                            </li>
                        </ul>
                        <Link
                            href="/register"
                            className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium md:w-fit">
                            Commencer gratuitement
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-32 md:items-center md:max-w-screen-xl md:mx-auto">
                    <Image
                        src="/images/maximisez.png"
                        alt="maximisez"
                        className="w-full h-auto mt-3 rounded-[28px] md:w-2/5"
                        width={460}
                        height={507}
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
                                <span className="text-slate-900">
                                    Une fiche restaurant offerte
                                </span>{' '}
                                avec vos infos essentielles et un bouton direct
                                vers votre menu.
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
                            href="/register"
                            className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium md:w-fit">
                            Commencer gratuitement
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:gap-32 md:items-center md:max-w-screen-xl md:mx-auto">
                    <Image
                        src="/images/simple.png"
                        alt="simple"
                        className="w-full h-auto mt-3 rounded-[28px] md:w-2/5"
                        width={460}
                        height={507}
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
                                <span className="text-slate-900">
                                    Modifiez votre menu gratuitement
                                </span>{' '}
                                et à volonté, autant de fois que nécessaire.
                            </li>
                            <li>
                                Tout est prêt en quelques minutes,{' '}
                                <span className="text-slate-900">
                                    sans compétences techniques requises.
                                </span>
                            </li>
                        </ul>
                        <Link
                            href="/register"
                            className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium md:w-fit">
                            Commencer gratuitement
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full items-center p-4 py-10 bg-slate-900 gap-5 md:p-20">
                <div className="flex flex-col items-center w-full">
                    <h2
                        className={`${outfitFont.className} text-white text-3xl font-extrabold text-center md:text-7xl md:tracking-tight md:max-w-4xl`}>
                        "Le menu papier me suffit"
                    </h2>
                    <p className="text-white text-center font-medium mt-5 md:text-left md:text-xl">
                        Vous et vos clients sont déjà habitués à votre menu
                        classique. Cependant il y a tout ça de plus.
                    </p>
                </div>
                <div className="flex flex-col w-full md:max-w-screen-lg bg-white p-4 rounded-2xl">
                    <div className="grid grid-cols-4 md:grid-cols-3">
                        <div className="col-span-2 md:col-span-1" />
                        <div className="bg-violet-600 rounded-t-xl p-1.5 md:p-4">
                            <p className="text-white font-semibold text-center text-sm md:text-lg">
                                Menu Eatsup
                            </p>
                        </div>
                        <div className="p-1.5 md:p-4">
                            <p className="text-slate-900 font-semibold text-center text-sm md:text-lg">
                                Menu papier
                            </p>
                        </div>
                    </div>
                    {[
                        'Menu facile à lire',
                        'Composition et allergènes',
                        'Photos des plats',
                        'Contact avec le client',
                        'Disponible partout',
                        'Disponible 24h/24',
                        'Traduction en pusieurs langues',
                        // 'Affiche des offres temporaires',
                        'Partage en 3 clics',
                        "Récolte d'avis Google",
                        'Modification gratuite et instantanée',
                        'Menu propre et hygiénique',
                        'Statistiques de consultation',
                        'Partage sur les réseaux sociaux',
                        'Site Web offert',
                    ].map((avantage, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-4 md:grid-cols-3 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
                            <p className="text-slate-900 p-2 text-sm col-span-2 md:text-lg md:col-span-1">
                                {avantage}
                            </p>
                            <div
                                className={`flex justify-center items-center p-2 ${index % 2 === 0 ? 'bg-violet-800' : 'bg-violet-600'} ${index === 13 ? 'rounded-b-xl' : ''}`}>
                                <Check className="w-6 h-6 text-white" />
                            </div>
                            <div
                                className={`flex justify-center items-center p-2`}>
                                {index < 4 ? (
                                    <Check className="w-6 h-6 text-slate-900" />
                                ) : (
                                    <X className="w-6 h-6 text-slate-900" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-14 p-4 pt-16 md:pt-20 md:gap-20 md:max-w-screen-xl md:mx-auto">
                <h2
                    className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl`}>
                    Comment ça fonctionne ?
                </h2>
                <div className="flex flex-col items-center md:flex-row gap-10 md:gap-36">
                    <div className="flex flex-col items-center gap-3 max-w-72 md:max-w-64">
                        <Image
                            src="/images/eatsy/activate.png"
                            alt="eatsy-activate"
                            className="w-24 h-auto md:w-48"
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
                    <div className="flex flex-col items-center gap-3 max-w-72 md:max-w-64">
                        <Image
                            src="/images/eatsy/hello-violet.png"
                            alt="eatsy-hello"
                            className="w-24 h-auto md:w-48"
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
                    <div className="flex flex-col items-center gap-3 max-w-72 md:max-w-64">
                        <Image
                            src="/images/eatsy/money.png"
                            alt="eatsy-money"
                            className="w-24 h-auto md:w-48"
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
            <div id="pricing" className="p-4 pb-10 w-full mt-10 md:mt-14">
                <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                    <div className="flex flex-col items-center w-full">
                        <h2
                            className={`${outfitFont.className} text-white text-3xl font-extrabold text-center md:text-7xl md:tracking-tight md:max-w-4xl`}>
                            Augmentez vos revenus avec un menu digital
                        </h2>
                        <p className="text-white text-center font-medium mt-5 md:text-left md:text-xl">
                            Attirez plus de clients, simplifiez les commandes et
                            maximisez vos bénéfices
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-8 md:flex-row md:gap-10">
                        <div className="flex flex-col items-center md:col-span-5 md:col-start-2 w-full bg-slate-100 p-5 rounded-2xl">
                            <div className="flex flex-col items-center gap-1 mb-4 md:mb-8">
                                <p
                                    className={`${outfitFont.className} font-bold text-center text-2xl md:text-3xl md:tracking-tight`}>
                                    Basic
                                </p>
                                <p>Gratuit mais limité</p>
                                <p
                                    className={`${outfitFont.className} font-bold text-center text-2xl md:text-3xl md:tracking-tight`}>
                                    0€ par mois
                                </p>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        10 tables maximum
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        500 scans par mois
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        3 catégories maximum
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        15 articles maximum (boissons, entrées,
                                        plats, desserts...)
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        Menu sans image, ni logo
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        Publicités imposées sur votre menu
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4"
                                    />
                                    <p className="text-base sm:text-xl">
                                        Statistiques de scans du menu
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className="bg-slate-900 hover:scale-95 transition-all text-white px-4 py-2 rounded-[6px] w-full text-center font-medium mt-8 mb-2">
                                Commencer gratuitement
                            </Link>

                            <p className="text-xs sm:text-sm">
                                Sans engagement, sans carte bancaire
                            </p>
                        </div>

                        <div className="flex flex-col md:col-span-5 items-center bg-violet-500 p-5 rounded-2xl">
                            <div className="flex flex-col items-center gap-1 mb-4 md:mb-8">
                                <p
                                    className={`${outfitFont.className} text-white font-bold text-center text-2xl md:text-3xl md:tracking-tight`}>
                                    Premium
                                </p>
                                <p className="text-white">
                                    en moyenne le prix d'un menu
                                </p>
                                <p
                                    className={`${outfitFont.className} text-white font-bold text-center text-2xl md:text-3xl md:tracking-tight`}>
                                    <span className="text-red-300 font-semibold line-through text-base">
                                        14.99€
                                    </span>{' '}
                                    9,99€ par mois
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-start gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white mt-1.5"
                                    />
                                    <p className="text-white font-semibold text-base sm:text-xl">
                                        30 stickers table + 1 sticker
                                        <br /> comptoir OFFERTS ✨
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl   ">
                                        Nombre de tables illimité
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Scan illimité par mois
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Catégories illimitées
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white mt-1.("
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Articles illimités (boissons, entrées,
                                        <br />
                                        plats, desserts...)
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Menu avec images et votre logo
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Traduction en plusieurs langues
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white font-semibold text-base sm:text-xl">
                                        Site web OFFERT ✨
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white font-semibold text-base sm:text-xl">
                                        Menu 100% sans publicités ✨
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Offre en cours du restaurant sur le menu
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Statistiques de scans du menu
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Composition du menu et allergènes
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check
                                        strokeWidth={4}
                                        className="w-4 h-4 text-white"
                                    />
                                    <p className="text-white text-base sm:text-xl">
                                        Offre en cours du restaurant sur le menu
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/register"
                                className="hover:scale-95 transition-all bg-white px-4 py-2 rounded-[6px] w-full text-center font-medium mt-8 mb-2">
                                Commencer gratuitement
                            </Link>
                            <p className="text-white text-xs sm:text-sm">
                                Sans engagement, sans carte bancaire
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="faq"
                className="relative flex flex-col items-center w-full p-4 py-16 gap-16 bg-slate-100 md:p-20 md:gap-20">
                <div className="flex flex-col items-center w-full gap-10 md:gap-56 md:max-w-screen-xl md:mx-auto md:flex-row">
                    <div className="flex flex-col items-center gap-8 md:items-start md:gap-16">
                        <h2
                            className={`${outfitFont.className} text-slate-900 text-3xl font-bold text-center md:text-7xl md:text-left`}>
                            Foire aux questions
                        </h2>
                        <Image
                            src="/images/eatsy/asking.png"
                            alt="faq"
                            className="w-28 h-auto md:w-36"
                            width={313}
                            height={373}
                        />
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full max-w-screen-md">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Que faire si j’ai besoin d’aide ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Notre service client est disponible 7j/7 pour
                                vous éclairer.
                                <ul className="list-disc list-inside mt-2">
                                    <li>
                                        Par e-mail à{' '}
                                        <Link
                                            href="mailto:contact@eatsup.fr"
                                            className="underline">
                                            contact@eatsup.fr
                                        </Link>
                                        , vous obtiendrez une réponse dans les
                                        24h qui suivent votre demande.
                                    </li>
                                    <li>
                                        Via notre assistant interactif Eatsy (en
                                        bas à droite).
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Comment le menu augmente t'il mes ventes ?
                            </AccordionTrigger>
                            <AccordionContent>
                                En favorisant le menu en ligne, vous gagnez du
                                temps sur la prise de commande. Les clients
                                pourront prendre le temps de réfléchir et passer
                                commande plus rapidement :
                                <ul className="list-disc list-inside mt-2">
                                    <li>Réduction du temps d’attente</li>
                                    <li>Augmentation du panier moyen </li>
                                    <li>Valorisation de vos plats</li>
                                    <li>Accessibilité permanente</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Comment conserver la relation avec mes clients ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Chez Eatsup nous savons que la relation client
                                reste essentielle dans la restauration. C’est
                                pourquoi notre menu digital ne rompt pas le lien
                                avec le client.
                                <br />
                                <br />
                                Nos QR Codes en vitrine, comptoir et tables
                                permettent aux clients de consulter le menu
                                tranquillement, tout en gardant la possibilité
                                d’échanger avec vous durant la prise de commande
                                ou à un autre moment.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                Puis-je personnaliser l'apparence du menu ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Oui ! Eatsup vous permet de personnaliser votre
                                menu pour qu’il corresponde à l’image de votre
                                restaurant :
                                <ul className="list-disc list-inside mt-2">
                                    <li>
                                        Ajout de photos pour mettre en valeur
                                        vos plats
                                    </li>
                                    <li>
                                        Modification des titres et descriptions
                                        de votre menu{' '}
                                    </li>
                                    <li>
                                        (Bientôt disponible) Choix des couleurs
                                        pour adapter le design à votre identité
                                        visuelle
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>
                                Est-ce que le menu digital s’adapte sur tous
                                types d'écrans ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Eatsup est conçu pour s’adapter à tous les
                                supports, sur ordinateur, tablette, téléphone
                                (android et iOS)…
                                <br />
                                Peu importe l’appareil utilisé, votre menu
                                restera lisible, fluide et ergonomique.
                                <br />
                                Il suffit d’un QR code ou d’un lien internet
                                pour y accéder instantanément.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>
                                Ai-je la possibilité de mettre à jour mon menu ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Oui ! Vous avez la liberté de modifier votre
                                menu en temps réel, sans aucun coût
                                supplémentaire :
                                <ul className="list-disc list-inside my-2">
                                    <li>
                                        Ajoutez, modifiez ou supprimez des
                                        articles ou des catégories en un clic
                                    </li>
                                    <li>
                                        Mettez à jour vos prix sans devoir
                                        réimprimer quoi que ce soit
                                    </li>
                                    <li>
                                        Ajoutez des offres spéciales ou des
                                        menus du jour instantanément
                                    </li>
                                </ul>
                                Toutes les modifications sont immédiates et
                                illimitées, vous permettant de toujours proposer
                                un menu à jour à vos clients.
                            </AccordionContent>
                        </AccordionItem>

                        {/* <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Comment fonctionne le menu digital ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Les clients scannent le QR code sur leur table
                                avec leur smartphone. Le menu s'affiche
                                instantanément, sans téléchargement
                                d'application nécessaire.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Puis-je modifier mon menu facilement ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Oui, vous pouvez modifier votre menu à tout
                                moment depuis votre espace personnel. Les
                                modifications sont instantanées et illimitées.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Que se passe-t-il si un client n'a pas de
                                smartphone ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Nous vous recommandons de garder quelques menus
                                papier en réserve pour ces situations
                                exceptionnelles.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                Le menu fonctionne-t-il sans connexion internet
                                ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Une connexion internet est nécessaire pour le
                                premier chargement. Ensuite, le menu reste
                                accessible même sans connexion.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger>
                                Comment sont gérées les traductions ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Le menu est automatiquement traduit dans
                                plusieurs langues grâce à notre système de
                                traduction intégré.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6">
                            <AccordionTrigger>
                                Combien de temps pour mettre en place le menu ?
                            </AccordionTrigger>
                            <AccordionContent>
                                La mise en place prend environ 30 minutes. Vous
                                recevrez vos QR codes par email sous 24h.
                            </AccordionContent>
                        </AccordionItem> */}
                    </Accordion>
                </div>
                <div className="w-full flex flex-col items-center bg-violet-500 p-8 rounded-[28px] md:gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                    <div className="flex flex-col items-center w-full">
                        <h1
                            className={`${outfitFont.className} text-white text-3xl font-extrabold text-center md:text-7xl md:tracking-tight md:max-w-4xl`}>
                            La dernière étape pour faire exploser votre CA
                        </h1>
                        <p className="text-white text-center font-medium mt-5 md:text-left md:text-xl">
                            Configurez dès maintenant votre menu digital ainsi
                            que votre site internet OFFERT pour doubler votre
                            visibilité ✨
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
            </div>
            <Footer />
        </div>
    )
}

export default Home
