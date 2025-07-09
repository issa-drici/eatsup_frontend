'use client'

import { cn } from '@/lib/utils'
import { AnimatedBeam } from '@/shadcn-components/ui/animated-beam'
import Image from 'next/image'
import { forwardRef, useRef } from 'react'

const Circle = forwardRef(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
                className,
            )}>
            {children}
        </div>
    )
})

Circle.displayName = 'Circle'

const AnimatedBeamFicheRestaurant = () => {
    const containerRef = useRef(null)
    const div1Ref = useRef(null)
    const div3Ref = useRef(null)
    const div4Ref = useRef(null)
    const div5Ref = useRef(null)
    const div7Ref = useRef(null)

    return (
        <div
            className="relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10"
            ref={containerRef}>
            <div className="flex size-full flex-col max-w-lg max-h-[550px] items-stretch justify-between gap-10">
                <div className="flex flex-row items-center justify-between">
                    <Image
                        ref={div1Ref}
                        src="/images/instagram.jpeg"
                        alt="instagram"
                        className="z-10 rounded-xl border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                        width={150}
                        height={150}
                    />
                    <Image
                        ref={div5Ref}
                        src="/images/gmb.jpeg"
                        alt="google-my-business"
                        className="z-10 rounded-xl border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                        width={150}
                        height={150}
                    />
                </div>
                 <div className="flex flex-row items-center justify-center">
                    <Image
                        ref={div4Ref}
                        src="/images/menu.jpeg"
                        alt="menu"
                        className="z-10 rounded-xl border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                        width={250}
                        height={250}
                    />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Image
                        ref={div3Ref}
                        src="/images/storefront.jpeg"
                        alt="storefront"
                        className="z-10 rounded-xl border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                        width={150}
                        height={150}
                    />
                    <Image
                        ref={div7Ref}
                        src="/images/facebook.jpeg"
                        alt="facebook"
                        className="z-10 rounded-xl border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                        width={150}
                        height={150}
                    />
                </div>
            </div>

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div4Ref}
                curvature={-150}
                endYOffset={-10}
            />
            {/* <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div4Ref}
            /> */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={150}
                endYOffset={10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-150}
                endYOffset={-10}
                reverse
            />
            {/* <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
            /> */}
             <AnimatedBeam
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={150}
                endYOffset={10}
                reverse
            />
        </div>
    )
}

export default AnimatedBeamFicheRestaurant
