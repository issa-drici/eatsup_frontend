import Image from "next/image"

const ApplicationLogo = props => (
    <Image
        src="/images/logo.png"
        alt="Logo Eatsup"
        width={148}
        height={17}
        {...props}
    />
)

export default ApplicationLogo
