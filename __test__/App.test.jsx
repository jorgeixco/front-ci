/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import App from "../src/App";
import { useProduct } from "../src/hooks/useProduct";

jest.mock("../src/hooks/useProduct");

describe("App component", () => {
  it("should render the product list", () => {
    // Mock data to be returned by the useProduct hook
    const products = [
      {
        id: 1,
        name: "Producto 1",
        price: "100",
        image: "http://example.com/image1.jpg",
      },
      {
        id: 2,
        name: "Producto 2",
        price: "200",
        image: "http://example.com/image2.jpg",
      },
    ];

    // Mock the implementation of useProduct to return the mock data
    useProduct.mockReturnValue({ products });

    render(<App />);

    // Check if the title is rendered
    expect(screen.getByText("Lista de productos")).toBeInTheDocument();

    // Check if the products are rendered
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`Precio: ${product.price}`)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toHaveAttribute(
        "src",
        product.image
      );
    });
  });
  it("should render the product list without products", () => {
    // Mock the implementation of useProduct to return an empty array
    useProduct.mockReturnValue({ products: undefined });

    render(<App />);

    // Check if the title is rendered
    expect(screen.getByText("Lista de productos")).toBeInTheDocument();

    // Check if no products are rendered
    const productItems = screen.queryAllByRole("listitem");
    expect(productItems).toHaveLength(0);
  });
});
