import { Input as InputShacn } from "@/shadcn-components/ui/input"

const Input = ({ disabled = false, className, ...props }) => (
    <InputShacn
        disabled={disabled}
        className={`${className} bg-slate-50 rounded-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-slate-300`}
        {...props}
    />
)

export default Input
