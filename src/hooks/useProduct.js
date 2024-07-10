import { useEffect, useState } from 'react';

const URL = 'https://back-ci.onrender.com';

export const useProduct = () => {
  const [products, setProducts] = useState(null);

  const getProduct = async () => {
    try {
      await fetch(`${URL}/api/products`)
        .then((res) => {
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
