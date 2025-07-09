'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn-components/ui/card'
import { Button } from '@/shadcn-components/ui/button'
import { Input } from '@/shadcn-components/ui/input'
import { Label } from '@/shadcn-components/ui/label'
import { Upload, FileText, Image as ImageIcon, Loader2, ChefHat } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import PageContainer from '@/components/PageContainer'

const AIMenuGenerator = () => {
    const [file, setFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const [preview, setPreview] = useState(null)
    const { user } = useAuth()
    const router = useRouter()

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)

            // Créer un aperçu pour les images
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => setPreview(e.target.result)
                reader.readAsDataURL(selectedFile)
            } else {
                setPreview(null)
            }
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('restaurantId', user?.restaurant?.id)

            // Appel API pour upload et analyse
            const response = await fetch('/api/ai/menu-generator/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                // Rediriger vers la page de prévisualisation du menu généré
                router.push(`/admin/ai-menu-generator/preview/${result.menuId}`)
            }
        } catch (error) {
            // Gérer l'erreur silencieusement
        } finally {
            setIsUploading(false)
        }
    }

    const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

    return (
        <PageContainer>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Générateur de Menu IA</h1>
                    <p className="text-muted-foreground">
                        Uploadez une image ou un PDF de votre menu et l'IA créera automatiquement votre menu numérique
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChefHat className="w-5 h-5" />
                            Upload de fichier
                        </CardTitle>
                        <CardDescription>
                            Formats supportés : JPG, PNG, WebP, PDF (max 10MB)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="file">Sélectionner un fichier</Label>
                            <Input
                                id="file"
                                type="file"
                                accept={supportedFormats.join(',')}
                                onChange={handleFileChange}
                                className="cursor-pointer"
                            />
                        </div>

                        {file && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                    {file.type.startsWith('image/') ? (
                                        <ImageIcon className="w-5 h-5" />
                                    ) : (
                                        <FileText className="w-5 h-5" />
                                    )}
                                    <span className="text-sm font-medium">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                </div>

                                {preview && (
                                    <div className="space-y-2">
                                        <Label>Aperçu</Label>
                                        <div className="border rounded-lg p-4 bg-muted/50">
                                            <Image
                                                src={preview}
                                                alt="Aperçu"
                                                width={400}
                                                height={256}
                                                className="max-w-full h-auto max-h-64 mx-auto"
                                            />
                                        </div>
                                    </div>
                                )}

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
                            </div>
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
