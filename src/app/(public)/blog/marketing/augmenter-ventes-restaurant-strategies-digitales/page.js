import Image from 'next/image'
import Link from 'next/link'
import TableOfContents from '@/app/(public)/blog/components/TableOfContents'
import { Badge } from '@/shadcn-components/ui/badge'
import CTABanner from '@/app/(public)/blog/components/CTABanner'

export default function ArticlePage() {
    return (
        <div className="w-full">
            {/* Bannière hero */}
            <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                <div className="flex flex-col md:flex-row gap-4 shadow-lg">
                    {/* Conteneur Image */}
                    <div className="relative w-full md:w-[400px] min-h-[250px] rounded-lg overflow-hidden">
                        <Image
                            src="/images/blog/digitaliser.png"
                            alt="Augmenter les ventes d’un restaurant"
                            className="object-cover"
                            fill
                        />
                    </div>

                    {/* Conteneur Texte */}
                    <div className="flex-1 flex flex-col gap-2 px-10 pt-10 pb-4">
                        <Badge variant="secondary" className="w-fit">
                            Restauration
                        </Badge>
                        <h1 className="text-white text-2xl font-extrabold text-center md:text-4xl md:text-left">
                            Comment augmenter les ventes de votre restaurant en
                            2025 ? Stratégies digitales et astuces marketing
                        </h1>

                        <div className="flex gap-6 mt-4">
                            <p className="text-slate-500 text-sm font-light">
                                06-01-2025
                            </p>
                            <p className="text-slate-500 text-sm font-light">
                                Temps de lecture : 5 minutes
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            <Link
                                href="#"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/tiktok.png"
                                    alt="TikTok"
                                    className="w-6 h-auto"
                                    width={73}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/facebook.png"
                                    alt="Facebook"
                                    className="w-6 h-auto"
                                    width={74}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/x.png"
                                    alt="X / Twitter"
                                    className="w-6 h-auto"
                                    width={74}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/linkedin.png"
                                    alt="LinkedIn"
                                    className="w-6 h-auto"
                                    width={73}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/instagram.png"
                                    alt="Instagram"
                                    className="w-6 h-auto"
                                    width={73}
                                    height={73}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col items-start w-full max-w-screen-xl mx-auto mt-10">
                <div className="flex w-full gap-10 relative">
                    {/* Sommaire flottant */}
                    <aside className="hidden lg:block w-64">
                        <div className="sticky top-6 bg-slate-50 p-4 rounded-2xl">
                            <TableOfContents
                                sections={[
                                    {
                                        id: 'introduction',
                                        title: 'Introduction',
                                    },
                                    {
                                        id: 'optimiser-menu',
                                        title: '1. Optimiser son menu',
                                    },
                                    {
                                        id: 'ameliorer-experience',
                                        title: '2. Améliorer l’expérience client',
                                    },
                                    {
                                        id: 'strategies-marketing',
                                        title: '3. Stratégies marketing',
                                    },
                                    {
                                        id: 'faq',
                                        title: '4. FAQ',
                                    },
                                    {
                                        id: 'conclusion',
                                        title: 'Conclusion',
                                    },
                                ]}
                            />
                        </div>
                    </aside>

                    {/* Contenu de l'article */}
                    <article className="flex-1 min-h-screen pb-20">
                        {/* Introduction */}
                        <section id="introduction" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                                Introduction
                            </h2>
                            <p className="mb-4">
                                Dans un secteur ultra-compétitif,{' '}
                                <strong>
                                    augmenter les ventes d’un restaurant
                                </strong>{' '}
                                ne repose plus uniquement sur la qualité des
                                plats. Aujourd’hui, les restaurateurs doivent
                                combiner{' '}
                                <strong>
                                    expérience client, digitalisation et
                                    stratégies marketing
                                </strong>{' '}
                                pour attirer plus de clients et booster leur
                                chiffre d’affaires.
                            </p>
                            <p className="mb-4">
                                Avec des solutions innovantes comme{' '}
                                <strong>Eatsup</strong>, il est désormais
                                possible d’optimiser son menu, d’accélérer la
                                prise de commande et de maximiser chaque
                                interaction avec les clients.
                            </p>
                            <p className="mb-4">
                                Mais{' '}
                                <strong>
                                    quelles sont les meilleures stratégies pour
                                    augmenter les ventes d’un restaurant
                                </strong>
                                ? Quels outils digitaux adopter pour{' '}
                                <strong>
                                    fidéliser la clientèle et maximiser le
                                    panier moyen
                                </strong>
                                ? Suivez le guide! 🚀
                            </p>
                            <hr className="my-8 border-slate-200" />
                        </section>

                        {/* 1. Optimiser son menu */}
                        <section id="optimiser-menu" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                1. Optimiser son menu pour booster les ventes
                            </h2>

                            {/* 1.1 Misez sur un menu digital attractif */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.1 Misez sur un menu digital attractif
                            </h3>
                            <p className="mb-4">
                                Un menu bien conçu peut{' '}
                                <strong>
                                    influencer directement les décisions d’achat
                                </strong>{' '}
                                des clients. L’
                                <strong>affichage digital</strong> joue un rôle
                                clé dans ce processus :
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Photos et descriptions engageantes
                                    </strong>{' '}
                                    : un plat illustré avec une belle image a
                                    30% plus de chances d’être commandé.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Mise en avant des plats phares
                                    </strong>{' '}
                                    : affichez vos best-sellers en haut du menu
                                    pour inciter à l’achat.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Suggestions et recommandations
                                    </strong>{' '}
                                    : proposez des accompagnements et des
                                    boissons en complément (technique du{' '}
                                    <em>cross-selling</em>).
                                </li>
                            </ul>
                            <p className="mb-4">
                                💡 Avec <strong>Eatsup</strong>, vous pouvez{' '}
                                <strong>
                                    personnaliser votre menu digital
                                </strong>
                                en ajoutant des visuels attractifs et en mettant
                                en avant les plats les plus rentables.
                            </p>

                            {/* 1.2 Réduisez les erreurs de commande */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.2 Réduisez les erreurs de commande avec la
                                digitalisation
                            </h3>
                            <p className="mb-4">
                                Une{' '}
                                <strong>commande mal prise ou erronée</strong>
                                peut frustrer un client et faire perdre de
                                l’argent. La solution ?{' '}
                                <strong>
                                    Automatiser la prise de commande !
                                </strong>
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    📱 <strong>Menu digital QR Code</strong> :
                                    les clients peuvent parcourir la carte et
                                    commander en ligne sans pression.
                                </li>
                                <li>
                                    🖥{' '}
                                    <strong>
                                        Systèmes de commande sur tablette
                                    </strong>{' '}
                                    : limitent les erreurs et optimisent le
                                    service.
                                </li>
                                <li>
                                    👨‍🍳{' '}
                                    <strong>
                                        Synchronisation avec la cuisine
                                    </strong>{' '}
                                    : pour accélérer le traitement des
                                    commandes.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Grâce à <strong>Eatsup</strong>, les
                                restaurateurs peuvent{' '}
                                <strong>
                                    mettre à jour leur menu en temps réel
                                </strong>
                                , éviter les erreurs de stock et fluidifier le
                                processus de commande.
                            </p>
                        </section>

                        {/* 2. Améliorer l’expérience client */}
                        <section id="ameliorer-experience" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                2. Améliorer l’expérience client pour fidéliser
                            </h2>

                            {/* 2.1 Réduire le temps d’attente */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.1 Réduire le temps d’attente
                            </h3>
                            <p className="mb-4">
                                Personne n’aime attendre trop longtemps pour
                                être servi. Un temps d’attente excessif peut
                                entraîner une baisse de satisfaction et de
                                ventes.
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    🔹{' '}
                                    <strong>
                                        Affichage du menu instantané avec QR
                                        Code
                                    </strong>
                                    pour éviter l’attente des cartes physiques.
                                </li>
                                <li>
                                    🔹{' '}
                                    <strong>
                                        Optimisation du service en salle
                                    </strong>
                                    grâce à une meilleure gestion des commandes.
                                </li>
                                <li>
                                    🔹 <strong>Encaissement rapide</strong> via
                                    des solutions digitales intégrées.
                                </li>
                            </ul>
                            <p className="mb-4">
                                💡 Un service rapide et efficace{' '}
                                <strong>
                                    augmente le taux de retour des clients
                                </strong>
                                et booste le chiffre d’affaires.
                            </p>

                            {/* 2.2 Personnaliser l’expérience client */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.2 Personnaliser l’expérience client
                            </h3>
                            <p className="mb-4">
                                Un client qui se sent privilégié revient plus
                                souvent !
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    ✔ Offrez{' '}
                                    <strong>
                                        des recommandations personnalisées
                                    </strong>
                                    en fonction de l’historique des commandes.
                                </li>
                                <li>
                                    ✔ Proposez{' '}
                                    <strong>des réductions exclusives</strong>
                                    aux habitués via un programme de fidélité.
                                </li>
                                <li>
                                    ✔ Intégrez{' '}
                                    <strong>
                                        un système de commande en ligne
                                    </strong>
                                    pour les clients pressés ou à emporter.
                                </li>
                            </ul>
                            <p className="mb-4">
                                ➡ <strong>Eatsup</strong> permet aux
                                restaurants de collecter des données sur les
                                habitudes des clients pour adapter les offres et
                                proposer un service plus ciblé.
                            </p>
                        </section>

                        {/* 3. Utiliser des stratégies marketing efficaces */}
                        <section id="strategies-marketing" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                3. Utiliser des stratégies marketing efficaces
                            </h2>

                            {/* 3.1 Augmenter sa visibilité en ligne */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                📢 3.1 Augmenter sa visibilité en ligne
                            </h3>
                            <p className="mb-4">
                                Aujourd’hui, <strong>80% des clients</strong>{' '}
                                cherchent un restaurant sur Internet avant de
                                s’y rendre. Il est donc crucial d’avoir une{' '}
                                <strong>présence digitale forte</strong>.
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    📢{' '}
                                    <strong>
                                        Optimisez votre fiche Google My Business
                                    </strong>
                                    pour apparaître en tête des recherches
                                    locales.
                                </li>
                                <li>
                                    📢 Soyez actif sur{' '}
                                    <strong>Instagram et Facebook</strong>
                                    pour partager des photos et des promotions.
                                </li>
                                <li>
                                    📢 Collectez et mettez en avant{' '}
                                    <strong>les avis clients positifs</strong>.
                                </li>
                            </ul>
                            <p className="mb-4">
                                💡 <strong>Astuce</strong> : Ajoutez un QR Code
                                vers votre menu <strong>Eatsup</strong> sur
                                votre site et réseaux sociaux pour que les
                                clients puissent le consulter avant leur visite.
                            </p>

                            {/* 3.2 Mettre en place des offres et promotions */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🎯 3.2 Mettre en place des offres et promotions
                            </h3>
                            <p className="mb-4">
                                Un bon plan commercial peut booster les ventes
                                de façon significative.
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    🎯 <strong>Offres Happy Hour</strong> sur
                                    certains plats ou boissons pendant les
                                    heures creuses.
                                </li>
                                <li>
                                    🎯 <strong>Remises pour les groupes</strong>
                                    pour attirer des réservations de grandes
                                    tablées.
                                </li>
                                <li>
                                    🎯{' '}
                                    <strong>
                                        Menus du jour et suggestions du chef
                                    </strong>
                                    pour inciter à la découverte.
                                </li>
                            </ul>
                            <p className="mb-4">
                                ➡ <strong>Avec Eatsup</strong>, vous pouvez
                                modifier votre menu en temps réel pour mettre en
                                avant vos offres spéciales et attirer plus de
                                clients.
                            </p>

                            {/* 3.3 Fidéliser la clientèle */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🎟 3.3 Fidéliser la clientèle avec des
                                programmes adaptés
                            </h3>
                            <p className="mb-4">
                                Un client fidèle dépense en moyenne{' '}
                                <strong>67% de plus</strong> qu’un nouveau
                                client. Mettez en place des stratégies pour{' '}
                                <strong>les inciter à revenir</strong> :
                            </p>
                            <ul className="mb-4 space-y-2">
                                <li>
                                    🎟{' '}
                                    <strong>Carte de fidélité numérique</strong>
                                    avec remises après un certain nombre de
                                    visites.
                                </li>
                                <li>
                                    🎟{' '}
                                    <strong>
                                        Réductions pour anniversaires ou
                                        occasions spéciales
                                    </strong>
                                    .
                                </li>
                                <li>
                                    🎟 <strong>Système de parrainage</strong>{' '}
                                    (un client amène un ami, et les deux
                                    bénéficient d’un avantage).
                                </li>
                            </ul>
                            <p className="mb-4">
                                💡 <strong>Astuce</strong> : Un simple QR Code
                                Eatsup sur la table peut{' '}
                                <strong>
                                    renvoyer vers une offre de fidélisation
                                </strong>
                                , incitant les clients à revenir.
                            </p>
                        </section>

                        {/* 4. FAQ */}
                        <section id="faq" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                4. FAQ : Réponses aux questions fréquentes
                            </h2>
                            <p className="mb-4">
                                <strong>
                                    🔹 Un menu digital peut-il vraiment
                                    augmenter mes ventes ?
                                </strong>
                                <br />
                                Oui ! Un{' '}
                                <strong>
                                    menu interactif avec des visuels attrayants
                                </strong>{' '}
                                et des options de commande optimisées peut{' '}
                                <strong>
                                    augmenter le panier moyen de 15 à 30%
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Comment mesurer l’impact de la
                                    digitalisation sur mon restaurant ?
                                </strong>
                                <br />
                                Avec <strong>Eatsup</strong>, vous pouvez
                                analyser{' '}
                                <strong>les plats les plus populaires</strong>,
                                le taux d’interaction avec votre menu et les
                                horaires de forte affluence pour adapter votre
                                stratégie.
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Les QR Codes fonctionnent-ils bien pour
                                    tous types de restaurants ?
                                </strong>
                                <br />
                                Oui, que ce soit pour un{' '}
                                <strong>
                                    restaurant gastronomique, un fast-food ou
                                    une brasserie
                                </strong>
                                , un menu digital{' '}
                                <strong>
                                    améliore l’expérience client et accélère la
                                    prise de commande
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Un menu digital est-il compliqué à mettre
                                    en place ?
                                </strong>
                                <br />
                                Pas du tout !{' '}
                                <strong>
                                    Eatsup permet de créer un menu digital en
                                    quelques minutes
                                </strong>
                                , accessible via un simple QR Code.
                            </p>
                        </section>

                        {/* Conclusion */}
                        <section id="conclusion" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                                Conclusion
                            </h2>
                            <p className="mb-4">
                                Augmenter les ventes d’un restaurant ne repose
                                pas uniquement sur la cuisine, mais aussi sur l’
                                <strong>
                                    expérience client, l’optimisation du menu et
                                    l’utilisation des outils digitaux
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                👉 Avec <strong>Eatsup</strong>, les
                                restaurateurs peuvent facilement{' '}
                                <strong>
                                    digitaliser leur carte, réduire le temps
                                    d’attente et booster leur chiffre d’affaires
                                </strong>{' '}
                                en quelques clics.
                            </p>
                            <p className="mb-4">
                                💡 <strong>Prêt à passer à l’action ?</strong>{' '}
                                Testez dès maintenant{' '}
                                <strong>Eatsup gratuitement</strong> et faites
                                de votre restaurant un établissement moderne et
                                performant ! 🚀
                            </p>
                        </section>
                    </article>
                </div>
            </div>
            <CTABanner />
            </div>
    )
}
