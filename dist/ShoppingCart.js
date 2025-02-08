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
exports.ShoppingCart = void 0;
const PriceApiService_1 = require("./services/PriceApiService");
const MathUtils_1 = require("./MathUtils");
const TAX_RATE = 0.125;
class ShoppingCart {
    constructor() {
        this.state = {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
        };
    }
    addProduct(name, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const price = yield PriceApiService_1.PriceApiService.getProductPrice(name);
            this.state.items.push({ name, quantity, price });
            this.calculateState();
        });
    }
    calculateState() {
        this.state.subtotal = this.state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        this.state.tax = MathUtils_1.MathUtils.roundToTwoDecimals(this.state.subtotal * TAX_RATE);
        this.state.total = this.state.subtotal + this.state.tax;
    }
    getCartState() {
        return this.state;
    }
}
exports.ShoppingCart = ShoppingCart;
