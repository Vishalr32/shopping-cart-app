import { CartItem } from './CartItem';

export interface CartState {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
}