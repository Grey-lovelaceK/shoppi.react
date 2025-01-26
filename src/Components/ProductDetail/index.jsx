import { useContext, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import './styles.css'

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);
    const product = context.productToShow;
    console.log('productToShow', context.productToShow);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Verificar que el producto y sus imágenes estén disponibles
    if (!product || !product.images || product.images.length === 0) {
        return <div></div>; // Mostrar un mensaje o imagen predeterminada
    }

    const handleImageChange = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <aside
            className={`product-detail fixed right-0 bg-white shadow-lg border border-black rounded-lg transform transition-transform duration-300 ease-in-out ${context.isProductDetailOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <div>
                    <XMarkIcon className='h-6 w-6 text-black/60 hover:text-black cursor-pointer'
                        onClick={() => context.closeProductDetail()} />
                </div>
            </div>
            <figure className='px-6'>
                <img className='w-full h-64 object-cover rounded-lg' src={product.images[selectedImageIndex]} alt={product.title} />
            </figure>
            <div className='flex justify-center gap-2 py-4'>
                {product.images.map((image, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full bg-gray-300 ${selectedImageIndex === index ? 'bg-gray-600' : 'hover:bg-gray-500'}`}
                        onClick={() => handleImageChange(index)}
                    />
                ))}
            </div>

            {/* Descripción */}
            <p className='flex flex-col p-6 overflow-y-auto max-h-64'>
                <span className='font-medium text-2xl mb-2'>{product.price}</span>
                <span className='font-medium text-md'>{product.title}</span>
                <span className='font-light text-sm'>{product.description}</span>
            </p>
        </aside>

    )
}

export default ProductDetail