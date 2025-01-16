import Image from 'next/image'

const TitleBar = ({ restaurant }) => {
    return (
        <div
            className="flex justify-between items-center py-1 pl-3 pr-3 sticky top-0 z-50 bg-white"
            id="titleBar">
            <div className="flex items-center gap-2">
                {restaurant?.logo?.url && (
                    <Image
                        src={restaurant.logo?.url}
                        alt={`Logo ${restaurant.name}`}
                        width={200}
                        height={200}
                        className="h-14 w-auto object-contain rounded-md"
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
