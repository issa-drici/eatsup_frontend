'use client'

import { Card } from '@/shadcn-components/ui/card'
import Image from 'next/image'
import { useState } from 'react'
import MenuItemDialog from './MenuItemDialog'

const MenuItem = ({ item, activeLanguage }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <Card 
                className="overflow-hidden flex p-0 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setIsDialogOpen(true)}
            >
                {item.images?.[0] && (
                    <Image
                        src={item.images[0]}
                        alt="imagePlat"
                        className="w-32 h-32 object-cover"
                        width={100}
                        height={100}
                    />
                )}
                <div className="flex flex-col p-4 gap-1">
                    <div>
                        <p className="text-sm font-medium text-slate-900">
                            {item.name[activeLanguage]}
                        </p>
                    </div>
                    {item.description?.[activeLanguage] && (
                        <p className="text-sm text-[#64748B]">
                            {item.description[activeLanguage]}
                        </p>
                    )}
                    <p className="text-sm text-[#64748B]">{item.price} €</p>
                </div>
            </Card>

            <MenuItemDialog 
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                item={item}
                activeLanguage={activeLanguage}
            />
        </>
    )
}

export default MenuItem 