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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const PriceApiService_1 = require("../services/PriceApiService");
jest.mock('axios');
describe('PriceApiService', () => {
    it('should fetch the product price successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        axios_1.default.get.mockResolvedValue({ data: { price: 3.5 } });
        const price = yield PriceApiService_1.PriceApiService.getProductPrice('cheerios');
        expect(price).toBeCloseTo(3.5);
        expect(axios_1.default.get).toHaveBeenCalledWith('http://localhost:3001/products/cheerios');
    }));
    it('should throw an error if the product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = {
            isAxiosError: true,
            response: {
                status: 404,
                data: {
                    message: 'Product not found'
                },
            },
        };
        axios_1.default.get.mockRejectedValue(mockError);
        yield expect(PriceApiService_1.PriceApiService.getProductPrice('invalid-product')).rejects.toThrow('Failed to fetch price for product: invalid-product');
    }));
});
