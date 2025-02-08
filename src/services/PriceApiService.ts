import axios from 'axios';

const PRICE_API_BASE_URL = 'http://localhost:3001/products/';

export class PriceApiService {
  static async getProductPrice(name: string): Promise<number> {
    try {
        const response = await axios.get(`${PRICE_API_BASE_URL}${name}`);
        return response.data.price;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(`Failed to fetch price for product: ${name}`);
    }
  }
}