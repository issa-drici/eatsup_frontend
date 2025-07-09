import { cn } from '@/lib/utils'
import { Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CardButton({
    title,
    icon,
    subtitle,
    url,
    widthFull,
    disabled,
    rightLabel,
    badge,
    badgeColor = "blue",
    ...props
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

    if (disabled) {
        return (
            <div
                className={cn(
                    'relative h-fit shadow-md border bg-slate-100 cursor-not-allowed border-slate-200 rounded-lg p-3 md:p-4 flex flex-col gap-2 md:gap-3 transition-all',
                    widthFull && 'w-full',
                )}>
                <div className="flex items-center justify-between">
                    {icon}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1">
                        <Lock size={14} className="md:w-4 md:h-4 text-slate-900" />
                        <p className="text-xs text-slate-900 font-medium">
                            Premium
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm md:text-sm text-slate-600 font-semibold">
                        {title}
                    </p>
                    <p className="text-xs font-light text-slate-400 leading-5">
                        {subtitle}
                    </p>
                </div>
            </div>
        )
    }

    return url ? (
        <Link href={url} className={cn(widthFull && 'w-full')} asChild>
            <div
                className={cn(
                    'group relative overflow-hidden h-fit shadow-sm border bg-white hover:shadow-md hover:border-gray-300 border-gray-200 rounded-xl p-3 md:p-4 flex flex-col gap-2 md:gap-3 cursor-pointer transition-all duration-200',
                    widthFull && 'w-full',
                )}>
                <div className="flex items-center justify-between">
                    {icon}
                    <div className="flex items-center gap-2">
                        {badge && (
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColorClasses(badgeColor)}`}>
                                {badge}
                            </span>
                        )}
                        <ArrowRight size={14} className="md:w-4 md:h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm md:text-sm text-gray-900 font-semibold group-hover:text-gray-700 transition-colors">
                        {title}
                    </p>
                    <p className="text-xs font-light text-gray-500 leading-5">
                        {subtitle}
                    </p>
                </div>
                {rightLabel ? (
                    <div className="absolute top-0 right-0 bottom-0 w-6 md:w-7 flex items-center justify-center bg-slate-500 group-hover:bg-slate-400 transition-colors">
                        <div className="-rotate-90 text-[8px] md:text-[10px] font-bold text-white">
                            {rightLabel}
                        </div>
                    </div>
                ) : null}
            </div>
        </Link>
    ) : (
        <div
            {...props}
            className={cn(
                'group relative overflow-hidden h-fit shadow-sm border bg-white hover:shadow-md hover:border-gray-300 border-gray-200 rounded-lg p-3 md:p-4 flex flex-col gap-2 md:gap-3 cursor-pointer transition-all duration-200',
                widthFull && 'w-full',
            )}>
            <div className="flex items-center justify-between">
                {icon}
                <div className="flex items-center gap-2">
                    {badge && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColorClasses(badgeColor)}`}>
                            {badge}
                        </span>
                    )}
                    <ArrowRight size={14} className="md:w-4 md:h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-sm md:text-sm text-gray-900 font-semibold group-hover:text-gray-700 transition-colors">
                    {title}
                </p>
                <p className="text-xs font-light text-gray-500 leading-5">
                    {subtitle}
                </p>
            </div>
            {rightLabel ? (
                <div className="absolute top-0 right-0 bottom-0 w-6 md:w-7 flex items-center justify-center bg-slate-500 group-hover:bg-slate-400 transition-colors">
                    <div className="-rotate-90 text-[8px] md:text-[10px] font-bold text-white">
                        {rightLabel}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
