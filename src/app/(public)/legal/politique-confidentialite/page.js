import { outfitFont } from '@/ui/fonts'

export default function PolitiqueConfidentialite() {
    return (
        <div className="w-full">
            <h1
                className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                Politique de Confidentialité
            </h1>

            <p className="text-slate-400 mb-8">
                Dernière mise à jour : 15/02/2025
            </p>

            <p className="text-slate-400 mb-8">
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) (UE 2016/679) et à la Loi Informatique et Libertés du 6
                janvier 1978 modifiée, EatsUp.fr met en œuvre une politique de
                protection des données personnelles visant à garantir la
                transparence et le respect des droits des utilisateurs.
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    1. Responsable du traitement des données
                </h2>
                <p className="text-slate-400 mb-4">
                    Le responsable du traitement des données collectées sur
                    eatsup.fr est :
                </p>
                <ul className="list-none text-slate-400 mb-4">
                    <li>Nom : Issa DRICI</li>
                    <li>Statut : Auto-entrepreneur</li>
                    <li>
                        Siège social : 3 rue des Sœurs Franciscaines, 76620 Le
                        Havre, France
                    </li>
                    <li>Email : contact@eatsup.fr</li>
                    <li>Téléphone : +33 6 47 17 32 71</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    2. Données collectées
                </h2>
                <p className="text-slate-400 mb-4">
                    Dans le cadre de son activité, Eatsup collecte et traite
                    différentes catégories de données personnelles :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Données d'identification : Nom du restaurant, adresse,
                        numéro de téléphone, email
                    </li>
                    <li>
                        Données de connexion : Adresse IP, cookies, logs de
                        connexion
                    </li>
                    <li>
                        Données financières : Paiements traités par Stripe
                        (aucune donnée bancaire n'est stockée sur notre site)
                    </li>
                    <li>
                        Données analytiques : Google Analytics, Plausible,
                        Facebook Pixel, Google Ads
                    </li>
                </ul>
                <p className="text-slate-400">
                    Les données sont collectées directement auprès des
                    utilisateurs lors de leur inscription ou lors de leur
                    navigation sur le site.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    3. Finalités du traitement des données
                </h2>
                <p className="text-slate-400 mb-4">
                    Eatsup utilise les données personnelles pour :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        La gestion des comptes et abonnements des utilisateurs
                    </li>
                    <li>L'amélioration et la personnalisation des services</li>
                    <li>
                        La communication avec les utilisateurs (email
                        transactionnel, assistance)
                    </li>
                    <li>La gestion des paiements et de la facturation</li>
                    <li>
                        L'analyse de la fréquentation et des performances du
                        site
                    </li>
                    <li>La gestion des cookies et publicités ciblées</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    4. Base légale du traitement
                </h2>
                <p className="text-slate-400 mb-4">
                    Les traitements effectués sur Eatsup reposent sur plusieurs
                    bases légales :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Exécution d'un contrat : Gestion des abonnements et
                        accès aux services
                    </li>
                    <li>
                        Consentement : Collecte et gestion des cookies
                        analytiques et publicitaires
                    </li>
                    <li>
                        Obligations légales : Conservation des données de
                        facturation pour les obligations comptables et fiscales
                    </li>
                    <li>
                        Intérêt légitime : Amélioration du service et de
                        l'expérience utilisateur
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    5. Conservation des données
                </h2>
                <p className="text-slate-400 mb-4">
                    Les données personnelles sont conservées pour la durée
                    strictement nécessaire à la finalité pour laquelle elles ont
                    été collectées, à savoir :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Données liées à l'abonnement : Tant que le compte est
                        actif, puis archivage sécurisé pendant 3 ans après la
                        dernière activité
                    </li>
                    <li>
                        Données financières : Conservation des transactions
                        pendant 10 ans conformément aux obligations fiscales
                    </li>
                    <li>Données analytiques et cookies : 13 mois maximum</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    6. Partage des données avec des tiers
                </h2>
                <p className="text-slate-400 mb-4">
                    Eatsup ne vend pas les données personnelles de ses
                    utilisateurs. Toutefois, certaines données peuvent être
                    partagées avec :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Fournisseurs de services tiers : Stripe (paiement),
                        Google Analytics, Plausible, Facebook Pixel, Google Ads
                    </li>
                    <li>
                        Obligations légales : Si une autorité administrative ou
                        judiciaire l'exige
                    </li>
                </ul>
                <p className="text-slate-400">
                    Tous nos partenaires sont soumis aux exigences du RGPD et
                    garantissent un niveau de protection conforme aux standards
                    en vigueur.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    7. Sécurité des données
                </h2>
                <p className="text-slate-400 mb-4">
                    Eatsup met en place des mesures de sécurité techniques et
                    organisationnelles pour protéger les données contre l'accès
                    non autorisé, la perte, l'altération ou la divulgation :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Cryptage des données sensibles</li>
                    <li>
                        Accès restreint aux informations par des identifiants
                        sécurisés
                    </li>
                    <li>Hébergement sécurisé chez Hostinger</li>
                </ul>
                <p className="text-slate-400">
                    Cependant, aucun système n'étant infaillible, l'utilisateur
                    reconnaît que la transmission d'informations via Internet
                    comporte un certain niveau de risque.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    8. Droits des utilisateurs
                </h2>
                <p className="text-slate-400 mb-4">
                    Conformément au RGPD, chaque utilisateur dispose des droits
                    suivants :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Droit d'accès : Obtenir une copie des données détenues
                        par Eatsup
                    </li>
                    <li>
                        Droit de rectification : Modifier des données inexactes
                        ou incomplètes
                    </li>
                    <li>
                        Droit à l'effacement : Suppression des données sous
                        certaines conditions
                    </li>
                    <li>
                        Droit d'opposition : Refus de l'utilisation des données
                        pour certaines finalités
                    </li>
                    <li>
                        Droit à la portabilité : Recevoir ses données dans un
                        format structuré
                    </li>
                    <li>
                        Droit à la limitation du traitement : Suspension
                        temporaire du traitement des données
                    </li>
                </ul>
                <p className="text-slate-400">
                    Toute demande d'exercice des droits peut être envoyée à
                    contact@eatsup.fr avec une copie d'un justificatif
                    d'identité.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    9. Cookies et suivi en ligne
                </h2>
                <p className="text-slate-400 mb-4">
                    Eatsup utilise des cookies pour améliorer l'expérience
                    utilisateur et analyser le trafic. L'utilisateur peut gérer
                    son consentement via la bannière de cookies présente sur le
                    site.
                </p>
                <p className="text-slate-400 mb-4">
                    Types de cookies utilisés :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Cookies essentiels : Nécessaires au fonctionnement du
                        site
                    </li>
                    <li>Cookies analytiques : Google Analytics, Plausible</li>
                    <li>Cookies publicitaires : Facebook Pixel, Google Ads</li>
                    <li>
                        Cookies de préférences : Stockent les choix des
                        utilisateurs
                    </li>
                </ul>
                <p className="text-slate-400">
                    L'utilisateur peut modifier ses préférences à tout moment
                    via le gestionnaire de cookies du site.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    10. Modifications de la politique de confidentialité
                </h2>
                <p className="text-slate-400">
                    Eatsup se réserve le droit de modifier cette politique à
                    tout moment pour refléter les évolutions légales ou
                    techniques. Toute modification sera signalée sur le site.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    11. Contact
                </h2>
                <p className="text-slate-400 mb-4">
                    Pour toute question relative à cette politique, vous pouvez
                    contacter :
                </p>
                <ul className="list-none text-slate-400 mb-4">
                    <li>Email : contact@eatsup.fr</li>
                    <li>
                        Adresse postale : 3 rue des Sœurs Franciscaines, 76620
                        Le Havre, France
                    </li>
                </ul>
            </section>
        </div>
    )
}
