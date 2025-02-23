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
                            src="/images/blog/experience-client.png"
                            alt="Menu Digital Restaurant : Comment Booster Vos Ventes et Améliorer l’Expérience Client ?"
                            className="object-cover"
                            fill
                        />
                    </div>

                    {/* Conteneur Texte */}
                    <div className="flex-1 flex flex-col gap-2 px-10 pt-10 pb-4">
                        <Badge variant="secondary" className="w-fit">
                            Expérience client
                        </Badge>
                        <h1 className="text-white text-2xl font-extrabold text-center md:text-4xl md:text-left">
                            Menu digital restaurant : Comment booster vos ventes
                            et améliorer l’expérience client ?
                        </h1>

                        <div className="flex gap-6 mt-4">
                            <p className="text-slate-500 text-sm font-light">
                                20-01-2025
                            </p>
                            <p className="text-slate-500 text-sm font-light">
                                Temps de lecture : 3 minutes
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
                                        id: 'adopter-menu',
                                        title: '1. Pourquoi adopter un menu digital ?',
                                    },
                                    {
                                        id: 'mise-en-place',
                                        title: '2. Comment mettre en place un menu digital ?',
                                    },
                                    {
                                        id: 'faq',
                                        title: '3. FAQ',
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
                                Dans un secteur de la restauration de plus en
                                plus compétitif, offrir une{' '}
                                <strong>
                                    expérience client fluide et moderne
                                </strong>{' '}
                                est essentiel pour fidéliser sa clientèle et
                                augmenter son chiffre d’affaires. Aujourd’hui,
                                le <strong>menu digital</strong> devient un
                                véritable levier de croissance pour les
                                restaurateurs.
                            </p>
                            <p className="mb-4">
                                Grâce à une solution comme{' '}
                                <strong>Eatsup</strong>, il est désormais
                                possible de proposer un{' '}
                                <strong>
                                    menu interactif, attractif et toujours à
                                    jour
                                </strong>
                                , accessible en un clic via QR Code. Fini les
                                impressions coûteuses, les menus papier
                                obsolètes et les erreurs de commande !
                            </p>
                            <p className="mb-4">
                                Mais{' '}
                                <strong>
                                    quels sont les réels avantages d’un menu
                                    digital
                                </strong>{' '}
                                pour un restaurant ? Et{' '}
                                <strong>
                                    comment l’utiliser efficacement pour
                                    maximiser ses ventes
                                </strong>{' '}
                                ? C’est ce que nous allons voir en détail.
                            </p>
                            <hr className="my-8 border-slate-200" />
                        </section>

                        {/* 1. Pourquoi adopter un menu digital ? */}
                        <section id="adopter-menu" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                1. Pourquoi adopter un menu digital dans son
                                restaurant ?
                            </h2>

                            {/* 1.1 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.1 Un outil moderne qui améliore
                                l’expérience client
                            </h3>
                            <p className="mb-4">
                                Aujourd’hui, les consommateurs sont habitués à
                                utiliser leur smartphone pour réserver une
                                table, commander en ligne ou consulter les avis
                                sur un établissement. Un{' '}
                                <strong>menu digital</strong> leur permet de :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    ✔ Accéder à la carte immédiatement,{' '}
                                    <strong>sans attendre un serveur</strong>.
                                </li>
                                <li>
                                    ✔ Naviguer plus facilement grâce à une{' '}
                                    <strong>
                                        interface claire et intuitive
                                    </strong>
                                    .
                                </li>
                                <li>
                                    ✔ Découvrir les plats avec des{' '}
                                    <strong>photos attractives</strong> et des
                                    <strong> descriptions engageantes</strong>.
                                </li>
                                <li>
                                    ✔ Consulter le menu dans{' '}
                                    <strong>plusieurs langues</strong>, idéal
                                    pour les touristes.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, votre menu devient
                                un <strong>véritable atout marketing</strong>{' '}
                                qui séduit et rassure les clients dès leur
                                arrivée.
                            </p>

                            {/* 1.2 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.2 Une augmentation des ventes grâce à un
                                menu optimisé
                            </h3>
                            <p className="mb-4">
                                Un menu digital permet de{' '}
                                <strong>
                                    mettre en avant certains plats
                                    stratégiquement
                                </strong>
                                , ce qui influence les décisions d’achat des
                                clients.
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    <strong>
                                        🔹 Suggérer des accompagnements ou des
                                        boissons
                                    </strong>{' '}
                                    pour chaque plat (upselling).
                                </li>
                                <li>
                                    🔹 Mettre en avant des{' '}
                                    <strong>
                                        menus du jour, offres spéciales ou
                                        suggestions du chef
                                    </strong>
                                    .
                                </li>
                                <li>
                                    🔹 Ajouter des{' '}
                                    <strong>photos qui donnent envie</strong> de
                                    commander (+30% de ventes en moyenne).
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, les restaurateurs
                                peuvent{' '}
                                <strong>
                                    ajouter et modifier leurs plats en temps
                                    réel
                                </strong>
                                , sans surcoût, pour{' '}
                                <strong>
                                    adapter leur offre aux tendances et aux
                                    stocks disponibles
                                </strong>
                                .
                            </p>

                            {/* 1.3 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.3 Une gestion simplifiée pour les
                                restaurateurs
                            </h3>
                            <p className="mb-4">
                                Gérer un menu papier peut être contraignant : il
                                faut régulièrement{' '}
                                <strong>
                                    réimprimer des versions mises à jour
                                </strong>
                                , ce qui engendre des coûts et du temps perdu.
                            </p>
                            <p className="mb-4">
                                Avec un <strong>menu digital</strong>, vous
                                bénéficiez de nombreux avantages :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    ✔{' '}
                                    <strong>Mises à jour instantanées</strong>{' '}
                                    et illimitées, en quelques clics.
                                </li>
                                <li>
                                    ✔ <strong>Suppression des plats</strong> en
                                    rupture de stock pour éviter les
                                    frustrations clients.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>Personnalisation complète</strong>{' '}
                                    (photos, couleurs, descriptions,
                                    catégories).
                                </li>
                                <li>
                                    ✔ <strong>Accès facile</strong> depuis
                                    n’importe quel appareil (smartphone,
                                    tablette, ordinateur).
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, la gestion du menu
                                devient un jeu d’enfant :{' '}
                                <strong>
                                    un seul lien, un seul QR Code, et tout est à
                                    jour automatiquement
                                </strong>
                                !
                            </p>
                        </section>

                        {/* 2. Comment mettre en place un menu digital ? */}
                        <section id="mise-en-place" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                2. Comment mettre en place un menu digital avec
                                Eatsup ?
                            </h2>

                            {/* 2.1 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.1 Création et personnalisation du menu
                            </h3>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, la création d’un
                                menu digital est rapide et intuitive.
                            </p>
                            <ol className="list-decimal pl-6 mb-4">
                                <li>
                                    <strong>Inscription gratuite</strong> sur la
                                    plateforme
                                </li>
                                <li>
                                    <strong>
                                        Ajout des plats, photos et descriptions
                                    </strong>{' '}
                                    via une interface facile à prendre en main.
                                </li>
                                <li>
                                    <strong>Personnalisation du menu</strong>{' '}
                                    (couleurs, catégories, mises en avant).
                                </li>
                                <li>
                                    Réception des <strong>QR Code</strong> à
                                    placer sur les tables, la vitrine et
                                    comptoir.
                                </li>
                            </ol>
                            <p className="mb-4">
                                💡 <strong>Astuce</strong> : Profitez de la
                                possibilité d’ajouter{' '}
                                <strong>des traductions</strong> pour attirer
                                une clientèle internationale.
                            </p>

                            {/* 2.2 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.2 Mise en place du QR Code en restaurant
                            </h3>
                            <p className="mb-4">
                                Une fois le menu prêt, il suffit de coller les{' '}
                                <strong>QR Code</strong> :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    ✔ <strong>Tables et comptoirs :</strong>{' '}
                                    Pour un accès direct au menu.
                                </li>
                                <li>
                                    ✔ <strong>Vitrine et devanture :</strong>{' '}
                                    Pour permettre aux passants de découvrir la
                                    carte avant d’entrer.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Cartes de visite ou flyers :
                                    </strong>{' '}
                                    Idéal pour le partage et la fidélisation.
                                </li>
                                <li>
                                    ✔{' '}
                                    <strong>
                                        Site internet et réseaux sociaux :
                                    </strong>{' '}
                                    Un moyen efficace de promouvoir votre menu
                                    en ligne.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Avec <strong>Eatsup</strong>, chaque client peut
                                consulter{' '}
                                <strong>un menu toujours à jour</strong>, sans
                                avoir besoin de télécharger une application.
                            </p>

                            {/* 2.3 */}
                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.3 Optimisation et suivi des performances
                            </h3>
                            <p className="mb-4">
                                Grâce aux outils analytiques intégrés d’
                                <strong>Eatsup</strong>, vous pouvez suivre :
                            </p>
                            <ul className="pl-6 mb-4">
                                <li>
                                    📊{' '}
                                    <strong>
                                        Quels sont les plats les plus consultés
                                        et commandés
                                    </strong>
                                    .
                                </li>
                                <li>
                                    📊{' '}
                                    <strong>
                                        À quelle fréquence votre menu est
                                        consulté
                                    </strong>
                                    .
                                </li>
                                <li>
                                    📊{' '}
                                    <strong>
                                        Quels sont les moments de la journée où
                                        l’affluence est la plus forte
                                    </strong>
                                    .
                                </li>
                            </ul>
                            <p className="mb-4">
                                Ces données vous permettent{' '}
                                <strong>d’adapter votre offre</strong> et
                                d’améliorer votre stratégie marketing pour{' '}
                                <strong>booster vos ventes</strong>.
                            </p>
                        </section>

                        {/* 3. FAQ */}
                        <section id="faq" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                3. FAQ : Les questions fréquentes sur le menu
                                digital
                            </h2>
                            <p className="mb-4">
                                <strong>
                                    🔹 Le menu digital est-il compliqué à mettre
                                    en place ?
                                </strong>
                                <br />
                                Non, avec <strong>Eatsup</strong>, la mise en
                                place se fait en quelques minutes et ne
                                nécessite{' '}
                                <strong>aucune compétence technique</strong>.
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Les clients doivent-ils télécharger une
                                    application ?
                                </strong>
                                <br />
                                Non, le menu Eatsup est accessible{' '}
                                <strong>
                                    directement via un lien ou un QR Code
                                </strong>
                                , sans téléchargement nécessaire.
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Puis-je modifier mon menu à tout moment ?
                                </strong>
                                <br />
                                Oui, vous pouvez{' '}
                                <strong>
                                    ajouter, supprimer ou modifier vos plats en
                                    illimité
                                </strong>
                                , en temps réel et sans frais supplémentaires.
                            </p>
                            <p className="mb-4">
                                <strong>
                                    🔹 Le menu digital remplace-t-il les
                                    serveurs ?
                                </strong>
                                <br />
                                Non, il <strong>complète</strong> leur travail
                                en leur faisant gagner du temps, mais
                                l’interaction humaine reste essentielle.
                            </p>
                        </section>

                        {/* Conclusion */}
                        <section id="conclusion" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                                Conclusion
                            </h2>
                            <p className="mb-4">
                                Le <strong>menu digital</strong> est bien plus
                                qu’un simple outil : c’est un levier puissant
                                pour{' '}
                                <strong>
                                    moderniser son restaurant, améliorer
                                    l’expérience client et augmenter ses ventes
                                </strong>
                                .
                            </p>
                            <p className="mb-4">
                                👉 Avec <strong>Eatsup</strong>, créez votre{' '}
                                <strong>menu digital en quelques clics</strong>{' '}
                                et profitez d’une gestion simplifiée, d’une mise
                                à jour instantanée et d’une meilleure visibilité
                                pour vos plats.
                            </p>
                            <p className="mb-4">
                                💡{' '}
                                <strong>
                                    Alors, prêt à passer au menu digital ?
                                </strong>{' '}
                                Testez <strong>Eatsup gratuitement</strong> et
                                transformez votre carte en un véritable outil de
                                conversion ! 🚀
                            </p>
                        </section>
                    </article>
                </div>
            </div>
            <CTABanner />
        </div>
    )
}
