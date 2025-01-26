import { XMarkIcon } from "@heroicons/react/24/solid"
import PropTypes from 'prop-types'

const OrderCard = ({ product, onRemove }) => {

    let renderXMarkIcon;

    if (onRemove) {
        renderXMarkIcon = <XMarkIcon className="h-6 w-6 text-black cursor-pointer hover:text-red-500" onClick={onRemove} />
    }
    return (
        <div className="flex justify-between items-center w-full p-2 border-b border-gray-200">
            <figure className="w-16 h-16">
                <img className="w-full h-full rounded-lg object-cover" src={product.images[0]} alt={product.title} />
            </figure>

            <div className="flex flex-col flex-1 px-4">
                <p className="text-sm font-light truncate w-36">{product.title}</p>
                <p className="text-xs text-gray-500">Cantidad: {product.quantity}</p>
            </div>
            <div className="flex items-center">
                <p className="text-lg font-medium mr-4">${product.price * product.quantity}</p>
                {renderXMarkIcon}
            </div>

        </div>
    );
};

OrderCard.propTypes = {
    product: PropTypes.object.isRequired,
    onRemove: PropTypes.func
}

export default OrderCard

