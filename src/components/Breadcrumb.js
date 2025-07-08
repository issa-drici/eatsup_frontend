import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb = ({ items = [] }) => {
    if (!items || items.length === 0) return null

    return (
        <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
            <Link
                href="/admin/dashboard"
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
            >
                <Home size={14} />
                <span>Accueil</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight size={14} className="mx-1" />
                    {index === items.length - 1 ? (
                        <span className="text-gray-900 font-medium">{item.title}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-gray-700 transition-colors"
                        >
                            {item.title}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    )
}

export default Breadcrumb
