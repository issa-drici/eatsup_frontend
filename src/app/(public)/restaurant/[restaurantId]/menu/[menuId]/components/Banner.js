'use client'

import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/shadcn-components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const Banner = ({ banners }) => {
    if (!banners || banners.length === 0) return null

    if (banners.length === 1) {
        return (
            <div className="w-full h-[30vh] relative md:rounded-lg md:overflow-hidden">
                <Image
                    key={banners[0].id}
                    src={banners[0].url}
                    alt="Banner"
                    className="object-cover"
                    priority
                    fill
                />
            </div>
        )
    }

    return (
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className="w-full h-[30vh] md:rounded-lg md:overflow-hidden">
            <CarouselContent className="h-full">
                {banners.map((banner, index) => (
                    <CarouselItem
                        className="w-full h-[30vh] relative"
                        key={index}>
                        <Image
                            key={banner.id}
                            src={banner.url}
                            alt={`Banner ${index + 1}`}
                            className="object-cover"
                            priority
                            fill
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default Banner
