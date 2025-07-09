'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn-components/ui/card'
import { Button } from '@/shadcn-components/ui/button'
import { Label } from '@/shadcn-components/ui/label'
import { Upload, Loader2, ChefHat } from 'lucide-react'
import { useAuth } from '@/hooks/auth'
import PageContainer from '@/components/PageContainer'
import { FileUploadInput } from '@/components/FileUploadInput'

const AIMenuGenerator = () => {
    const [files, setFiles] = useState([])
    const { user } = useAuth()
    const router = useRouter()
    const { restaurantId, menuId } = useParams()
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = async () => {
        if (!files.length) return
        setIsUploading(true)
        try {
            const formData = new FormData()
            files.forEach(file => formData.append('files[]', file))
            formData.append('restaurantId', restaurantId)
            formData.append('menuId', menuId)

            // Appel API pour upload et analyse
            const response = await fetch(`/api/ai/menu-generator/upload`, {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}/ai-menu-generator/preview/${result.menuId}`)
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <PageContainer>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Générateur de Menu IA</h1>
                    <p className="text-muted-foreground">
                        Uploadez une ou plusieurs images ou un PDF de votre menu et l'IA créera automatiquement votre menu numérique
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChefHat className="w-5 h-5" />
                            Upload de fichier
                        </CardTitle>
                        <CardDescription>
                            Formats supportés : JPG, PNG, WebP, PDF (max 10MB par fichier)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="ai-upload">Sélectionner des fichiers</Label>
                            <FileUploadInput
                                id="ai-upload"
                                multiple
                                value={files}
                                onChange={newFiles => setFiles(prev => [...prev, ...newFiles])}
                                onRemove={({ type, index }) => {
                                    setFiles(prev => prev.filter((_, i) => i !== index))
                                }}
                                accept="image/*,application/pdf"
                                maxSize="10MB"
                            />
                        </div>
                        {files.length > 0 && (
                            <Button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="w-full"
                            >
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
                                <p className="font-medium">Uploadez votre menu</p>
                                <p className="text-sm text-muted-foreground">
                                    Prenez une photo de votre menu ou uploadez un PDF
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <p className="font-medium">L'IA analyse le contenu</p>
                                <p className="text-sm text-muted-foreground">
                                    Notre IA extrait automatiquement les plats, prix et descriptions
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <p className="font-medium">Vérifiez et ajustez</p>
                                <p className="text-sm text-muted-foreground">
                                    Vérifiez le résultat et faites les ajustements nécessaires
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
