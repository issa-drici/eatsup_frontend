import { Outfit } from 'next/font/google'

const outfitFont = Outfit({
    subsets: ['latin'],
})

export default function MentionsLegales() {
    return (
        <div className='w-full'>
            <h1 className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                Mentions Légales
            </h1>

            <p className="text-slate-400 mb-8">
                Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN), il est porté à la connaissance des utilisateurs du site EatsUp.fr les présentes mentions légales.
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">1. Éditeur du site</h2>
                <ul className="list-none text-slate-400 mb-4">
                    <li>Nom de l'entreprise : Issa DRICI (Auto-entrepreneur)</li>
                    <li>Forme juridique : Micro-entreprise</li>
                    <li>Siège social : 3 rue des Sœurs Franciscaines, 76620 Le Havre, France</li>
                    <li>Numéro SIRET : 84849431600039</li>
                    <li>Numéro de TVA intracommunautaire : Non applicable</li>
                    <li>Responsable de publication : Issa DRICI</li>
                    <li>Email de contact : contact@eatsup.fr</li>
                    <li>Téléphone : +33 6 47 17 32 71</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">2. Hébergeur du site</h2>
                <ul className="list-none text-slate-400 mb-4">
                    <li>Nom de l'hébergeur : Hostinger</li>
                    <li>Raison sociale : Hostinger International Ltd</li>
                    <li>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                    <li>Email : support@hostinger.com</li>
                    <li>Site web : https://www.hostinger.fr</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">3. Activité du site</h2>
                <p className="text-slate-400">
                    Le site EatsUp.fr est une plateforme SaaS permettant aux restaurants de digitaliser leurs menus. L'accès aux fonctionnalités est conditionné par un abonnement mensuel renouvelable automatiquement.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">4. Propriété intellectuelle</h2>
                <p className="text-slate-400 mb-4">
                    En application des articles L.111-1 et suivants du Code de la propriété intellectuelle, tous les contenus présents sur le site (textes, images, graphismes, logo, vidéos, logiciels, bases de données) sont protégés par le droit d'auteur et demeurent la propriété exclusive de l'éditeur, sauf mention contraire.
                </p>
                <p className="text-slate-400">
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">5. Responsabilité</h2>
                <p className="text-slate-400 mb-4">
                    L'éditeur s'engage à assurer la fiabilité des informations diffusées sur le site, mais ne saurait être tenu responsable en cas d'erreur, d'omission ou d'indisponibilité du service. L'utilisateur du site reconnaît utiliser les informations fournies sous sa responsabilité exclusive.
                </p>
                <p className="text-slate-400 mb-4">
                    L'éditeur décline toute responsabilité en cas de :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Dysfonctionnements techniques du site, interruptions de service ou erreurs informatiques</li>
                    <li>Présence de virus informatiques ou cyberattaques</li>
                    <li>Contenus publiés sur des sites tiers accessibles via des liens hypertextes</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">6. Liens hypertextes</h2>
                <p className="text-slate-400">
                    Le site peut contenir des liens hypertextes renvoyant vers d'autres sites internet. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">7. Données personnelles et cookies</h2>
                <p className="text-slate-400 mb-4">
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi Informatique et Libertés du 6 janvier 1978, EatsUp.fr collecte et traite des données personnelles dans le cadre de son activité.
                </p>
                <p className="text-slate-400 mb-4">
                    Données collectées :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Nom du restaurant, adresse, téléphone, email</li>
                    <li>Données analytiques via Google Analytics et Plausible</li>
                    <li>Informations de paiement traitées par Stripe</li>
                </ul>
                <p className="text-slate-400 mb-4">
                    Les données sont conservées pour une durée de 3 ans après la dernière activité de l'utilisateur. Aucune donnée n'est transmise à des tiers en dehors des obligations légales et contractuelles.
                </p>
                <p className="text-slate-400">
                    Le site utilise des cookies pour améliorer l'expérience utilisateur. Conformément à la directive ePrivacy, l'utilisateur peut gérer ses préférences de cookies via la bannière de consentement.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">8. Sécurité et protection des données</h2>
                <p className="text-slate-400">
                    L'éditeur met en œuvre des mesures techniques et organisationnelles afin d'assurer la protection des données personnelles contre les accès non autorisés, la modification ou la destruction.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">9. Accès et disponibilité du site</h2>
                <p className="text-slate-400">
                    L'éditeur s'efforce d'assurer un accès continu au site, mais se réserve le droit de suspendre, modifier ou interrompre les services sans préavis en cas de maintenance ou de mise à jour.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">10. Droit applicable et juridiction compétente</h2>
                <p className="text-slate-400">
                    Les présentes mentions légales sont régies par le droit français. En cas de litige, compétence exclusive est attribuée aux tribunaux compétents de Le Havre.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">11. Modification des mentions légales</h2>
                <p className="text-slate-400">
                    L'éditeur se réserve le droit de modifier les présentes mentions légales à tout moment afin de les adapter aux évolutions du site et de la législation. L'utilisateur est invité à les consulter régulièrement.
                </p>
            </section>
        </div>
    )
}
