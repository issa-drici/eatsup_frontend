import { Button } from "@/shadcn-components/ui/button"

const CategoryBar = ({ menuItems, activeSection, scrollToSection, activeLanguage }) => {
    return (
        <div
            className="flex px-3 py-2 gap-x-1 sticky z-40 bg-slate-100 shadow-md mb-3 overflow-x-scroll"
            style={{ top: 'var(--titlebar-height, 36px)' }}
            id="categoryBar">
            {menuItems.map(({ category }) => (
                <Button
                    key={category.id}
                    className="px-2 py-1 h-fit"
                    variant={activeSection === category.id ? 'default' : 'white'}
                    onClick={() => scrollToSection(category.id)}>
                    {category.name[activeLanguage]}
                </Button>
            ))}
        </div>
    )
}

export default CategoryBar 