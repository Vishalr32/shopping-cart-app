# Shopping Cart Application

A TypeScript-based shopping cart application that integrates with a Price API to calculate Total Cart Value (including Tax).

## Features
- Add products to the cart by specifying the product name and quantity.
- Retrieve product prices from the Price API.
- Calculate subtotal, tax (12.5%), and total payable.
- Unit tests for both the shopping cart logic and Price API client.

## Assumptions
- The Price API is running locally at `http://localhost:3001`.
- Available products: `cheerios`, `cornflakes`, `frosties`, `shreddies`, `weetabix`.
- Tax is rounded up to 2 decimal places.

## Improvements Needed
- The Price API is mocked in unit tests for less complexity.
- Basic error handling could be improved for production use.
- Logging Enhancements

### Prerequisites
- Node.js
- npm

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shopping-cart-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Build the application
```bash
npm run build
```

### Start the Price API
```bash
npm run serve-products
```

### Run the Application
```bash
npm start
```

### Run Unit Tests
```bash
npm test
```