'use server'

export async function analyzeMenuImages(formData) {
    try {
        // Appel au webhook n8n depuis le serveur
        const response = await fetch(
            'https://n8n.alliance-tech.fr/webhook/analyze-images',
            {
                method: 'POST',
                body: formData,
            },
        )

        if (!response.ok) {
            throw new Error(`Erreur n8n: ${response.status}`)
        }

        const data = await response.json()

        return { success: true, data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}
