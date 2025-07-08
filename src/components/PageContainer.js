import { cn } from '@/lib/utils'

const PageContainer = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "w-full space-y-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export default PageContainer
