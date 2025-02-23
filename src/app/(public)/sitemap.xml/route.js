const SITE_URL = 'https://eatsup.fr'

function generateSiteMap(urls = []) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <!-- Pages statiques -->
        <url>
            <loc>${SITE_URL}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>${SITE_URL}/legal/mentions-legales</loc>
            <changefreq>monthly</changefreq>
            <priority>0.3</priority>
        </url>
        <url>
            <loc>${SITE_URL}/legal/politique-confidentialite</loc>
            <changefreq>monthly</changefreq>
            <priority>0.3</priority>
        </url>
        <url>
            <loc>${SITE_URL}/legal/cgv</loc>
            <changefreq>monthly</changefreq>
            <priority>0.3</priority>
        </url>

        <!-- Articles de blog -->
        <url>
            <loc>${SITE_URL}/blog/innovation/innovation-digitalisation-restauration</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>${SITE_URL}/blog/technologie/menus-qr-code-digitalisation-restaurant</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>${SITE_URL}/blog/marketing/augmenter-ventes-restaurant-strategies-digitales</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>${SITE_URL}/blog/experience-client/menu-digital-restaurant-ventes-experience-client</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>

        <!-- URLs dynamiques des restaurants -->
        ${urls
            .map(
                url => `
        <url>
            <loc>${url}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
        `,
            )
            .join('')}
    </urlset>`
}

export async function GET() {
    try {
        // Ajout des headers d'authentification
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/public/restaurant-links`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            },
        )

        if (!response.ok) {
            console.error('Erreur API:', response.status, response.statusText)
            // On continue avec un tableau vide si l'API échoue
            return new Response(generateSiteMap([]), {
                headers: {
                    'Content-Type': 'text/xml',
                },
            })
        }

        const { data } = await response.json()

        const sitemap = generateSiteMap(data)

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'text/xml',
            },
        })
    } catch (error) {
        console.error('Erreur lors de la génération du sitemap:', error)
        // En cas d'erreur, on renvoie le sitemap avec uniquement les pages statiques
        return new Response(generateSiteMap([]), {
            headers: {
                'Content-Type': 'text/xml',
            },
        })
    }
}
