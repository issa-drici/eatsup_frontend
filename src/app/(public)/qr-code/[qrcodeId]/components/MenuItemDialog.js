import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shadcn-components/ui/dialog'
import Image from 'next/image'

const MenuItemDialog = ({ isOpen, onClose, item, activeLanguage }) => {
    if (!item) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xs md:max-w-md rounded-md">
                <DialogHeader>
                    <DialogTitle>{item.name[activeLanguage]}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {item.images?.[0] && (
                        <div className="relative w-full h-48">
                            <Image
                                src={item.images[0]}
                                alt={item.name[activeLanguage]}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                    )}
                    
                    {item.description?.[activeLanguage] && (
                        <div>
                            <h3 className="text-sm font-semibold mb-1">Description</h3>
                            <p className="text-sm text-slate-600">
                                {item.description[activeLanguage]}
                            </p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-semibold mb-1">Prix</h3>
                        <p className="text-sm text-slate-600">{item.price} €</p>
                    </div>

                    {item.allergens && (
                        <div>
                            <h3 className="text-sm font-semibold mb-1">Allergènes</h3>
                            <p className="text-sm text-slate-600">{item.allergens}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MenuItemDialog 