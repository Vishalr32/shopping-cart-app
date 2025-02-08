"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShoppingCart_1 = require("../ShoppingCart");
const PriceApiService_1 = require("../services/PriceApiService");
jest.mock('../services/PriceApiService');
describe('ShoppingCart', () => {
    let cart;
    beforeEach(() => {
        cart = new ShoppingCart_1.ShoppingCart();
        jest.clearAllMocks();
    });
    it('should add a product and calculate the state correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        PriceApiService_1.PriceApiService.getProductPrice.mockResolvedValue(3.5);
        yield cart.addProduct('cheerios', 2);
        const state = cart.getCartState();
        expect(state.items).toEqual([{ name: 'cheerios', quantity: 2, price: 3.5 }]);
        expect(state.subtotal).toBeCloseTo(7);
        expect(state.tax).toBeCloseTo(0.88);
        expect(state.total).toBeCloseTo(7.88);
    }));
    it('should handle multiple products correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        PriceApiService_1.PriceApiService.getProductPrice
            .mockResolvedValueOnce(3.5)
            .mockResolvedValueOnce(2.8)
            .mockResolvedValueOnce(4.2);
        yield cart.addProduct('cheerios', 2);
        yield cart.addProduct('cornflakes', 1);
        yield cart.addProduct('frosties', 2);
        const state = cart.getCartState();
        expect(state.items).toEqual([
            { name: 'cheerios', quantity: 2, price: 3.5 },
            { name: 'cornflakes', quantity: 1, price: 2.8 },
            { name: 'frosties', quantity: 2, price: 4.2 },
        ]);
        expect(state.subtotal).toBeCloseTo(18.2);
        expect(state.tax).toBeCloseTo(2.28);
        expect(state.total).toBeCloseTo(20.48);
    }));
});
