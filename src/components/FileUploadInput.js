'use client'

import { Button } from '@/shadcn-components/ui/button'
import Input from '@/components/Input'
import Image from 'next/image'
import { X } from 'lucide-react'

export const FileUploadInput = ({
    value,
    onChange,
    onRemove,
    existingImages = [],
    accept = "image/*",
    maxSize = "2MB",
    id = "file-upload",
    multiple = false
}) => {
    const hasFiles = multiple ? 
        ((Array.isArray(value) && value.length > 0) || existingImages.length > 0) : 
        (value || (existingImages.length > 0))

    const handleChange = (e) => {
        if (multiple) {
            const newFiles = Array.from(e.target.files || [])
            onChange(newFiles)
        } else {
            onChange(e.target.files?.[0])
        }
    }

    // Détermine la source de l'image pour le mode single
    const getSingleImageSrc = () => {
        if (value instanceof File) {
            return URL.createObjectURL(value)
        }
        if (value) {
            return value
        }
        if (existingImages.length > 0) {
            return existingImages[0].url
        }
        return null
    }

    // Détermine si on doit afficher les contrôles de suppression en mode single
    const showSingleRemoveControls = !multiple && (value || existingImages.length > 0)

    return (
        <div className="space-y-4">
            <label 
                htmlFor={id}
                className={`group relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${multiple ? 'h-40' : 'h-64'}`}
            >
                {!multiple && hasFiles ? (
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={getSingleImageSrc()}
                            alt="File preview"
                            fill
                            className="object-contain p-4"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all items-center justify-center hidden md:flex rounded-lg">
                            <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="font-semibold">Cliquez pour changer</p>
                                <p className="text-sm">ou glissez une nouvelle image</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-6">
                        <svg className="w-8 h-8 mb-3 text-gray-500 group-hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 group-hover:text-gray-600">
                            <span className="font-semibold">
                                <span className="hidden md:inline">Cliquez pour uploader</span>
                                <span className="md:hidden">Touchez pour uploader</span>
                            </span>
                            <span className="hidden md:inline"> ou glissez-déposez</span>
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-600">
                            {accept.replace('image/*', 'PNG, JPG')} (MAX. {maxSize})
                            {multiple && " - Sélection multiple possible"}
                        </p>
                    </div>
                )}
                <Input
                    id={id}
                    type="file"
                    onChange={handleChange}
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                />
            </label>

            {/* Prévisualisations pour le mode multiple */}
            {multiple && (existingImages.length > 0 || (Array.isArray(value) && value.length > 0)) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {/* Images existantes */}
                    {existingImages.map((image, index) => (
                        <div key={`existing-${image.id}`} className="relative aspect-square rounded-lg border overflow-hidden group hover:shadow-lg transition-all duration-200 bg-white">
                            <Image
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => onRemove({ type: 'existing', id: image.id, index })}
                                className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-full text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    
                    {/* Nouvelles images */}
                    {Array.isArray(value) && value.map((file, index) => (
                        <div key={`new-${index}`} className="relative aspect-square rounded-lg border overflow-hidden group hover:shadow-lg transition-all duration-200 bg-white">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={`Nouvelle image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => onRemove({ type: 'new', index })}
                                className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-full text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Contrôles mobile uniquement pour le mode single */}
            {showSingleRemoveControls && (
                <div className="flex flex-col gap-2 md:hidden">
                    <p className="text-sm text-slate-600 text-center">
                        Touchez l'image pour la changer
                    </p>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => onRemove({ type: 'existing', id: existingImages[0]?.id })}
                    >
                        Supprimer le fichier
                    </Button>
                </div>
            )}
            
            {/* Compteur de fichiers pour le mode multiple */}
            {multiple && (existingImages.length > 0 || (Array.isArray(value) && value.length > 0)) && (
                <p className="text-sm text-gray-500">
                    {`${existingImages.length + (Array.isArray(value) ? value.length : 0)} image(s) sélectionnée(s)`}
                </p>
            )}
        </div>
    )
} 