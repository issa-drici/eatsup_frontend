import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/shadcn-components/ui/badge'
import TableOfContents from '@/app/(public)/blog/components/TableOfContents'
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
                            src="/images/blog/innovation-digitalisation.png"
                            alt="Innovation et Digitalisation en Restauration : Comment Réussir sa Transformation ?"
                            className="object-cover"
                            fill
                        />
                    </div>

                    {/* Conteneur Texte */}
                    <div className="flex-1 flex flex-col gap-2 px-10 pt-10 pb-4">
                        <Badge variant="secondary" className="w-fit">
                            Innovation
                        </Badge>
                        <h1 className="text-white text-2xl font-extrabold text-center md:text-4xl md:text-left">
                            Innovation et digitalisation en restauration :
                            Comment réussir sa transformation ?
                        </h1>

                        <div className="flex gap-6 mt-4">
                            <p className="text-slate-500 text-sm font-light">
                                13-01-2025
                            </p>
                            <p className="text-slate-500 text-sm font-light">
                                Temps de lecture : 4 minutes
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
                                        id: 'digitalisation',
                                        title: '1. Pourquoi la digitalisation ?',
                                    },
                                    {
                                        id: 'solutions',
                                        title: '2. Quelles solutions adopter ?',
                                    },
                                    {
                                        id: 'reussir-transition',
                                        title: '3. Comment réussir la transition ?',
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
                                Le secteur de la restauration évolue rapidement
                                avec l'émergence des{' '}
                                <strong>
                                    nouvelles technologies et des attentes des
                                    consommateurs
                                </strong>
                                . Aujourd'hui, la digitalisation devient un
                                levier incontournable pour{' '}
                                <strong>
                                    améliorer l'expérience client, optimiser la
                                    gestion et booster les ventes
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                Parmi les innovations les plus efficaces, on
                                retrouve{' '}
                                <strong>
                                    les menus numériques, les systèmes de
                                    commande connectés et les outils d'analyse
                                    des performances
                                </strong>
                                . Grâce à des plateformes comme{' '}
                                <strong>Eatsup</strong>, les restaurateurs
                                peuvent{' '}
                                <strong>
                                    moderniser leur établissement sans
                                    complexité technique
                                </strong>{' '}
                                et offrir un service plus fluide et attractif.
                            </p>
                            <p className="mb-4">
                                Mais comment réussir cette transition numérique
                                ? Quelles sont les technologies à adopter pour{' '}
                                <strong>se démarquer de la concurrence</strong>{' '}
                                ? Cet article vous guide pas à pas dans votre
                                transformation digitale.
                            </p>
                            <hr className="my-8 border-slate-200" />
                        </section>

                        {/* 1. Pourquoi la digitalisation ? */}
                        <section id="digitalisation" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                1. Pourquoi la digitalisation est-elle
                                essentielle pour les restaurants ?
                            </h2>

                            {/* 1.1 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.1 Une réponse aux nouvelles attentes des
                                clients
                            </h3>
                            <p className="mb-4">
                                Les consommateurs sont de plus en plus{' '}
                                <strong>connectés et exigeants</strong> en
                                matière de rapidité et de fluidité du service.
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    📱 <strong>92% des clients</strong>{' '}
                                    consultent un restaurant en ligne avant de
                                    s'y rendre.
                                </li>
                                <li>
                                    📱{' '}
                                    <strong>
                                        80% préfèrent un service rapide
                                    </strong>{' '}
                                    et sans friction.
                                </li>
                                <li>
                                    📱 <strong>60% des commandes</strong> en
                                    restauration rapide passent par un support
                                    digital.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Un restaurant qui adopte des outils numériques{' '}
                                <strong>
                                    offre une meilleure expérience client
                                </strong>
                                , réduit l'attente et fidélise plus facilement
                                sa clientèle.
                            </p>

                            {/* 1.2 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.2 Une gestion plus efficace pour les
                                restaurateurs
                            </h3>
                            <p className="mb-4">
                                La digitalisation ne profite pas seulement aux
                                clients, elle{' '}
                                <strong>simplifie aussi la gestion</strong> pour
                                les professionnels :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Menus mis à jour en temps réel
                                    </strong>{' '}
                                    sans coûts d'impression.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>Prise de commande optimisée</strong>{' '}
                                    pour éviter les erreurs et gagner du temps.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Meilleure gestion des stocks
                                    </strong>{' '}
                                    avec des outils d'analyse de consommation.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, la transition vers
                                le numérique est{' '}
                                <strong>simple, rapide et efficace</strong>,
                                permettant aux restaurateurs de se concentrer
                                sur l'essentiel : la qualité de leur service.
                            </p>
                        </section>

                        {/* 2. Quelles solutions adopter ? */}
                        <section id="solutions" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                2. Quelles solutions digitales adopter en
                                restauration ?
                            </h2>

                            {/* 2.1 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.1 Le menu digital QR Code : une révolution
                                pour la prise de commande
                            </h3>
                            <p className="mb-4">
                                Le <strong>menu numérique</strong> est l'un des
                                outils les plus simples à mettre en place pour
                                moderniser un restaurant.
                            </p>
                            <p className="mb-4">
                                Avec un <strong>QR Code Eatsup</strong> placé
                                sur les tables ou la vitrine, les clients
                                peuvent :
                            </p>
                            <ul className=" pl-6 mb-4">
                                <li>
                                    ✔ Accéder instantanément à la carte depuis
                                    leur smartphone.
                                </li>
                                <li>
                                    ✔ Voir des{' '}
                                    <strong>
                                        photos attractives et des descriptions
                                        détaillées
                                    </strong>{' '}
                                    des plats.
                                </li>
                                <li>
                                    ✔ Passer commande plus rapidement{' '}
                                    <strong>sans attente inutile</strong>.
                                </li>
                                <li>
                                    ✔ Découvrez les nouveautés et suggestions
                                    en temps réel.
                                </li>
                            </ul>
                            <p className="mb-4">
                                💡{' '}
                                <strong>
                                    Exemple : Un restaurant qui adopte un menu
                                    QR Code voit en moyenne une réduction de 30%
                                    du temps d'attente pour la prise de
                                    commande.
                                </strong>
                            </p>
                            <p className="mb-4">
                                ➡ Avec <strong>Eatsup</strong>, vous créez
                                votre{' '}
                                <strong>
                                    menu numérique en quelques minutes
                                </strong>
                                , accessible sur tous les supports sans
                                application à télécharger.
                            </p>

                            {/* 2.2 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.2 Les systèmes de commande connectés
                            </h3>
                            <p className="mb-4">
                                Pour les établissements à fort débit, il est
                                essentiel de fluidifier la prise de commande.
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    <strong>
                                        📲 Commandes sur tablettes ou téléphones
                                    </strong>{' '}
                                    : permettre aux clients de commander depuis
                                    leur table.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, le menu numérique
                                peut être{' '}
                                <strong>
                                    couplé à une solution de commande connectée
                                </strong>{' '}
                                pour encore plus d'efficacité.
                            </p>

                            {/* 2.3 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.3 L'analyse des performances pour optimiser
                                son restaurant
                            </h3>
                            <p className="mb-4">
                                Les outils numériques permettent de{' '}
                                <strong>
                                    collecter des données précieuses
                                </strong>{' '}
                                sur le comportement des clients.
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    📊 Quels sont les{' '}
                                    <strong>
                                        plats les plus consultés et commandés
                                    </strong>
                                    ?
                                </li>
                                <li>
                                    📊 À quelles heures le restaurant
                                    enregistre-t-il{' '}
                                    <strong>le plus de trafic</strong> ?
                                </li>
                                <li>
                                    📊 Quelle est{' '}
                                    <strong>l'évolution des ventes</strong> sur
                                    une période donnée ?
                                </li>
                            </ul>
                            <p className="mb-4">
                                Grâce à <strong>Eatsup</strong>, vous pouvez
                                suivre ces indicateurs et{' '}
                                <strong>
                                    adapter votre menu et votre stratégie en
                                    conséquence
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                💡{' '}
                                <strong>
                                    Exemple : En ajustant ses prix et en mettant
                                    en avant les plats les plus populaires, un
                                    restaurant peut augmenter ses ventes de 15 à
                                    20% en moyenne.
                                </strong>
                            </p>
                        </section>

                        {/* 3. Comment réussir la transition ? */}
                        <section id="reussir-transition" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                3. Comment réussir la transition numérique de
                                son restaurant ?
                            </h2>

                            {/* 3.1 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 3.1 Étape 1 : Identifier ses besoins
                            </h3>
                            <p className="mb-4">
                                Avant d'adopter des outils numériques, il est
                                essentiel de{' '}
                                <strong>définir ses objectifs</strong> :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    ✔ Réduire le temps d'attente et améliorer
                                    le service ?
                                </li>
                                <li>
                                    ✔ Augmenter le panier moyen en mettant en
                                    avant certains plats ?
                                </li>
                                <li>
                                    ✔ Attirer une clientèle plus large avec des
                                    options en ligne ?
                                </li>
                            </ul>
                            <p className="mb-4">
                                Une fois ces besoins identifiés, il sera plus
                                facile de choisir{' '}
                                <strong>les bonnes solutions numériques</strong>
                                .
                            </p>

                            {/* 3.2 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 3.2 Étape 2 : Choisir les bons outils
                            </h3>
                            <p className="mb-4">
                                La digitalisation ne signifie pas tout changer
                                d'un coup ! Il est possible d'adopter
                                progressivement différentes solutions :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    📌 Commencer par un{' '}
                                    <strong>menu digital QR Code</strong> avec
                                    Eatsup.
                                </li>
                                <li>
                                    📌 Ajouter{' '}
                                    <strong>
                                        un système de commande rapide
                                    </strong>{' '}
                                    pour fluidifier le service.
                                </li>
                                <li>
                                    📌 Utiliser{' '}
                                    <strong>
                                        des outils de gestion et d'analyse
                                    </strong>{' '}
                                    pour mieux piloter l'activité.
                                </li>
                            </ul>

                            {/* 3.3 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 3.3 Étape 3 : Former son personnel et
                                accompagner le changement
                            </h3>
                            <p className="mb-4">
                                Une transition numérique réussie repose
                                également sur{' '}
                                <strong>l'adhésion des équipes</strong>. Il est
                                important de :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    👨‍🍳 <strong>Former le personnel</strong> sur
                                    l'utilisation des nouveaux outils.
                                </li>
                                <li>
                                    📢 <strong>Informer les clients</strong> et
                                    les encourager à utiliser les solutions
                                    digitales.
                                </li>
                                <li>
                                    📊 <strong>Suivre les résultats</strong> et
                                    ajuster les stratégies en fonction des
                                    retours d'expérience.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, la mise en place
                                est intuitive et ne nécessite aucune compétence
                                technique.
                            </p>
                        </section>

                        {/* 4. FAQ */}
                        <section id="faq" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                4. FAQ : Réponses aux questions courantes sur la
                                digitalisation des restaurants
                            </h2>
                            <p className="mb-4">
                                <strong>
                                    🔹 Un menu numérique remplacer-t-il les
                                    serveurs ?
                                </strong>
                                <br />
                                Non, il facilite simplement la prise de commande
                                et permet aux serveurs de{' '}
                                <strong>
                                    se concentrer sur l'accueil et le service
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Faut-il un budget important pour
                                    digitaliser son restaurant ?
                                </strong>
                                <br />
                                Pas indispensable ! Certaines solutions comme{' '}
                                <strong>Eatsup</strong> sont{' '}
                                <strong>
                                    accessibles sans investissement coûteux
                                </strong>
                                , avec une mise en place rapide.
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Un restaurant traditionnel peut-il
                                    bénéficier de la digitalisation ?
                                </strong>
                                <br />
                                Oui, même les établissements gastronomiques
                                utilisent des outils numériques pour améliorer
                                l'expérience client sans perdre leur
                                authenticité.
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Comment éviter que la technologie ne
                                    prenne le dessus sur l'expérience humaine ?
                                </strong>
                                <br />
                                L'idée est de trouver{' '}
                                <strong>le bon équilibre</strong> : un menu
                                numérique ou une commande optimisée ne remplace
                                pas l'accueil et le conseil d'un serveur, mais
                                permet d'{' '}
                                <strong>offrir un service plus efficace</strong>
                                .
                            </p>
                        </section>

                        {/* Conclusion */}
                        <section id="conclusion" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                                Conclusion
                            </h2>
                            <p className="mb-4">
                                La digitalisation n'est plus une option mais une
                                nécessité pour les restaurateurs qui veulent{' '}
                                <strong>
                                    rester performants, améliorer leur service
                                    et augmenter leurs ventes
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                👉 Avec des solutions comme{' '}
                                <strong>Eatsup</strong>, il est possible
                                d'adopter{' '}
                                <strong>
                                    un menu numérique en quelques minutes
                                </strong>
                                , de simplifier la gestion des commandes et
                                d'optimiser l'expérience client sans difficulté.
                            </p>
                            <p className="mb-4">
                                💡{' '}
                                <strong>
                                    Envie de moderniser votre restaurant ?
                                </strong>{' '}
                                Testez dès maintenant{' '}
                                <strong>Eatsup gratuitement</strong> et faites
                                un pas vers l'avenir de la restauration ! 🚀
                            </p>
                        </section>
                    </article>
                </div>
            </div>
            <CTABanner />
        </div>
    )
}
