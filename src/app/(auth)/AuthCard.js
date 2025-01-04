const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center pt-6 px-4 sm:px-0 ">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-10 px-6 py-4 bg-white shadow-md border border-gray-200 overflow-hidden rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
