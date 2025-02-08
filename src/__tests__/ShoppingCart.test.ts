import { ShoppingCart } from '../ShoppingCart';
import { PriceApiService } from '../services/PriceApiService';

jest.mock('../services/PriceApiService');

describe('ShoppingCart', () => {
    let cart: ShoppingCart;

    beforeEach(() => {
        cart = new ShoppingCart();
        jest.clearAllMocks();
    });

    it('should add a product and calculate the state correctly', async () => {
        (PriceApiService.getProductPrice as jest.Mock).mockResolvedValue(3.5);

        await cart.addProduct('cheerios', 2);

        const state = cart.getCartState();
        expect(state.items).toEqual([{ name: 'cheerios', quantity: 2, price: 3.5 }]);
        expect(state.subtotal).toBeCloseTo(7);
        expect(state.tax).toBeCloseTo(0.88);
        expect(state.total).toBeCloseTo(7.88);
    });

    it('should handle multiple products correctly', async () => {
        (PriceApiService.getProductPrice as jest.Mock)
            .mockResolvedValueOnce(3.5)
            .mockResolvedValueOnce(2.8)
            .mockResolvedValueOnce(4.2);

        await cart.addProduct('cheerios', 2);
        await cart.addProduct('cornflakes', 1);
        await cart.addProduct('frosties', 2);

        const state = cart.getCartState();
        expect(state.items).toEqual([
            { name: 'cheerios', quantity: 2, price: 3.5 },
            { name: 'cornflakes', quantity: 1, price: 2.8 },
            { name: 'frosties', quantity: 2, price: 4.2 },
        ]);
        expect(state.subtotal).toBeCloseTo(18.2);
        expect(state.tax).toBeCloseTo(2.28);
        expect(state.total).toBeCloseTo(20.48);
    });
});