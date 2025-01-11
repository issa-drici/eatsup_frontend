import { Skeleton } from '@/shadcn-components/ui/skeleton'

export default function CardStats({
    title,
    value,
    icon,
    subtitle,
    isLoading,
    // progression,
}) {
    return (
        <div className="rounded-xl border bg-slate-50 text-card-foreground w-full">
            <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-0">
                <div className="tracking-tight text-sm font-medium">
                    {title}
                </div>
                {icon && !subtitle && icon}
            </div>
            {subtitle && (
                <div className="pb-1 px-4">
                    <p className="text-xs text-slate-400">{subtitle}</p>
                </div>
            )}
            <div className="flex flex-row items-center justify-between p-4 pt-2">
                {isLoading ? (
                    <Skeleton className="h-10 w-28" />
                ) : (
                    <div className="text-2xl font-bold">{value}</div>
                )}
                {icon && !!subtitle && icon}
                {/* {progression && (
                    <p className="text-xs text-muted-foreground">
                        {progression}
                    </p>
                )} */}
            </div>
        </div>
    )
}
