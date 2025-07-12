import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { analyzeMenuImages as analyzeMenuImagesAction } from '@/services/server-actions/ai/analyzeMenuImages'

const analyzeMenuImages = async formData => {
    const result = await analyzeMenuImagesAction(formData)
    if (!result.success) {
        throw new Error(result.error)
    }
    return result.data
}

export const useAnalyzeMenuImages = ({ handleCallbackSuccess }) => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: analyzeMenuImages,
        onSuccess: async data => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess(data)
            }
            toast({
                title: 'Analyse terminée',
                description: 'Votre menu a été analysé avec succès',
            })
            return data
        },
        onError: async error => {
            toast({
                title: 'Une erreur est survenue',
                description:
                    error?.message || "Erreur lors de l'analyse des images",
            })
            return false
        },
    })
}
