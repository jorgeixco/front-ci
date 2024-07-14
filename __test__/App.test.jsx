import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import App from '../src/App';
import { useProduct } from '../src/hooks/useProduct';

jest.mock('../src/hooks/useProduct');

describe('App component', () => {
  it('should render the product list', () => {
    const products = [
      {
        id: 1,
        name: 'Producto 1',
        price: 100,
        image: 'http://example.com/image1.jpg',
      },
      {
        id: 2,
        name: 'Producto 2',
        price: 200,
        image: 'http://example.com/image2.jpg',
      },
    ];

    useProduct.mockReturnValue({
      products,
      product: null,
      setProduct: jest.fn(),
      getProduct: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Lista de productos')).toBeInTheDocument();
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`Precio: ${product.price}`)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toHaveAttribute(
        'src',
        product.image
      );
    });
  });

  it('should render the product list without products', () => {
    useProduct.mockReturnValue({
      products: [],
      product: null,
      setProduct: jest.fn(),
      getProduct: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText('Lista de productos')).toBeInTheDocument();
    const productItems = screen.queryAllByRole('listitem');
    expect(productItems).toHaveLength(0);
  });

  it('should render the selected product view', () => {
    const product = {
      id: 1,
      name: 'Producto 1',
      price: 100,
      image: 'http://example.com/image1.jpg',
    };

    useProduct.mockReturnValue({
      products: [product],
      product,
      setProduct: jest.fn(),
      getProduct: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText(`Precio: ${product.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toHaveAttribute(
      'src',
      product.image
    );
  });

  it('should call setProduct when a product is clicked', () => {
    const products = [
      {
        id: 1,
        name: 'Producto 1',
        price: 100,
        image: 'http://example.com/image1.jpg',
      },
    ];
    const mockSetProduct = jest.fn();

    useProduct.mockReturnValue({
      products,
      product: null,
      setProduct: mockSetProduct,
      getProduct: jest.fn(),
    });

    render(<App />);

    fireEvent.click(screen.getByText('Producto 1'));
    expect(mockSetProduct).toHaveBeenCalledWith({
      ...products[0],
      nameObject: products[0].name,
    });
  });
  it("not should render the product list", () => {
    useProduct.mockReturnValue({
      products: null,
      product: null,
      setProduct: jest.fn(),
      getProduct: jest.fn(),
    });

    render(<App />);

    expect(screen.queryByText('Lista de productos')).toBeInTheDocument();
  });
});
