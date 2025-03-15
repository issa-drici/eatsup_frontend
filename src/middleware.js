export default function middleware(request) {
    const { pathname } = request.nextUrl

    // Liste des chemins à bloquer
    const blockedPaths = [
        '/wp-content/languages/link.php',
        '/wp-includes/sitemaps/about.php',
        '/wp-includes/customize/autoload_classmap.php',
        '/wp-content/themes/index.php',
        '/wp-includes/sodium_compat/link.php',
        '/wp-includes/style-engine/content.php',
        '/wordpress/wp-admin/includeswp-conflg.php',
        '/wp-admin/js/wp-login.php',
        '/wp-includes/css/wp-login.php',
        '/wp-admin/includes/install.php',
        '/wp-content/themes/about.php',
        '/wp-content/languages/chosen.php',
        '/wp-includes/Text/alfa-rex.php',
        '/assets/images/doc.php',
        '/wp-admin/network/admin.php',
        '/wp-includes/sodium_compat/wp-login.php',
        '/wp-includes/theme-compat/about.php',
        '/wp-includes/blocks/edit.php',
    ]

    // Vérifier si le chemin actuel est dans la liste des chemins bloqués
    if (blockedPaths.some(path => pathname.startsWith(path))) {
        // Créer une nouvelle URL avec le code de statut 404
        const url = request.nextUrl.clone()
        url.pathname = '/404'

        // Rediriger vers la page 404 avec le statut 404
        return Response.redirect(url, 404)
    }
}

// Configurer le middleware pour s'exécuter sur toutes les routes
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
