import { useEffect, useState } from "react";

export const useProduct = () => {
  const [products, setProducts] = useState(null);

  const getProduct = async () => {
    fetch("http://localhost:3000/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return {
    products,
  };
};
