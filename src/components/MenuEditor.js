'use client'



import { Input } from '@/shadcn-components/ui/input'
import { Button } from '@/shadcn-components/ui/button'
import { Textarea } from '@/shadcn-components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

function scrollToElementSmoothly(element, offset = -100) {
    if (!element) return
    const rect = element.getBoundingClientRect()
    const scrollTop = window.scrollY || window.pageYOffset
    const top = rect.top + scrollTop + offset
    window.scrollTo({ top, behavior: 'smooth' })
}

const MenuEditor = forwardRef(({ data, onDataChange }, ref) => {
    const [lastAddedCategory, setLastAddedCategory] = useState(null)
    const [lastAddedItem, setLastAddedItem] = useState({cat: null, item: null})
    const categoryNameRefs = useRef([])
    const itemNameRefs = useRef({})
    const lastCategoryRef = useRef(null)
    const lastItemRefs = useRef({})
    const prevCategoriesCount = useRef(data.categories?.length || 0)
    const prevItemsCount = useRef([])

    // Expose scrollToFirstCategory
    useImperativeHandle(ref, () => ({
        scrollToFirstCategory: () => {
            if (categoryNameRefs.current[0]) {
                categoryNameRefs.current[0].focus()
                categoryNameRefs.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }))

    // Initialiser le tableau des items précédents
    useEffect(() => {
        prevItemsCount.current = data.categories?.map(cat => cat.items?.length || 0) || []
    }, [data.categories])

    // Scroll sur la dernière catégorie ajoutée
    useEffect(() => {
        if (data.categories?.length > prevCategoriesCount.current) {
            lastCategoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        prevCategoriesCount.current = data.categories?.length || 0
    }, [data.categories])

    // Scroll sur le dernier plat ajouté dans chaque catégorie
    useEffect(() => {
        data.categories?.forEach((cat, i) => {
            if ((cat.items?.length || 0) > (prevItemsCount.current[i] || 0)) {
                if (lastItemRefs.current[i]) {
                    lastItemRefs.current[i].scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }
        })
        prevItemsCount.current = data.categories?.map(cat => cat.items?.length || 0) || []
    }, [data.categories])

    // Focus/scroll sur la catégorie ajoutée
    useEffect(() => {
        if (lastAddedCategory !== null && categoryNameRefs.current[lastAddedCategory]) {
            categoryNameRefs.current[lastAddedCategory].focus()
            scrollToElementSmoothly(categoryNameRefs.current[lastAddedCategory], -100)
            setLastAddedCategory(null)
        }
    }, [data.categories, lastAddedCategory])

    // Focus/scroll sur le plat ajouté
    useEffect(() => {
        if (
            lastAddedItem.cat !== null &&
            lastAddedItem.item !== null &&
            itemNameRefs.current[lastAddedItem.cat] &&
            itemNameRefs.current[lastAddedItem.cat][lastAddedItem.item]
        ) {
            itemNameRefs.current[lastAddedItem.cat][lastAddedItem.item].focus()
            scrollToElementSmoothly(itemNameRefs.current[lastAddedItem.cat][lastAddedItem.item], -100)
            setLastAddedItem({cat: null, item: null})
        }
    }, [data.categories, lastAddedItem])

    // Fonction pour mettre à jour une valeur dans les données
    const updateData = (path, newValue) => {
        const newData = { ...data }
        const keys = path.split('.')
        let current = newData

        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]]
        }

        current[keys[keys.length - 1]] = newValue
        onDataChange(newData)
    }

    // Fonction pour supprimer un item
    const removeItem = (categoryIndex, itemIndex) => {
        const newData = { ...data }
        newData.categories[categoryIndex].items.splice(itemIndex, 1)
        onDataChange(newData)
    }

    // Fonction pour supprimer une catégorie
    const removeCategory = (categoryIndex) => {
        const newData = { ...data }
        newData.categories.splice(categoryIndex, 1)
        onDataChange(newData)
    }

    // Fonction pour ajouter un item
    const addItem = (categoryIndex) => {
        const newData = { ...data }
        newData.categories[categoryIndex].items.push({
            name: '',
            description: '',
            price: ''
        })
        onDataChange(newData)
        setLastAddedItem({cat: categoryIndex, item: newData.categories[categoryIndex].items.length - 1})
    }

    // Fonction pour ajouter une catégorie
    const addCategory = () => {
        const newData = { ...data }
        newData.categories.push({
            name: '',
            items: []
        })
        onDataChange(newData)
        setLastAddedCategory(newData.categories.length - 1)
    }

        return (
        <div className="space-y-6">
                        <div className="space-y-8">
                {/* En-tête avec bouton d'ajout */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Menu détecté par l'IA</h2>
                        <p className="text-gray-600 mt-1">Modifiez et ajustez les informations détectées</p>
                    </div>
                    <Button onClick={addCategory} className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle catégorie
                    </Button>
                </div>

                {/* Liste des catégories */}
                <div className="space-y-6">
                    {data.categories?.map((category, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                            ref={categoryIndex === data.categories.length - 1 ? lastCategoryRef : null}
                        >
                            {/* En-tête de catégorie */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex-1 mr-4">
                                    <Input
                                        value={category.name || ''}
                                        onChange={(e) => updateData(`categories.${categoryIndex}.name`, e.target.value)}
                                        placeholder="Nom de la catégorie (obligatoire)"
                                        className="text-lg font-semibold border-0 border-b-2 border-gray-300 focus:border-green-500 px-0 py-2 rounded-none"
                                        ref={el => categoryNameRefs.current[categoryIndex] = el}
                                        required
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeCategory(categoryIndex)}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                </Button>
                            </div>

                            {/* Liste des plats */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-700">Plats</h3>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => addItem(categoryIndex)}
                                        className="text-green-600 border-green-200 hover:bg-green-50"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Ajouter un plat
                                    </Button>
                                </div>

                                {category.items?.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                                        ref={
                                            itemIndex === category.items.length - 1
                                                ? el => (lastItemRefs.current[categoryIndex] = el)
                                                : null
                                        }
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {/* Nom du plat */}
                                            <div className="col-span-2">
                                                <label className="text-sm font-medium text-gray-700 mb-2 block">Nom du plat</label>
                                                <Input
                                                    value={item.name || ''}
                                                    onChange={(e) => updateData(`categories.${categoryIndex}.items.${itemIndex}.name`, e.target.value)}
                                                    placeholder="Nom du plat (obligatoire)"
                                                    className="bg-white"
                                                    ref={el => {
                                                        if (!itemNameRefs.current[categoryIndex]) itemNameRefs.current[categoryIndex] = []
                                                        itemNameRefs.current[categoryIndex][itemIndex] = el
                                                    }}
                                                    required
                                                />
                                            </div>

                                            {/* Prix */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-2 block">Prix (€)</label>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={
                                                        item.price && typeof item.price === 'string'
                                                            ? item.price.replace(/[^0-9.,-]/g, '').replace(',', '.')
                                                            : item.price !== undefined && item.price !== null && item.price !== ''
                                                                ? String(item.price)
                                                                : ''
                                                    }
                                                    onChange={(e) => updateData(`categories.${categoryIndex}.items.${itemIndex}.price`, e.target.value)}
                                                    placeholder="Prix (obligatoire)"
                                                    className="bg-white"
                                                    required
                                                />
                                            </div>

                                            {/* Bouton supprimer */}
                                            <div className="flex items-end">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => removeItem(categoryIndex, itemIndex)}
                                                    className="text-red-600 border-red-200 hover:bg-red-50 w-full"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mt-4">
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                                            <Textarea
                                                value={item.description || ''}
                                                onChange={(e) => updateData(`categories.${categoryIndex}.items.${itemIndex}.description`, e.target.value)}
                                                placeholder="Description du plat (optionnel)"
                                                className="bg-white"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

MenuEditor.displayName = 'MenuEditor'
export default MenuEditor
