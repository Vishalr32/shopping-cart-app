import { CartState } from './models/CartState';
import { PriceApiService } from './services/PriceApiService';
import { MathUtils } from './MathUtils';

const TAX_RATE = 0.125;

export class ShoppingCart {
    private state: CartState;

    constructor() {
        this.state = {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
        };
    }

    async addProduct(name: string, quantity: number): Promise<void> {
        const price = await PriceApiService.getProductPrice(name);
        this.state.items.push({ name, quantity, price });
        this.calculateState();
    }

    private calculateState(): void {
        this.state.subtotal = this.state.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        this.state.tax = MathUtils.roundToTwoDecimals(this.state.subtotal * TAX_RATE);
        this.state.total = this.state.subtotal + this.state.tax;
    }

    getCartState(): CartState {
        return this.state;
    }
}