import { PlusIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import PropTypes from 'prop-types'

const Card = ({ data }) => {
  const context = useContext(ShoppingCartContext)

  const showProduct = () => {
    context.openProductDetail()
    context.setProductToShow(data)
    context.closeCheckoutSideMenu()
  }

  const addProductsToCart = (e, productData) => {
    e.stopPropagation(); // Evita que el clic en el icono propague el evento y abra el detalle del producto

    context.setCartProducts(prevCart => {
      const existingProductIndex = prevCart.findIndex(product => product.id === productData.id);
      let updatedCart;

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
          totalPrice: (updatedCart[existingProductIndex].quantity + 1) * updatedCart[existingProductIndex].price
        };
      } else {
        // Si el producto no existe en el carrito, agregarlo con quantity: 1
        updatedCart = [
          ...prevCart,
          {
            ...productData,
            quantity: 1,
            totalPrice: productData.price,
            imageUrl: productData.images?.[0]
          }
        ];
      }

      // Actualizamos el contador usando el nuevo carrito actualizado
      context.setCount(updatedCart.reduce((acc, product) => acc + product.quantity, 0));

      return updatedCart;
    });

    // Abrir el Checkout SideMenu
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-80 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out p-4 flex flex-col"
      onClick={showProduct} // Mantener el click en la tarjeta para abrir el detalle
    >
      <figure className="relative mb-4 w-full flex-1 overflow-hidden rounded-lg">
        <span className="absolute bottom-0 left-0 bg-white/60 text-black text-xs m-2 px-3 py-1 rounded-lg">
          {data.category?.name}
        </span>
        <img className="w-full h-full object-cover rounded-lg" src={data.images?.[0]} alt={data.title} />
        <div className="absolute top-2 right-2 flex justify-center items-center bg-white rounded-full shadow-md p-2 hover:bg-black/10">
          <PlusIcon
            onClick={(e) => addProductsToCart(e, data)} // Primero pasa 'e', luego 'data'
            className="h-6 w-6 text-black/60 hover:text-black cursor-pointer"
          />
        </div>
      </figure>

      <div className="flex flex-col justify-between flex-1">
        {/* Título del producto */}
        <p className="text-sm font-medium text-gray-700 line-clamp-2">{data.title}</p> {/* Añadido "line-clamp-2" */}

        {/* Contenedor del precio y la acción */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold text-gray-900">$ {data.price}</span> {/* Aumentada la prominencia */}
          <button
            onClick={(e) => addProductsToCart(e, data)}
            className="bg-black text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.object.isRequired
}

export default Card
