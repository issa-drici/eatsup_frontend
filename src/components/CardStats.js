import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function CardStats({
    title,
    value,
    icon,
    subtitle,
    isLoading,
    trend,
    trendUp,
    badge,
    badgeColor = "blue"
}) {
    const getBadgeColorClasses = (color) => {
        const colors = {
            blue: "bg-blue-100 text-blue-800",
            green: "bg-green-100 text-green-800",
            orange: "bg-orange-100 text-orange-800",
            red: "bg-red-100 text-red-800",
            purple: "bg-purple-100 text-purple-800",
            gray: "bg-gray-100 text-gray-800"
        }
        return colors[color] || colors.blue
    }

    const getTrendColor = (isUp) => {
        return isUp ? "text-green-600" : "text-red-600"
    }

    return (
        <div className="rounded-xl border bg-white text-card-foreground w-full shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-0">
                <div className="tracking-tight text-sm font-medium text-gray-700">
                    {title}
                </div>
                {icon && !subtitle && icon}
            </div>
            {subtitle && (
                <div className="pb-1 px-4">
                    <p className="text-xs text-gray-500">{subtitle}</p>
                </div>
            )}
            <div className="flex flex-row items-center justify-between p-4 pt-2">
                {isLoading ? (
                    <Skeleton className="h-10 w-28" />
                ) : (
                    <div className="flex flex-col">
                        <div className="text-2xl font-bold text-gray-900">{value}</div>
                        {trend && (
                            <div className={`flex items-center gap-1 text-xs font-medium ${getTrendColor(trendUp)}`}>
                                {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {trend}
                            </div>
                        )}
                    </div>
                )}
                <div className="flex flex-col items-end gap-2">
                    {icon && !!subtitle && icon}
                    {badge && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColorClasses(badgeColor)}`}>
                            {badge}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
