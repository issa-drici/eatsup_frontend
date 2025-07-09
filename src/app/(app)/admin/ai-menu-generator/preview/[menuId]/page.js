'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn-components/ui/card'
import { Button } from '@/shadcn-components/ui/button'
import { Badge } from '@/shadcn-components/ui/badge'
import { Separator } from '@/shadcn-components/ui/separator'
import { Check, Edit, Save, X, Loader2 } from 'lucide-react'
import PageContainer from '@/components/PageContainer'
import { useQueryClient } from '@tanstack/react-query'

const MenuPreview = () => {
    const { menuId } = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [menu, setMenu] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    useEffect(() => {
        // Charger le menu généré par l'IA
        fetchMenuData()
    }, [menuId])

    const fetchMenuData = async () => {
        try {
            const response = await fetch(`/api/ai/menu-generator/preview/${menuId}`)
            if (response.ok) {
                const data = await response.json()
                setMenu(data)
            }
        } catch (error) {
            console.error('Erreur lors du chargement:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSaveMenu = async () => {
        setIsSaving(true)
        try {
            const response = await fetch(`/api/ai/menu-generator/save/${menuId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menu),
            })

            if (response.ok) {
                const result = await response.json()
                // Invalider les caches et rediriger vers le menu
                await queryClient.invalidateQueries(['menus'])
                router.push(`/admin/restaurant/${result.restaurantId}/menu/${result.menuId}`)
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleEditItem = (itemId) => {
        setEditingItem(itemId)
    }

    const handleSaveItem = (itemId, updatedData) => {
        setMenu(prev => ({
            ...prev,
            categories: prev.categories.map(category => ({
                ...category,
                items: category.items.map(item =>
                    item.id === itemId ? { ...item, ...updatedData } : item
                )
            }))
        }))
        setEditingItem(null)
    }

    const handleCancelEdit = () => {
        setEditingItem(null)
    }

    if (isLoading) {
        return (
            <PageContainer>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            </PageContainer>
        )
    }

    if (!menu) {
        return (
            <PageContainer>
                <div className="text-center">
                    <p>Menu non trouvé</p>
                </div>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Prévisualisation du Menu</h1>
                        <p className="text-muted-foreground">
                            Vérifiez et ajustez le menu généré par l'IA avant de le sauvegarder
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            <X className="w-4 h-4 mr-2" />
                            Annuler
                        </Button>
                        <Button onClick={handleSaveMenu} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sauvegarde...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Sauvegarder le menu
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{menu.name}</CardTitle>
                        <CardDescription>
                            Menu généré automatiquement par l'IA
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {menu.categories?.map((category, categoryIndex) => (
                                <div key={category.id || categoryIndex} className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-semibold">{category.name}</h3>
                                        <Badge variant="secondary">
                                            {category.items?.length || 0} plats
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        {category.items?.map((item, itemIndex) => (
                                            <div key={item.id || itemIndex} className="border rounded-lg p-4">
                                                {editingItem === item.id ? (
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            value={item.name || ''}
                                                            onChange={(e) => handleSaveItem(item.id, { name: e.target.value })}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                        <textarea
                                                            value={item.description || ''}
                                                            onChange={(e) => handleSaveItem(item.id, { description: e.target.value })}
                                                            className="w-full p-2 border rounded"
                                                            rows="2"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={item.price || ''}
                                                            onChange={(e) => handleSaveItem(item.id, { price: parseFloat(e.target.value) })}
                                                            className="w-full p-2 border rounded"
                                                            step="0.01"
                                                        />
                                                        <div className="flex gap-2">
                                                            <Button size="sm" onClick={() => handleSaveItem(item.id, {})}>
                                                                <Check className="w-4 h-4 mr-1" />
                                                                Sauvegarder
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                                                <X className="w-4 h-4 mr-1" />
                                                                Annuler
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">{item.name}</h4>
                                                                <span className="text-sm font-semibold text-green-600">
                                                                    {item.price ? `${item.price.toFixed(2)} €` : 'Prix non détecté'}
                                                                </span>
                                                            </div>
                                                            {item.description && (
                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                    {item.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleEditItem(item.id)}
                                                        >
                                                            <Edit className="w-4 h-4 mr-1" />
                                                            Modifier
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {categoryIndex < menu.categories.length - 1 && <Separator />}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default MenuPreview
