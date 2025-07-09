const Button = ({ type = 'submit', className, isLoading, ...props }) => {
    if (isLoading) {
        return (
            <Button disabled>
                {/* <Loader2 className="animate-spin" />
                Please wait */}
            </Button>
        )
    }
    return (
        <button
            type={type}
            className={`${className} inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
            {...props}
        />
    )
}

export default Button
