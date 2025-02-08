import axios from 'axios';
import { PriceApiService } from '../services/PriceApiService';

jest.mock('axios');

describe('PriceApiService', () => {
    it('should fetch the product price successfully', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { price: 3.5 } });

        const price = await PriceApiService.getProductPrice('cheerios');
        expect(price).toBeCloseTo(3.5);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products/cheerios');
    });

    it('should throw an error if the product is not found', async () => {
            const mockError = {
                isAxiosError: true,
                response: {
                    status: 404,
                    data: { 
                        message: 'Product not found' 
                    },
                },
    };
    (axios.get as jest.Mock).mockRejectedValue(mockError);

        await expect(PriceApiService.getProductPrice('invalid-product')).rejects.toThrow(
            'Failed to fetch price for product: invalid-product'
        );
    });
});