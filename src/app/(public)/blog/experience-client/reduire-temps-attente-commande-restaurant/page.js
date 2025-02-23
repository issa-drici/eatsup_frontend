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
                            Expérience client
                        </Badge>
                        <h1 className="text-white text-2xl font-extrabold text-center md:text-4xl md:text-left">
                            Comment réduire le temps d’attente et fluidifier la
                            prise de commande en restaurant ?
                        </h1>

                        <div className="flex gap-6 mt-4">
                            <p className="text-slate-500 text-sm font-light">
                                27-01-2025
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
                                        id: 'attente',
                                        title: 'Pourquoi le temps d’attente est un enjeu crucial ?',
                                    },
                                    {
                                        id: 'solutions',
                                        title: 'Solutions pour réduire le temps d’attente et fluidifier le service',
                                    },
                                    {
                                        id: 'faq',
                                        title: 'FAQ : Réponses aux questions courantes sur la prise de commande rapide',
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
                                Le temps d’attente en restaurant est un facteur
                                clé de l’expérience client. Une attente trop
                                longue peut frustrer les clients, ralentir le
                                service et impacter négativement les avis en
                                ligne. À l’inverse, un service fluide et rapide
                                améliore la satisfaction, la fidélisation et
                                permet d’augmenter le chiffre d’affaires.
                            </p>

                            <p className="mb-4">
                                Mais{' '}
                                <strong>
                                    comment optimiser la prise de commande et
                                    réduire les temps d’attente
                                </strong>{' '}
                                sans compromettre la qualité du service ?
                                Heureusement, plusieurs solutions existent,
                                allant de l’optimisation organisationnelle à
                                l’utilisation de{' '}
                                <strong>technologies innovantes</strong> comme
                                les menus digitaux et la prise de commande
                                automatisée.
                            </p>

                            <p className="mb-4">
                                Dans cet article, nous allons explorer{' '}
                                <strong>
                                    les causes des longues attentes en
                                    restaurant
                                </strong>{' '}
                                et découvrir{' '}
                                <strong>
                                    des solutions concrètes pour y remédier
                                </strong>
                                .
                            </p>

                            <hr className="my-8 border-slate-200" />
                        </section>

                        <section id="attente" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                1. Pourquoi le temps d’attente est un enjeu
                                crucial ?
                            </h2>
                            <p className="mb-4">
                                Un restaurant qui prend trop de temps pour
                                prendre une commande, servir un plat ou
                                encaisser une addition risque de perdre des
                                clients. Voici pourquoi :
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ❌ 1.1 Impact sur l’expérience client et la
                                satisfaction
                            </h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    Un client qui attend{' '}
                                    <strong>plus de 10 minutes</strong> pour
                                    commander risque de{' '}
                                    <strong>s’impatienter</strong>.
                                </li>
                                <li>
                                    Une attente prolongée peut{' '}
                                    <strong>
                                        donner une impression de mauvaise
                                        organisation
                                    </strong>
                                    .
                                </li>
                                <li>
                                    Un service trop long pousse certains clients
                                    à{' '}
                                    <strong>
                                        quitter l’établissement sans consommer
                                    </strong>
                                    .
                                </li>
                            </ul>

                            <p className="mb-4">
                                Aujourd’hui, avec la montée en puissance des
                                avis en ligne (Google, Tripadvisor, réseaux
                                sociaux), <strong>un service trop lent</strong>{' '}
                                peut{' '}
                                <strong>
                                    nuire à la réputation du restaurant
                                </strong>{' '}
                                et entraîner une baisse de fréquentation.
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ❌ 1.2 Baisse du chiffre d’affaires et rotation
                                des tables plus lente
                            </h3>
                            <p className="mb-4">
                                Un restaurant doit maximiser le nombre de
                                clients servis par service. Plus une table est
                                occupée longtemps sans que la commande soit
                                prise, plus{' '}
                                <strong>
                                    le nombre total de clients servis diminue.
                                </strong>
                            </p>
                            <p className="mb-4">
                                ➡ Résultat :{' '}
                                <strong>
                                    moins de commandes, moins de chiffre
                                    d’affaires, et une perte potentielle de
                                    revenus.
                                </strong>
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ❌ 1.3 Charge de travail accrue pour les équipes
                            </h3>
                            <p className="mb-4">
                                Un personnel surchargé par une gestion
                                inefficace du service peut :
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    Se <strong>fatiguer plus vite</strong>,
                                    augmentant les risques d’erreurs.
                                </li>
                                <li>
                                    Se retrouver débordé, ce qui{' '}
                                    <strong>
                                        détériore l’ambiance de travail
                                    </strong>
                                    .
                                </li>
                                <li>
                                    Provoquer{' '}
                                    <strong>
                                        des erreurs dans la prise de commande
                                    </strong>
                                    , entraînant des plaintes et des retours de
                                    plats.
                                </li>
                            </ul>

                            <p className="mb-4">
                                La solution ?{' '}
                                <strong>
                                    Optimiser le service et utiliser des outils
                                    adaptés pour fluidifier la prise de commande
                                    et réduire les temps d’attente.
                                </strong>
                            </p>
                        </section>

                        <section id="solutions" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                2. Solutions pour réduire le temps d’attente et
                                fluidifier le service
                            </h2>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 2.1 Digitaliser la prise de commande avec un
                                menu QR Code
                            </h3>
                            <p className="mb-4">
                                Un des moyens les plus efficaces pour réduire
                                l’attente est{' '}
                                <strong>
                                    d’éviter le temps perdu à distribuer les
                                    menus et à attendre la prise de commande par
                                    un serveur.
                                </strong>
                            </p>
                            <p className="mb-4">
                                Avec un{' '}
                                <strong>
                                    menu digital accessible via QR Code :
                                </strong>
                            </p>
                            <p className="mb-4">
                                ✔ Les clients{' '}
                                <strong>
                                    consultent la carte immédiatement
                                </strong>
                                , sans attendre un serveur.
                            </p>
                            <p className="mb-4">
                                ✔ Ils prennent{' '}
                                <strong>le temps de réfléchir</strong> sans
                                pression et commandent plus facilement.
                            </p>
                            <p className="mb-4">
                                ✔ Ils peuvent passer commande{' '}
                                <strong>plus rapidement</strong>
                                auprès du serveur ou directement via
                                l’application si l’établissement propose cette
                                option.
                            </p>
                            <p className="mb-4">
                                ➡ Résultat :{' '}
                                <strong>
                                    Moins d’attente, plus d’efficacité et une
                                    meilleure expérience client !
                                </strong>
                            </p>
                            <p className="mb-4">
                                📌 <strong>Exemple concret :</strong> Un
                                restaurant qui intègre un menu QR Code voit en
                                moyenne une{' '}
                                <strong>
                                    réduction de 30% du temps d’attente
                                </strong>{' '}
                                pour la prise de commande, selon plusieurs
                                études du secteur.
                            </p>

                            <h3 className="text-xl font-semibold mb-4 text-slate-700">
                                ✅ 2.2 Organiser efficacement le service et la
                                répartition des tâches
                            </h3>
                            <p className="mb-4">
                                Un bon service repose sur une{' '}
                                <strong>
                                    organisation fluide et optimisée.
                                </strong>{' '}
                                Voici quelques actions concrètes :
                            </p>
                            <h4 className="text-lg font-semibold mb-4 text-slate-700">
                                🔹 Former les équipes à la rapidité et à
                                l’efficacité
                            </h4>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    Adopter une{' '}
                                    <strong>
                                        méthode de prise de commande rapide
                                    </strong>{' '}
                                    : regrouper les commandes par table, éviter
                                    les allers-retours inutiles.
                                </li>
                                <li>
                                    Former les serveurs à{' '}
                                    <strong>
                                        conseiller rapidement les clients
                                    </strong>{' '}
                                    pour accélérer le processus de décision.
                                </li>
                                <li>
                                    Encourager une{' '}
                                    <strong>communication efficace</strong>{' '}
                                    entre la salle et la cuisine.
                                </li>
                            </ul>
                            <h4 className="text-lg font-semibold mb-4 text-slate-700">
                                🔹 Ajuster le personnel selon l’affluence
                            </h4>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    <strong>
                                        Augmenter le nombre de serveurs en
                                        période de rush
                                    </strong>{' '}
                                    pour éviter les embouteillages.
                                </li>
                                <li>
                                    Mettre en place un{' '}
                                    <strong>
                                        système de réservation en ligne
                                    </strong>{' '}
                                    pour mieux anticiper l’afflux de clients.
                                </li>
                                <li>
                                    Affecter un{' '}
                                    <strong>
                                        personnel dédié aux commandes à emporter
                                        et livraisons
                                    </strong>
                                    , pour ne pas ralentir le service en salle.
                                </li>
                            </ul>
                            <h4 className="text-lg font-semibold mb-4 text-slate-700">
                                🔹 Optimiser la carte pour simplifier les
                                commandes
                            </h4>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    Réduire le nombre de plats trop complexes à
                                    préparer.
                                </li>
                                <li>
                                    Proposer un{' '}
                                    <strong>
                                        menu du jour avec des plats rapides à
                                        servir
                                    </strong>
                                    .
                                </li>
                                <li>
                                    Indiquer{' '}
                                    <strong>
                                        les plats les plus populaires
                                    </strong>{' '}
                                    pour faciliter le choix du client.
                                </li>
                            </ul>
                            <p className="mb-4">
                                ➡ Bénéfices : Une meilleure organisation réduit
                                le stress, accélère le service et améliore
                                l’expérience client.
                            </p>
                        </section>

                        <section id="faq" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                                3. FAQ : Réponses aux questions courantes sur la
                                prise de commande rapide
                            </h2>

                            <p className="mb-4">
                                🔹{' '}
                                <strong>
                                    Un menu digital remplace-t-il les serveurs ?
                                </strong>
                            </p>

                            <p className="mb-4">
                                Non ! Il sert à <strong>fluidifier</strong> le
                                service, mais le rôle des serveurs reste
                                essentiel pour le contact humain et les conseils
                                aux clients.
                            </p>
                            <p className="mb-4">
                                🔹{' '}
                                <strong>
                                    Le QR Code est-il adapté à tous les
                                    restaurants ?
                                </strong>
                            </p>
                            <p className="mb-4">
                                Oui ! Que vous soyez un{' '}
                                <strong>
                                    restaurant gastronomique, un fast-food ou un
                                    café
                                </strong>
                                , un menu digital s’adapte à toutes les
                                configurations.
                            </p>
                            <p className="mb-4">
                                🔹{' '}
                                <strong>
                                    Que faire si un client ne veut pas utiliser
                                    un menu QR Code ?
                                </strong>
                            </p>
                            <p className="mb-4">
                                Vous pouvez proposer un{' '}
                                <strong>menu papier en complément</strong> ou
                                former votre personnel à expliquer simplement
                                comment scanner un QR Code.
                            </p>
                        </section>

                        <section id="conclusion" className="mb-12">
                            <p className="mb-4">
                                Un temps d’attente trop long peut impacter
                                l’expérience client, la rentabilité et la
                                réputation d’un restaurant.{' '}
                                <strong>
                                    Heureusement, des solutions existent !
                                </strong>
                            </p>
                            <p className="mb-4">
                                👉{' '}
                                <strong>
                                    Mettre en place un menu digital et optimiser
                                    la prise de commande
                                </strong>{' '}
                                permet de réduire l’attente et d’améliorer la
                                satisfaction client.
                            </p>

                            <p className="mb-4">
                                👉{' '}
                                <strong>
                                    Utiliser des outils connectés et organiser
                                    efficacement le service
                                </strong>{' '}
                                aide à fluidifier la gestion des commandes et à
                                améliorer la productivité.
                            </p>

                            <p className="mb-4">
                                💡{' '}
                                <strong>
                                    Envie d’accélérer le service dans votre
                                    restaurant ?
                                </strong>{' '}
                                Testez dès maintenant{' '}
                                <strong>un menu digital via QR Code</strong>{' '}
                                avec Eatsup et améliorez l’expérience client !
                                🚀
                            </p>
                        </section>
                    </article>
                </div>
            </div>
            <CTABanner />
            </div>
    )
}
