import React, { useEffect } from 'react';
import { useProduct } from './hooks/useProduct';
import { ViewObject } from './component/ViewObject';

function App() {
  const { products, product, setProduct, getProduct } = useProduct();
  useEffect(() => {
    getProduct();
  }, []);
  if (product === null) {
    return (
      <div className="gradient-bg-welcome w-[100%] h-[100%] p-4 min-h-screen">
        <div className="flex gap-6 border-b-[5px] border-[#e97d05] justify-center w-[95%] m-auto mb-6">
          <h1 className="font-text text-3xl cursor-pointer text-[#e97d05]">
            Lista de productos
          </h1>
        </div>
        <ul className="flex w-[70%] flex-wrap justify-center items-center gap-3 m-auto">
          {products?.map((product) => (
            <li
              onClick={() =>
                setProduct({ ...product, nameObject: product.name })
              }
              key={product.id}
              className="h-[460px] w-[30%] bg-white max-w-[415px] min-w-[200px] rounded-[15px] relative shadow-lg justify-center cursor-pointer"
            >
              <div className="w-[90%] py-5 m-auto container-info-cards">
                <h2 className="text-2xl text-amber-900 py-2 font-sans font-bold">
                  {product.name}
                </h2>
                <p className="text-2xl text-amber-900 font-bold py-2 font-sans">
                  Precio: {product.price}
                </p>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[68%] object-cover rounded-t-[10px]"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <ViewObject {...product} setProduct={setProduct} />;
  }
}

export default App;
