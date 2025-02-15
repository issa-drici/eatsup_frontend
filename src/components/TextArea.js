const TextArea = ({ disabled = false, className, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} rounded-md shadow-sm bg-slate-50 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-slate-300`}
        {...props}
    />
)

export default TextArea
