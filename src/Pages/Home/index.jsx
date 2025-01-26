import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
    const context = useContext(ShoppingCartContext)

    const renderView = () => {
        const productsToShow =
            (context.searchByTitle || context.searchByCategory) && context.filteredItems.length > 0
                ? context.filteredItems
                : context.items

        return productsToShow.length > 0 ? (
            productsToShow.map(item => (
                item.images?.length > 0 &&
                item.images[0]?.startsWith('http') &&
                item.title?.length > 2 && (
                    <Card key={item.id} data={item} />
                )
            ))
        ) : (
            <p className="text-gray-500 text-center">No products found</p>
        )
    }

    return (
        <Layout>
            {/* Input de búsqueda con icono */}
            <div className="relative w-80 mb-4">
                <input
                    type="text"
                    placeholder="Search a product"
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    onChange={(event) => context.setSearchByTitle(event.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="absolute left-3 top-3 h-5 w-5 text-gray-500"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-1.65 1.65L21 21z" />
                </svg>
            </div>

            {/* Grid de productos */}
            <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
                {renderView()}
            </div>

            <ProductDetail />
        </Layout>
    )
}

export { Home }
