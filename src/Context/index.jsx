import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
    // Estados
    const [count, setCount] = useState(0)
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const [productToShow, setProductToShow] = useState({})
    const [cartProducts, setCartProducts] = useState([])
    const [order, setOrder] = useState([])
    const [formattedDate, setFormattedDate] = useState(null)

    // Productos y filtros
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [searchByTitle, setSearchByTitle] = useState("")
    const [searchByCategory, setSearchByCategory] = useState("")

    // Obtener productos de la API
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => setItems(data))
    }, [])

    // Funciones de filtrado
    const filterItems = () => {
        let filtered = [...items]

        if (searchByCategory) {
            filtered = filtered.filter(item =>
                item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
            )
        }

        if (searchByTitle) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchByTitle.toLowerCase())
            )
        }

        setFilteredItems(filtered.length > 0 ? filtered : []);
    }

    // Actualizar `filteredItems` cada vez que cambia la búsqueda
    useEffect(() => {
        filterItems()
    }, [items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail: () => setIsProductDetailOpen(true),
            closeProductDetail: () => setIsProductDetailOpen(false),
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu: () => setIsCheckoutSideMenuOpen(true),
            closeCheckoutSideMenu: () => setIsCheckoutSideMenuOpen(false),
            order,
            setOrder,
            formattedDate,
            setFormattedDate,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired
}
