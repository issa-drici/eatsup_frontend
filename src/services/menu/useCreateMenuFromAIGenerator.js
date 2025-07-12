import { useState, useRef, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import axios from '@/lib/axios'

export const useCreateMenuFromAIGenerator = ({ restaurantId, menuId, onSuccess }) => {
    const { toast } = useToast()
    const [status, setStatus] = useState('idle') // idle | loading | processing | success | error
    const [statusMessage, setStatusMessage] = useState('')
    const [, setJobId] = useState(null)
    const pollingRef = useRef(null)
    const pollingTimeoutRef = useRef(null)
    const [isPublishing, setIsPublishing] = useState(false)
    const [publishResult, setPublishResult] = useState(null)
    const [progress, setProgress] = useState(0)

    // Nettoyage polling
    useEffect(() => {
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current)
            if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current)
        }
    }, [])

    // Fonction de création
    const createMenu = async (menuData) => {
        setIsPublishing(true)
        setStatus('loading')
        setStatusMessage('Envoi des données...')
        setPublishResult(null)
        setProgress(0)
        try {
            const res = await axios.post(`/api/restaurant/${restaurantId}/menu/${menuId}/ai-menu-generator/create`, menuData)
            if (res.data?.job_id) {
                setJobId(res.data.job_id)
                setStatus('processing')
                setStatusMessage('Génération en cours...')
                setProgress(0)
                pollStatus(res.data.job_id)
            } else {
                throw new Error('Aucun job_id retourné')
            }
        } catch (e) {
            setStatus('error')
            setStatusMessage('Erreur lors de la soumission')
            setIsPublishing(false)
            setProgress(0)
            toast({ title: 'Erreur', description: e.message })
        }
    }

    // Polling du statut avec délai initial de 5s
    const pollStatus = (jobId) => {
        pollingTimeoutRef.current = setTimeout(() => {
            pollingRef.current = setInterval(async () => {
                try {
                    const res = await axios.get(`/api/ai-menu-generator/status/${jobId}`)
                    const statusPayload = res.data?.data?.status
                    if (typeof res.data?.data?.progress === 'number') {
                        setProgress(res.data.data.progress)
                    }
                    if (statusPayload === 'completed') {
                        clearInterval(pollingRef.current)
                        setStatus('success')
                        setStatusMessage(res.data?.data?.message || 'Menu généré avec succès !')
                        setIsPublishing(false)
                        setPublishResult(res.data?.data)
                        setProgress(100)
                        if (typeof onSuccess === 'function') {
                            onSuccess(res.data?.data)
                        } else if (onSuccess !== undefined) {
                            // eslint-disable-next-line no-console
                            console.error('onSuccess n\'est pas une fonction:', onSuccess)
                        }
                    } else if (statusPayload === 'failed') {
                        clearInterval(pollingRef.current)
                        setStatus('error')
                        setStatusMessage(res.data?.data?.message || 'Erreur lors de la génération')
                        setIsPublishing(false)
                        setProgress(0)
                        toast({ title: 'Erreur', description: res.data?.data?.message || 'Erreur lors de la génération' })
                    } else {
                        setStatus('processing')
                        setStatusMessage(res.data?.data?.message || 'Génération en cours...')
                    }
                } catch (e) {
                    clearInterval(pollingRef.current)
                    setStatus('error')
                    setStatusMessage('Erreur lors du polling')
                    setIsPublishing(false)
                    setProgress(0)
                    toast({ title: 'Erreur', description: e.message })
                }
            }, 2000)
        }, 5000)
    }

    return { createMenu, status, statusMessage, isPublishing, publishResult, progress }
}
