import Layout from '../../Components/Layout'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const MyOrder = () => {

    const context = useContext(ShoppingCartContext)
    // console.log('context.order', context.order)
    const currentPath = window.location.pathname
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)

    if (index === 'last') index = context.order?.length - 1

    return (
        <Layout>
            <div className='flex w-80 items-center justify-center relative mb-8'>
                <h1>My Order</h1>
                <Link to='/my-orders' className='absolute left-0'>
                    <ChevronLeftIcon className='h-6 w-6 text-black/60 hover:text-black cursor-pointer ' />
                </Link>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-160px)] px-4 pb-20">
                {
                    context.order?.[index]?.products.map((product) => (
                        <OrderCard
                            key={product.id}
                            product={product}  /* Pasa el objeto completo */
                        />
                    ))}
            </div>
        </Layout>
    )
}

export { MyOrder }