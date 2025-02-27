import MenuItem from "./MenuItem"

const MenuCategory = ({ categoryData, activeLanguage, sectionRef }) => {
    return (
        <div>
            <div id={categoryData.category.id} ref={sectionRef}>
                <p className="text-lg font-bold mb-3">
                    {categoryData.category.name?.[activeLanguage]}
                </p>
                <div className="flex flex-col gap-y-3">
                    {categoryData.items?.map(item => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            activeLanguage={activeLanguage}
                        />
                    ))}
                </div>
                <div className="w-full h-px bg-slate-200 my-5" />
            </div>
        </div>
    )
}

export default MenuCategory
