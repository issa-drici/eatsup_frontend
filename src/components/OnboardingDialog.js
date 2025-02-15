import { Dialog, DialogContent } from '@/shadcn-components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useCreateMenuCategory } from '@/services/menu-category/useCreateMenuCategory'
import { useCreateMenuItem } from '@/services/menu-category/useCreateMenuItem'
import { useRouter } from 'next/navigation'
import { Badge } from '@/shadcn-components/ui/badge'
import { useQueryClient } from '@tanstack/react-query'

const OnboardingDialog = ({
    isOpen: showDialog,
    hasCategories,
    restaurantId,
    menuId,
    category: category,
}) => {
    const router = useRouter()
    const [step, setStep] = useState(hasCategories ? 2 : 1)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(showDialog)

    // État pour la catégorie
    const [categoryData, setCategoryData] = useState({
        name: {
            fr: '',
        },
        description: {
            fr: '',
        },
    })

    // État pour l'article
    const [itemData, setItemData] = useState({
        name: {
            fr: '',
        },
        description: {
            fr: '',
        },
        price: '',
        allergens: '',
        is_active: true,
        sort_order: 0,
    })

    const handleCategorySuccess = async () => {
        queryClient.invalidateQueries({
            queryKey: ['menu-infos-home', restaurantId],
        })
        setStep(2)
    }

    const handleItemSuccess = async () => {
        setStep(3)
    }

    const { mutateAsync: createMenuCategory } = useCreateMenuCategory({
        handleCallbackSuccess: handleCategorySuccess,
        menuId,
    })

    const { mutateAsync: createMenuItem } = useCreateMenuItem({
        handleCallbackSuccess: handleItemSuccess,
        categoryId: category?.id,
    })

    const handleCategorySubmit = async e => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await createMenuCategory(categoryData)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleItemSubmit = async e => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('name', JSON.stringify(itemData.name))
            formData.append('description', JSON.stringify(itemData.description))
            formData.append('price', itemData.price)
            formData.append('allergens', itemData.allergens)
            formData.append('is_active', itemData.is_active)
            formData.append('sort_order', itemData.sort_order)

            await createMenuItem(formData)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpgrade = () => {
        queryClient.invalidateQueries({
            queryKey: ['menu-infos-home', restaurantId],
        })
        router.push('/admin/subscription')
    }

    const handleChange = (formType, field, lang, value) => {
        if (formType === 'category') {
            if (lang) {
                setCategoryData(prev => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [lang]: value,
                    },
                }))
            } else {
                setCategoryData(prev => ({
                    ...prev,
                    [field]: value,
                }))
            }
        } else {
            if (lang) {
                setItemData(prev => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [lang]: value,
                    },
                }))
            } else {
                setItemData(prev => ({
                    ...prev,
                    [field]: value,
                }))
            }
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-md" hideClose>
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">
                            Créez votre première catégorie
                        </h2>
                        <p className="text-sm text-gray-500">
                            Commençons par créer une catégorie pour organiser
                            vos plats (ex: Entrées, Plats, Desserts)
                        </p>
                        <form
                            onSubmit={handleCategorySubmit}
                            className="space-y-4 w-full">
                            <div>
                                <Label htmlFor="name">
                                    Nom de la catégorie*
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={categoryData.name.fr}
                                    onChange={e =>
                                        handleChange(
                                            'category',
                                            'name',
                                            'fr',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 w-full"
                                    required
                                    autoFocus
                                />
                                <InputError
                                    messages={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <TextArea
                                    value={categoryData.description.fr}
                                    onChange={e =>
                                        handleChange(
                                            'category',
                                            'description',
                                            'fr',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 w-full"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                isLoading={isLoading}>
                                Créer et ajouter un article
                            </Button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">
                                Ajoutez votre premier plat dans{' '}
                            </h2>
                            <Badge
                                variant="outline"
                                className=" border-violet-200 text-violet-700">
                                {category?.name?.fr}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                            Maintenant, ajoutons un plat dans votre catégorie
                        </p>
                        <form onSubmit={handleItemSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="itemName">Nom du plat*</Label>
                                <Input
                                    id="itemName"
                                    type="text"
                                    placeholder="Burger"
                                    value={itemData.name.fr}
                                    onChange={e =>
                                        handleChange(
                                            'item',
                                            'name',
                                            'fr',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 w-full"
                                    required
                                />
                                <InputError
                                    messages={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <TextArea
                                    value={itemData.description.fr}
                                    placeholder="Un burger classique avec fromage, salade et tomate"
                                    onChange={e =>
                                        handleChange(
                                            'item',
                                            'description',
                                            'fr',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="price">Prix*</Label>
                                <Input
                                    id="price"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="10.00"
                                    value={itemData.price}
                                    onChange={e => {
                                        const value = e.target.value.replace(
                                            /[^0-9.]/g,
                                            '',
                                        )
                                        if (/^\d*\.?\d*$/.test(value)) {
                                            handleChange(
                                                'item',
                                                'price',
                                                null,
                                                value,
                                            )
                                        }
                                    }}
                                    onKeyPress={e => {
                                        if (!/[\d.]/.test(e.key)) {
                                            e.preventDefault()
                                        }
                                    }}
                                    className="mt-1 w-full"
                                    required
                                />
                                <InputError
                                    messages={errors.price}
                                    className="mt-2"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                isLoading={isLoading}>
                                Créer cet article
                            </Button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">
                            Félicitations ! 🎉
                        </h2>
                        <p className="text-sm text-gray-500">
                            Votre menu est maintenant créé. Profitez de notre
                            offre de lancement !
                        </p>
                        <div className="bg-violet-50 p-4 rounded-lg">
                            <p className="font-semibold text-violet-900">
                                Offre Spéciale
                            </p>
                            <p className="text-sm text-violet-700">
                                9,99€/mois au lieu de 15€
                            </p>
                            <ul className="text-sm text-violet-600 mt-2 space-y-1">
                                <li>✓ Catégories illimitées</li>
                                <li>✓ Photos des plats</li>
                                <li>✓ Autocollants QR codes offerts</li>
                                <li>✓ Site web inclus offert</li>
                            </ul>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <Button
                                onClick={() => {
                                    setIsOpen(false)
                                    queryClient.invalidateQueries({
                                        queryKey: ['menu-infos-home', restaurantId],
                                    })
                                }}
                                variant="outline">
                                Plus tard
                            </Button>
                            <Button
                                onClick={handleUpgrade}
                                className="w-full bg-violet-600 hover:bg-violet-700">
                                Passer à la version Premium
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default OnboardingDialog
