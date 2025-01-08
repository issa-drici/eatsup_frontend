import Image from 'next/image'

const Loading = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#fffafc]">
            <Image
                src="/images/loader.gif"
                className="h-30 object-contain mb-2"
                alt="Loading"
                width={800}
                height={600}
            />
        </div>
        // <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        //     Chargement...

        // </div>
    )
}

export default Loading
