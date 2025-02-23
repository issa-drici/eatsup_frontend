import { cn } from '@/lib/utils'
import { Badge } from '@/shadcn-components/ui/badge'
import { Button } from '@/shadcn-components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({
    slug,
    image,
    category,
    title,
    description,
    date,
    vertical,
}) => {
    return (
        <Link
            href={`/blog/${slug}`}
            className={cn(
                'flex flex-col gap-4 bg-white rounded-lg overflow-hidden shadow-lg md:flex-row',
                vertical && 'md:flex-col',
            )}>
            {/* Conteneur Image */}
            <div
                className={cn(
                    'relative w-full md:w-[400px] min-h-[250px]',
                    vertical && 'md:w-full md:h-[300px]',
                )}>
                <Image src={image} alt={title} fill className="object-cover" />
            </div>

            {/* Conteneur Texte */}
            <div
                className={cn(
                    'flex-1 flex flex-col gap-2 bg-white p-6 md:px-10 md:pt-10 pb-4',
                    vertical && 'p-6',
                )}>
                <Badge variant="secondary" className="w-fit">
                    {category}
                </Badge>
                <h2
                    className={cn(
                        'text-slate-950 text-2xl font-semibold md:text-2xl text-left',
                        vertical && 'text-xl',
                    )}>
                    {title}
                </h2>
                <p className="hidden md:block text-slate-700 text-sm text-center font-light md:text-lg md:text-left">
                    {description}
                </p>
                <div className="flex justify-between mt-4">
                    <p className="text-slate-500 text-sm font-light">{date}</p>
                    <Button variant="link">Lire la suite &rarr;</Button>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
