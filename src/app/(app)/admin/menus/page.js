'use client'

import { useFindAllMenusByRestaurantId } from '@/services/menus/useFindAllMenusByRestaurantId'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

// import { useAuth } from '@/hooks/auth'

const Menus = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()

    const { menus, isLoading, isFetching } = useFindAllMenusByRestaurantId(
        user?.restaurant?.id,
    )

    if (isLoading || isFetching) {
        return null
        // <div className="flex flex-col gap-4 bg-white p-4 h-full">
        //     <p>Vos menus</p>
        //     <Skeleton className="h-10 w-full" />
        //     <Skeleton className="h-10 w-full" />
        //     <Skeleton className="h-10 w-full" />
        //     <Skeleton className="h-10 w-full" />
        // </div>
        // <Skeleton className="h-full w-full" />
    }

    router.push(`/admin/menu/${menus[0].id}`)

    return null
    // (
    //     <>
    //         <div>
    //             <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    //                 <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    //                     <div className="p-6 bg-white border-b border-gray-200">
    //                         <div className="flex flex-col flex-wrap gap-4">
    //                             <Link href="/admin/menus" asChild>
    //                                 <div className="h-fit shadow-md border border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer">
    //                                     <ChefHat
    //                                         size={16}
    //                                         className="text-slate-900"
    //                                     />
    //                                     <div className="flex flex-col">
    //                                         <p className="text-sm text-slate-900 font-semibold">
    //                                             Catégories
    //                                         </p>
    //                                         <p className="text-xs font-medium text-slate-600 leading-5">
    //                                             Gérer les catégories du menu
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                             </Link>
    //                             <Link href="/admin/menus" asChild>
    //                                 <div className="h-fit shadow-md border border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer">
    //                                     <ChefHat
    //                                         size={16}
    //                                         className="text-slate-900"
    //                                     />
    //                                     <div className="flex flex-col">
    //                                         <p className="text-sm text-slate-900 font-semibold">
    //                                             Élements
    //                                         </p>
    //                                         <p className="text-xs font-medium text-slate-600 leading-5">
    //                                             Gérer les élements du menu
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                             </Link>
    //                             <Link href="/admin/menus" asChild>
    //                                 <div className="h-fit shadow-md border border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer">
    //                                     <ChefHat
    //                                         size={16}
    //                                         className="text-slate-900"
    //                                     />
    //                                     <div className="flex flex-col">
    //                                         <p className="text-sm text-slate-900 font-semibold">
    //                                             Apparence
    //                                         </p>
    //                                         <p className="text-xs font-medium text-slate-600 leading-5">
    //                                             Changer l'apparence du menu
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                             </Link>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
}

export default Menus
