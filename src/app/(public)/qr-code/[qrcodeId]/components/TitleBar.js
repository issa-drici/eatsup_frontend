import Image from 'next/image'
import { useEffect } from 'react'

const TitleBar = ({ restaurant }) => {
    useEffect(() => {
        const titleBar = document.getElementById('titleBar')
        if (titleBar) {
            document.documentElement.style.setProperty('--titlebar-height', `${titleBar.offsetHeight}px`)
        }
    }, [restaurant?.logo?.url])

    return (
        <div
            className={`flex justify-between items-center sticky top-0 z-50 bg-white ${
                restaurant?.logo?.url ? 'py-2' : 'py-1'
            } pl-3 pr-3`}
            id="titleBar">
            <div className="flex items-center gap-2">
                {restaurant?.logo?.url && (
                    <Image
                        src={restaurant.logo?.url}
                        alt={`Logo ${restaurant.name}`}
                        width={200}
                        height={200}
                        className="h-10 w-auto object-contain"
                    />
                )}
                <p className="text-lg font-semibold">
                    {restaurant?.name || 'Mon restaurant'}
                </p>
            </div>
        </div>
    )
}

export default TitleBar
