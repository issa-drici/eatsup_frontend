import { Badge } from '@/shadcn-components/ui/badge'

import Image from 'next/image'
import Link from 'next/link'
import TableOfContents from '@/app/(public)/blog/components/TableOfContents'
import CTABanner from '@/app/(public)/blog/components/CTABanner'

export default function TechnologieMenusQRCodeDigitalisationRestaurant() {
    return (
        <div className="w-full">
            {/* Bannière hero */}
            <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] gap-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                <div className="flex flex-col md:flex-row gap-4 shadow-lg">
                    {/* Conteneur Image */}
                    <div className="relative w-full md:w-[400px] min-h-[250px] rounded-lg overflow-hidden">
                        <Image
                            src="/images/blog/digitaliser.png"
                            alt="Menus QR Code : Pourquoi et comment digitaliser votre carte en 2025 ?"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Conteneur Texte */}
                    <div className="flex-1 flex flex-col gap-2 px-10 pt-10 pb-4">
                        <Badge variant="secondary" className="w-fit">
                            Technologie
                        </Badge>
                        <h1 className="text-white text-2xl font-extrabold text-center md:text-4xl md:text-left">
                            Menus QR Code : Pourquoi et comment digitaliser
                            votre carte en 2025 ?
                        </h1>

                        <div className="flex gap-6 mt-4">
                            <p className="text-slate-500 text-sm font-light">
                                03-02-2025
                            </p>
                            <p className="text-slate-500 text-sm font-light">
                                Temps de lecture : 3 minutes
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <Link
                                href="#pricing"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/tiktok.png"
                                    alt="Logo Eatsup"
                                    className="w-6 h-auto "
                                    width={73}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#pricing"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/facebook.png"
                                    alt="Logo Eatsup"
                                    className="w-6 h-auto"
                                    width={74}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#pricing"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/x.png"
                                    alt="Logo Eatsup"
                                    className="w-6 h-auto"
                                    width={74}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#pricing"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/linkedin.png"
                                    alt="Logo Eatsup"
                                    className="w-6 h-auto"
                                    width={73}
                                    height={73}
                                />
                            </Link>
                            <Link
                                href="#pricing"
                                className="hover:scale-90 hover:opacity-100 opacity-60 transition-all duration-150">
                                <Image
                                    src="/icons/instagram.png"
                                    alt="Logo Eatsup"
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
                                        id: 'avantages',
                                        title: 'Pourquoi opter pour un menu QR Code ?',
                                    },
                                    {
                                        id: 'implementation',
                                        title: 'Comment mettre en place un menu QR Code efficacement ?',
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
                        <section id="introduction" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                                Introduction
                            </h2>
                            <p className="mb-4">
                                Avec l'évolution des habitudes de consommation
                                et la montée en puissance du digital, les
                                restaurants doivent s'adapter pour offrir une
                                expérience client fluide, moderne et
                                interactive. L'utilisation des
                                <strong> menus QR Code</strong> s'impose
                                désormais comme une solution incontournable.
                            </p>

                            <p className="mb-4">
                                Fini les menus papier usés, les mises à jour
                                complexes et les impressions coûteuses. Grâce au
                                <strong>
                                    {' '}
                                    menu digital accessible via QR Code
                                </strong>
                                , les clients peuvent consulter la carte en
                                quelques secondes, tandis que les restaurateurs
                                bénéficient d'une gestion simplifiée et d'une
                                meilleure rentabilité.
                            </p>

                            <p className="mb-4">
                                Mais{' '}
                                <strong>
                                    quels sont les avantages concrets d'un menu
                                    QR Code
                                </strong>{' '}
                                ? Et surtout,{' '}
                                <strong>
                                    comment le mettre en place efficacement
                                </strong>{' '}
                                ? C'est ce que nous allons voir en détail.
                            </p>

                            <hr className="my-8 border-slate-200" />
                        </section>

                        <section id="avantages" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                1. Pourquoi opter pour un menu QR Code ?
                            </h2>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.1 Réduction des coûts et impact écologique
                            </h3>
                            <p className="mb-4">
                                L'un des principaux avantages d'un menu digital
                                est la{' '}
                                <strong>
                                    réduction des coûts liés aux impressions
                                </strong>
                                . Un menu papier nécessite d'être réimprimé
                                régulièrement en cas de :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Changement de plats ou de prix</li>
                                <li>Erreurs ou fautes d'orthographe</li>
                                <li>Usure ou détérioration des supports</li>
                            </ul>

                            <p className="mb-4">
                                Ces coûts peuvent rapidement devenir
                                conséquents, surtout pour les restaurants qui
                                proposent des menus saisonniers ou qui mettent
                                en place des offres spéciales.
                            </p>
                            <p className="mb-4">
                                Un menu QR Code permet{' '}
                                <strong>d'éliminer ces frais</strong> et de
                                contribuer à une démarche plus écologique, en
                                limitant l'usage de papier et d'encre.
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.2 Mise à jour instantanée et flexibilité
                                accrue
                            </h3>
                            <p className="mb-4">
                                Avec un menu numérique,{' '}
                                <strong>tout changement est instantané</strong>.
                                En quelques clics, vous pouvez :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    Ajouter un{' '}
                                    <strong>
                                        nouveau plat ou une boisson spéciale
                                    </strong>
                                </li>
                                <li>Modifier un prix</li>
                                <li>
                                    Retirer un plat en cas de rupture de stock
                                </li>
                                <li>
                                    Mettre en avant un{' '}
                                    <strong>menu du jour</strong>
                                </li>
                            </ul>
                            <p className="mb-4">
                                Plus besoin d'attendre une nouvelle impression
                                ou de donner des explications aux clients sur
                                les plats indisponibles :{' '}
                                <strong>
                                    votre menu est toujours à jour et reflète en
                                    temps réel l'offre de votre restaurant
                                </strong>
                                .
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.3 Expérience client améliorée
                            </h3>
                            <p className="mb-4">
                                Les clients d'aujourd'hui sont de plus en plus
                                habitués à utiliser leur smartphone pour
                                consulter des informations et commander en
                                ligne. Un menu digital leur permet :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    D'accéder au menu{' '}
                                    <strong>sans attente</strong> et sans
                                    toucher de menu physique
                                </li>
                                <li>
                                    De naviguer plus facilement grâce à une{' '}
                                    <strong>
                                        interface intuitive et ergonomique
                                    </strong>
                                </li>
                                <li>
                                    D'avoir des{' '}
                                    <strong>visuels attractifs</strong> qui
                                    mettent en valeur les plats et les boissons
                                </li>
                                <li>
                                    De consulter le menu dans{' '}
                                    <strong>plusieurs langues</strong>, ce qui
                                    est idéal pour les touristes
                                </li>
                            </ul>
                            <p className="mb-4">
                                Un menu QR Code ne remplace pas l'interaction
                                avec le personnel, mais{' '}
                                <strong>
                                    il fluidifie le processus de commande et
                                    améliore le confort du client
                                </strong>
                                .
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.4 Augmentation des ventes grâce à un menu
                                interactif
                            </h3>
                            <p className="mb-4">
                                Un menu digital bien conçu permet{' '}
                                <strong>
                                    d'augmenter le panier moyen des clients
                                </strong>{' '}
                                en mettant en avant certains produits. Vous
                                pouvez par exemple :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    <strong>
                                        Suggérer des accompagnements ou des
                                        boissons
                                    </strong>{' '}
                                    pour chaque plat
                                </li>
                                <li>
                                    Mettre en avant des{' '}
                                    <strong>
                                        menus spéciaux ou des offres
                                        promotionnelles
                                    </strong>
                                </li>
                                <li>
                                    Ajouter des descriptions détaillées et des
                                    photos alléchantes qui incitent à commander
                                </li>
                            </ul>
                            <p className="mb-4">
                                Des études montrent que la présentation des
                                plats avec <strong>de belles images</strong> et
                                des <strong>descriptions engageantes</strong>{' '}
                                peut entraîner{' '}
                                <strong>
                                    une augmentation de 15 à 30% des ventes
                                </strong>
                                .
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 1.5 Accessibilité et partage facilité
                            </h3>
                            <p className="mb-4">
                                Un menu QR Code ne se limite pas aux tables du
                                restaurant. Vous pouvez également :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    <strong>
                                        Le partager sur votre site web ou vos
                                        réseaux sociaux
                                    </strong>
                                </li>
                                <li>
                                    L'intégrer à votre{' '}
                                    <strong>fiche Google My Business</strong>,
                                    afin que les clients puissent le consulter
                                    avant leur venue
                                </li>
                            </ul>
                            <p className="mb-4">
                                Ainsi, vos clients peuvent{' '}
                                <strong>découvrir votre menu en amont</strong>{' '}
                                et même le partager avec leurs amis ou
                                collègues.
                            </p>
                        </section>

                        <section id="implementation" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                2. Comment mettre en place un menu QR Code
                                efficacement ?
                            </h2>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.1 Choisir une solution adaptée
                            </h3>
                            <p className="mb-4">
                                Optez pour notre{' '}
                                <strong>
                                    plateforme intuitive et complète
                                </strong>{' '}
                                Eatsup, qui vous permet de créer un menu digital
                                attractif et facile à mettre à jour.
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.2 Générer et afficher votre QR Code
                            </h3>
                            <p className="mb-4">
                                Une fois votre menu créé, il suffit de placer
                                les QR Code que vous avez reçu sur :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    <strong>Tables et comptoirs :</strong> Pour
                                    que les clients puissent y accéder
                                    immédiatement.
                                </li>
                                <li>
                                    <strong>Vitrine et devanture :</strong> Pour
                                    attirer les passants et leur permettre de
                                    consulter le menu avant d’entrer.
                                </li>
                                <li>
                                    <strong>
                                        Sets de table ou sous-verres :
                                    </strong>{' '}
                                    Une solution pratique et intégrée au design
                                    du restaurant.
                                </li>
                                <li>
                                    <strong>
                                        Cartes de visite ou flyers :
                                    </strong>{' '}
                                    Pour que les clients puissent emporter le QR
                                    Code avec eux et le partager.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Un QR Code bien placé et bien visible encourage
                                les clients à l’utiliser naturellement.
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                🔹 2.3 Personnaliser votre menu pour le rendre
                                attractif
                            </h3>
                            <p className="mb-4">
                                Un bon menu digital ne doit pas être une simple
                                <strong>liste de plats et de prix</strong>. Il
                                doit être attractif et donner envie de
                                commander. Voici quelques conseils pour
                                l’optimiser :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    ✅{' '}
                                    <strong>
                                        Ajoutez des photos de haute qualité
                                    </strong>
                                    : Un plat bien présenté attire l’œil et
                                    incite à l’achat.
                                </li>
                                <li>
                                    ✅{' '}
                                    <strong>
                                        Rédigez des descriptions engageantes
                                    </strong>
                                    : Décrivez chaque plat avec des détails
                                    appétissants (exemple : "Burger gourmet au
                                    bœuf Angus, sauce maison et cheddar
                                    affiné").
                                </li>
                                <li>
                                    ✅{' '}
                                    <strong>
                                        Mettez en avant les plats populaires
                                    </strong>
                                    : Affichez les{' '}
                                    <strong>recommandations du chef</strong> ou
                                    les
                                    <strong>plats les plus commandés</strong>.
                                </li>
                            </ul>
                        </section>

                        <section id="conclusion" className="mb-12">
                            <p className="mb-4">
                                Le <strong>menu QR Code</strong> est un outil
                                puissant pour{' '}
                                <strong>
                                    moderniser votre restaurant, réduire les
                                    coûts et améliorer l'expérience client
                                </strong>
                                . Il facilite la gestion des menus,
                                <strong>augmente les ventes</strong> et répond
                                aux nouvelles attentes des consommateurs.
                            </p>

                            <p className="mb-4">
                                💡{' '}
                                <strong>
                                    Alors, pourquoi ne pas passer au menu
                                    digital dès aujourd'hui ?
                                </strong>
                                Testez notre solution <strong>Eatsup</strong> et
                                transformez votre carte en un véritable levier
                                de croissance ! 🚀
                            </p>
                        </section>
                    </article>
                </div>
            </div>
            <CTABanner />
        </div>
    )
}
