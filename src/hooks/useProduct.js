import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BACK_URL;

export const useProduct = () => {
  const [products, setProducts] = useState(null);
  
  const getProduct = async () => {
    try {
      await fetch(`${URL}/api/products`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error fetching data");
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return {
    products,
  };
};
