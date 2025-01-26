import { ChevronRightIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

const OrdersCard = ({ totalPrice, totalProducts, orderDate }) => {
    return (
        <div className="flex justify-between items-center w-full p-6 border-b border-gray-300 rounded-lg shadow-xl hover:shadow-2xl transition-all max-w-md mx-auto mb-6">
            {/* Información de la fecha */}
            <div className="flex flex-col items-start">
                <span className="font-semibold text-lg text-gray-800">{orderDate}</span>

                {/* Total de productos debajo de la fecha */}
                <span className="font-light text-sm text-gray-600">Productos: {totalProducts}</span>
            </div>

            {/* Información de precio y icono */}
            <div className="flex flex-col items-end ml-4">
                <div className="flex items-center space-x-4">
                    <span className="font-semibold text-xl text-black">${totalPrice}</span>
                    <ChevronRightIcon className="h-8 w-8 text-gray-600 cursor-pointer hover:text-black" />
                </div>
            </div>
        </div>
    )
}

OrdersCard.propTypes = {
    totalPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    totalProducts: PropTypes.number.isRequired,
    orderDate: PropTypes.string.isRequired, // Asegúrate de pasar la fecha como prop
}

export default OrdersCard
