import { ShoppingCart } from './ShoppingCart';

(async () => {
    const cart = new ShoppingCart();

    await cart.addProduct('cheerios', 3);
    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('frosties', 3);
    await cart.addProduct('shreddies', 2);
    await cart.addProduct('weetabix', 1);
    
    const cartState = cart.getCartState();
    console.log('Cart State:', cartState);
})();