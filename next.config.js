/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Autorise tous les sous-domaines et noms d'hôte
            },
            {
                protocol: 'http',
                hostname: '**', // Autorise tous les noms d'hôte non sécurisés
            },
        ],
    },
}

module.exports = nextConfig
