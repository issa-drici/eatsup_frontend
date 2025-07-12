'use client'

import { useRef, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shadcn-components/ui/card'
import { Button } from '@/shadcn-components/ui/button'
import { Label } from '@/shadcn-components/ui/label'
import {
    Upload,
    Loader2,
    ChefHat,
    Copy,
    ExternalLink,
    ListChecks,
} from 'lucide-react'
import { Dialog, DialogContent } from '@/shadcn-components/ui/dialog'

import PageContainer from '@/components/PageContainer'
import { FileUploadInput } from '@/components/FileUploadInput'
import { useAnalyzeMenuImages } from '@/services/ai/useAnalyzeMenuImages'
import MenuEditor from '@/components/MenuEditor'
import { useCreateMenuFromAIGenerator } from '@/services/menu/useCreateMenuFromAIGenerator'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// Supprimer toute référence à LoadingModal, gif ou animation IA custom

const AIMenuGenerator = () => {
    const [files, setFiles] = useState([])
    const [analysisResult, setAnalysisResult] = useState(null)
    const menuEditorRef = useRef(null)
    const router = useRouter()
    const { restaurantId, menuId } = useParams()
    const { toast } = useToast()
    const [showDialog, setShowDialog] = useState(false)

    const handleCallbackSuccess = data => {
        setAnalysisResult(data)
    }

    const { mutateAsync: analyzeImages, isPending: isUploading } =
        useAnalyzeMenuImages({
            handleCallbackSuccess,
        })

    const {
        createMenu,
        status: publishStatus,
        statusMessage: publishStatusMessage,
        isPublishing,
        publishResult,
        progress,
    } = useCreateMenuFromAIGenerator({
        restaurantId,
        menuId,
        onSuccess: () => {
            // Ne redirige plus automatiquement
        },
    })

    // Scroll sur la première catégorie après fermeture de la modal
    const prevUploading = useRef(false)
    useEffect(() => {
        if (
            prevUploading.current &&
            !isUploading &&
            analysisResult?.categories?.length > 0
        ) {
            menuEditorRef.current?.scrollToFirstCategory()
        }
        prevUploading.current = isUploading
    }, [isUploading, analysisResult])

    const handleUpload = async () => {
        if (!files.length) return
        try {
            setShowDialog(true)
            const formData = new FormData()
            files.forEach((file, index) => {
                formData.append(`image${index + 1}`, file)
            })
            await analyzeImages(formData)
            setShowDialog(false)
        } catch (error) {
            setShowDialog(false)
            // L'erreur est gérée par le service React Query
        }
    }

    const handleSaveAndPublish = () => {
        if (analysisResult) {
            setShowDialog(true)
            createMenu(analysisResult)
        }
    }

    // Construction du lien du menu (à adapter selon ta logique de frontend)
    const menuUrl = publishResult?.data?.menu_id
        ? `/restaurant/${restaurantId}/menu/${publishResult.data.menu_id}`
        : ''

    const handleCopyLink = () => {
        if (menuUrl) {
            navigator.clipboard.writeText(window.location.origin + menuUrl)
            toast({
                title: 'Lien copié',
                description:
                    'Le lien du menu a été copié dans le presse-papier.',
            })
        }
    }

    // Dialog ouvert si process en cours ou si succès et showDialog true
    const isDialogOpen =
        isUploading ||
        isPublishing ||
        publishStatus === 'processing' ||
        (publishStatus === 'success' && showDialog)
    const canCloseDialog = publishStatus === 'success'

    const goToCategories = () => {
        router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}`)
    }

    return (
        <PageContainer>
            <Dialog open={isDialogOpen} onOpenChange={() => {}}>
                <DialogContent
                    hideClose
                    forceMount
                    className="max-w-md flex flex-col items-center gap-8"
                    onInteractOutside={e =>
                        !canCloseDialog && e.preventDefault()
                    }>
                    {(isUploading ||
                        isPublishing ||
                        publishStatus === 'processing') && (
                        <>
                            <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto" />
                            <div className="text-center space-y-2">
                                <div className="text-lg font-semibold">
                                    {isUploading
                                        ? 'Upload en cours...'
                                        : publishStatus === 'processing'
                                          ? 'Création du menu...'
                                          : 'Publication en cours...'}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {publishStatusMessage ||
                                        'Veuillez patienter pendant le traitement.'}
                                </div>
                            </div>
                            {/* {(isPublishing ||
                                publishStatus === 'processing') && (
                                <div className="w-full flex flex-col items-center mt-2">
                                    <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )} */}
                        </>
                    )}
                    {publishStatus === 'success' && publishResult && (
                        <div className="w-full flex flex-col items-center space-y-6">
                            <div className="text-green-700 font-bold text-lg">
                                Menu généré avec succès !
                            </div>
                            <div className="text-gray-700">
                                <span className="font-medium">
                                    {publishResult.categories_created}
                                </span>{' '}
                                catégorie
                                {publishResult.categories_created > 1
                                    ? 's'
                                    : ''}{' '}
                                et
                                <span className="font-medium ml-1">
                                    {publishResult.items_created}
                                </span>{' '}
                                plat{publishResult.items_created > 1 ? 's' : ''}{' '}
                                créés.
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <Button
                                    onClick={handleCopyLink}
                                    size="lg"
                                    variant="outline"
                                    className="w-full">
                                    <Copy className="w-4 h-4 mr-1" /> Copier le
                                    lien
                                </Button>
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="w-full"
                                    onClick={() =>
                                        window.open(menuUrl, '_blank')
                                    }>
                                    <ExternalLink className="w-4 h-4 mr-1" />{' '}
                                    Afficher le menu
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full"
                                    onClick={goToCategories}>
                                    <ListChecks className="w-4 h-4 mr-1" />{' '}
                                    Aller à la liste des catégories
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <div className="max-w-2xl mx-auto space-y-6 pb-32 relative">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">
                        Générateur de Menu IA
                    </h1>
                    <p className="text-muted-foreground">
                        Uploadez une ou plusieurs images ou un PDF de votre menu
                        et l'IA créera automatiquement votre menu numérique
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChefHat className="w-5 h-5" />
                            Upload de fichier
                        </CardTitle>
                        <CardDescription>
                            Formats supportés : JPG, PNG, WebP, PDF (max 10MB
                            par fichier)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="ai-upload">
                                Sélectionner des fichiers
                            </Label>
                            <FileUploadInput
                                id="ai-upload"
                                multiple
                                value={files}
                                onChange={newFiles =>
                                    setFiles(prev => [...prev, ...newFiles])
                                }
                                onRemove={({ index }) => {
                                    setFiles(prev =>
                                        prev.filter((_, i) => i !== index),
                                    )
                                }}
                                accept="image/*,application/pdf"
                                maxSize="10MB"
                            />
                        </div>
                        {files.length > 0 && (
                            <Button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="w-full">
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Upload en cours...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Analyser et générer le menu
                                    </>
                                )}
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Affichage du résultat de l'analyse */}
                {analysisResult && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Résultat de l'analyse</CardTitle>
                            <CardDescription>
                                Voici ce que l'IA a détecté dans vos images
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MenuEditor
                                ref={menuEditorRef}
                                data={analysisResult}
                                onDataChange={setAnalysisResult}
                            />
                        </CardContent>
                    </Card>
                )}
                {/* Résumé de création après succès */}
                {publishStatus === 'success' && publishResult && (
                    <div className="w-full flex flex-col items-center mt-6 space-y-4">
                        <div className="text-green-700 font-bold text-lg">
                            Menu généré avec succès !
                        </div>
                        <div className="text-gray-700">
                            <span className="font-medium">
                                {publishResult.categories_created}
                            </span>{' '}
                            catégorie
                            {publishResult.categories_created > 1 ? 's' : ''} et
                            <span className="font-medium ml-1">
                                {publishResult.items_created}
                            </span>{' '}
                            item{publishResult.items_created > 1 ? 's' : ''}{' '}
                            créés.
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={window.location.origin + menuUrl}
                                readOnly
                                className="border rounded px-2 py-1 text-sm w-64"
                            />
                            <Button
                                onClick={handleCopyLink}
                                size="sm"
                                variant="outline">
                                <Copy className="w-4 h-4 mr-1" /> Copier le lien
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => window.open(menuUrl, '_blank')}>
                                <ExternalLink className="w-4 h-4 mr-1" />{' '}
                                Afficher le menu
                            </Button>
                        </div>
                    </div>
                )}
                {/* Barre sticky au-dessus du bloc "Comment ça marche" */}
                {analysisResult && publishStatus !== 'success' && (
                    <div className="sticky bottom-0 left-0 w-full bg-white border-t flex flex-col items-center py-4 px-4 z-30">
                        <Button
                            type="button"
                            size="lg"
                            className="font-bold px-8 text-lg"
                            onClick={handleSaveAndPublish}
                            disabled={
                                isPublishing ||
                                publishStatus === 'processing' ||
                                publishStatus === 'success'
                            }>
                            {isPublishing || publishStatus === 'processing' ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {publishStatus === 'processing'
                                        ? 'Génération en cours...'
                                        : 'Publication en cours...'}
                                </span>
                            ) : (
                                'Enregistrer et publier le menu'
                            )}
                        </Button>
                        {(isPublishing || publishStatus === 'processing') && (
                            <div className="w-full flex flex-col items-center mt-4">
                                <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="text-sm text-gray-500 mt-2">
                                    {publishStatusMessage}
                                </div>
                            </div>
                        )}
                        {publishStatus === 'error' && (
                            <div className="text-sm text-red-500 mt-2">
                                {publishStatusMessage}
                            </div>
                        )}
                    </div>
                )}
                {/* Bloc "Comment ça marche" */}
                <Card>
                    <CardHeader>
                        <CardTitle>Comment ça marche ?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <p className="font-medium">
                                    Uploadez votre menu
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Prenez une photo de votre menu ou uploadez
                                    un PDF
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <p className="font-medium">
                                    L'IA analyse le contenu
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Notre IA extrait automatiquement les plats,
                                    prix et descriptions
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <p className="font-medium">
                                    Vérifiez et ajustez
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Vérifiez le résultat et faites les
                                    ajustements nécessaires
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default AIMenuGenerator
