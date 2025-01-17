'use client'

import { Dialog, DialogContent } from '@/shadcn-components/ui/dialog'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const MenuItemDialog = ({ isOpen, onClose, item, activeLanguage }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const hasMultipleImages = item.images && item.images.length > 1
    const imageContainerRef = useRef(null)

    // Minimum distance for a swipe (in pixels)
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            nextImage()
        }
        if (isRightSwipe) {
            previousImage()
        }
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === item.images.length - 1 ? 0 : prev + 1
        )
    }

    const previousImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? item.images.length - 1 : prev - 1
        )
    }

    // Reset currentImageIndex when dialog opens
    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0)
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[380px] p-0 gap-0 rounded-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-50 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 transition-colors"
                >
                    <X size={20} />
                </button>
                
                {item.images && item.images.length > 0 && (
                    <div 
                        ref={imageContainerRef}
                        className="relative w-full aspect-square"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <Image
                            src={item.images[currentImageIndex].url}
                            alt={item.name[activeLanguage]}
                            fill
                            className="object-cover"
                        />
                        {hasMultipleImages && (
                            <>
                                <button
                                    onClick={previousImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                    {item.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                index === currentImageIndex 
                                                    ? 'bg-white' 
                                                    : 'bg-white/50'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
                <div className="p-6 space-y-2">
                    <h3 className="font-medium text-lg">
                        {item.name[activeLanguage]}
                    </h3>
                    {item.description?.[activeLanguage] && (
                        <p className="text-sm text-gray-600">
                            {item.description[activeLanguage]}
                        </p>
                    )}
                    <p className="text-sm font-medium">{item.price} €</p>
                    {item.allergens && (
                        <p className="text-sm text-gray-500">
                            <span className="font-medium">Allergènes : </span>
                            {item.allergens}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MenuItemDialog 