import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils'
import './styles.css'

const CheckOutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const removeProductFromCart = (productId) => {
        const updatedCart = context.cartProducts.filter((product) => product.id !== productId);
        context.setCartProducts(updatedCart);

        // Actualizar el contador después de eliminar un producto
        const newCount = updatedCart.reduce((acc, product) => acc + product.quantity, 0);
        context.setCount(newCount);
    };

    const handleCheckout = () => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-ES');

        context.setFormattedDate(formattedDate)

        const orderToAdd = {
            date: formattedDate,
            products: context.cartProducts,
            totalProducts: context.cartProducts.reduce((acc, product) => acc + product.quantity, 0),
            totalPrice: totalPrice(context.cartProducts)

        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setCount(0)
        context.closeCheckoutSideMenu()
    }

    return (
        <aside
            className={`checkout-side-menu fixed right-0 bg-white shadow-lg border border-black rounded-lg transform transition-transform duration-300 ease-in-out ${context.isCheckoutSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My Order</h2>
                <XMarkIcon
                    className="h-6 w-6 text-black/60 hover:text-black cursor-pointer"
                    onClick={() => context.closeCheckoutSideMenu()}
                />
            </div>

            {/* Contenedor para el carrito con scroll */}
            <div className="overflow-y-auto max-h-[calc(100vh-160px)] px-4 pb-20">
                {context.cartProducts.map((product) => (
                    <OrderCard
                        key={product.id}
                        product={product}  /* Pasa el objeto completo */
                        onRemove={() => removeProductFromCart(product.id)}
                        orderDate={context.formattedDate}
                    />
                ))}
            </div>

            {/* Botón sticky al fondo */}
            <div className='px-6 sticky bottom-0 bg-white z-10'>
                <p className='flex justify-between items-center'>
                    <span className='font-light'>Total</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button className='w-full bg-black py-3 text-white cursor-pointer rounded-lg' onClick={() => handleCheckout()}>CheckOut</button>
                </Link>

            </div>
        </aside>


    )
}

export default CheckOutSideMenu
