const TitleBar = () => {
    return (
        <div
            className="flex justify-between items-center py-1 pl-3 pr-3 sticky top-0 z-50 bg-white"
            id="titleBar">
            <div className="flex items-center gap-x-0.5">
                <p className="text-lg font-semibold">Mon restaurant</p>
            </div>
        </div>
    )
}

export default TitleBar 