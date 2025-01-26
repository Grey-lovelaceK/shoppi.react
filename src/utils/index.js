/**
 * calculate total price of a new order
 * @param {Array} products cartProducts is an array of objects
 * @returns {number} total price of the cart
 * this function calculate total price of a new order
 * 
 */
export const totalPrice = (products) => {
    let sum = 0;
    products.forEach((product) =>  sum += product.price * product.quantity);
        return sum
}