/**
 * Liste des chaînes de caractères suspectes à vérifier dans les paramètres
 */
export const SUSPICIOUS_PARAMS = ['.php']

/**
 * Vérifie si les paramètres contiennent des chaînes de caractères suspectes
 * @param {string[]} params - Tableau de paramètres à vérifier
 * @param {string[]} strings - Tableau de chaînes suspectes à vérifier (optionnel)
 * @returns {boolean} - Retourne true si une correspondance est trouvée, sinon false
 */
export const checkSuspiciousParams = (params, strings = SUSPICIOUS_PARAMS) =>
    params.some(p => strings.some(s => p.toLowerCase().includes(s)))
