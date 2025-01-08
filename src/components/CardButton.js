import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default function CardButton({
    title,
    icon,
    subtitle,
    url,
    widthFull,
    disabled,
    rightLabel,
    ...props
}) {
    if (disabled) {
        return (
            <div
                className={cn(
                    'relative h-fit shadow-md border bg-slate-100 cursor-not-allowed border-slate-200 rounded-md p-3 flex flex-col gap-3',
                    widthFull && 'w-full',
                )}>
                <div>
                    {icon}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white border border-slate-200 rounded-md px-2 py-1">
                        <Lock size={16} className="text-slate-900" />
                        <p className="text-xs text-slate-900 font-medium">
                            Premium
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-slate-600 font-semibold">
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
                    'group relative overflow-hidden h-fit shadow-md border bg-white hover:shadow-inner border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer',
                    widthFull && 'w-full',
                )}>
                {icon}
                <div className="flex flex-col">
                    <p className="text-sm text-slate-900 font-semibold">
                        {title}
                    </p>
                    <p className="text-xs font-light text-slate-500 leading-5">
                        {subtitle}
                    </p>
                </div>
                {rightLabel ? (
                    <div className="absolute top-0 right-0 bottom-0 w-7 flex items-center justify-center bg-slate-500 group-hover:bg-slate-400">
                        <div className="-rotate-90 text-[10px] font-bold text-white">
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
                'group relative overflow-hidden h-fit shadow-md border bg-white hover:shadow-inner border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer',
                widthFull && 'w-full',
            )}>
            {icon}
            <div className="flex flex-col">
                <p className="text-sm text-slate-900 font-semibold">
                    {title}
                </p>
                <p className="text-xs font-light text-slate-500 leading-5">
                    {subtitle}
                </p>
            </div>
            {rightLabel ? (
                <div className="absolute top-0 right-0 bottom-0 w-7 flex items-center justify-center bg-slate-500 group-hover:bg-slate-400">
                    <div className="-rotate-90 text-[10px] font-bold text-white">
                        {rightLabel}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
