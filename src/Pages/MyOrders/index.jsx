import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import OrdersCard from '../../Components/OrdersCard'

const MyOrders = () => {
    const context = useContext(ShoppingCartContext)
    console.log('context.order', context.order)

    return (
        <Layout>
            <div className="flex w-full items-center justify-center py-4">
                <h1 className="text-2xl font-semibold">My Orders</h1>
            </div>

            <div className="flex flex-col gap-4 px-4">
                {context.order.map((order, index) => (
                    <Link key={index} to={`/my-orders/${index}`} className="w-full">
                        <OrdersCard
                            totalPrice={order.totalPrice}
                            totalProducts={order.totalProducts}
                            orderDate={order.date} // Asegúrate de pasar la fecha si la tienes
                        />
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

export { MyOrders }
