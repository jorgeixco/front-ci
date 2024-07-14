import React from 'react';
import { useProduct } from '../src/hooks/useProduct';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, waitFor, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Component to test the hook
const TestComponent = () => {
  const { products, product, setProduct, getProduct } = useProduct();

  React.useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div>
      {products ? (
        products.map((product) => (
          <div
            key={product.id}
            data-testid="product"
            onClick={() => setProduct(product)}
          >
            {product.name}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      {product && <div data-testid="selected-product">{product.name}</div>}
    </div>
  );
};

describe('useProduct', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches and sets products correctly', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ id: 1, name: 'Test Product', price: 100 }])
    );

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('product')).toBeInTheDocument()
    );

    expect(screen.getByTestId('product')).toHaveTextContent('Test Product');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://back-ci.onrender.com/api/products'
    );
  });

  it('handles fetch errors', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    console.log = jest.fn(); // Mock console.log to check for error logs

    render(<TestComponent />);

    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith(new Error('API is down'))
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('sets selected product correctly', async () => {
    const products = [{ id: 1, name: 'Test Product', price: 100 }];
    fetchMock.mockResponseOnce(JSON.stringify(products));

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('product')).toBeInTheDocument()
    );

    // Simulate product click
    screen.getByTestId('product').click();

    // Check if the selected product is displayed
    await waitFor(() =>
      expect(screen.getByTestId('selected-product')).toBeInTheDocument()
    );
    expect(screen.getByTestId('selected-product')).toHaveTextContent(
      'Test Product'
    );
  });
});
