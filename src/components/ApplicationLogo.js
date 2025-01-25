import Image from "next/image"

const ApplicationLogo = props => (
    <Image
        src="/images/logo.png"
        alt="Logo Eatsup"
        width={300}
        height={43}
        {...props}
    />
)

export default ApplicationLogo
