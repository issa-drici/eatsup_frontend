import Image from "next/image"

const ApplicationLogo = props => (
    <Image
        src="/images/logo.png"
        alt="Logo Eatsup"
        width={593}
        height={68}
        {...props}
    />
)

export default ApplicationLogo
