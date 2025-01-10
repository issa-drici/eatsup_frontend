import { Card } from "@/shadcn-components/ui/card"
import { Skeleton } from "@/shadcn-components/ui/skeleton"

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex py-3 px-3 gap-x-1 sticky top-9 z-40 bg-slate-100 shadow-md mb-3 overflow-x-scroll">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
            </div>
            {[...Array(3)].map((_, i) => (
                <div key={i} className="px-3">
                    <Skeleton className="h-6 w-32 mb-3" />
                    <Card className="overflow-hidden flex p-0">
                        <Skeleton className="w-32 h-32" />
                        <div className="flex flex-col p-4 gap-1 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default LoadingSkeleton 