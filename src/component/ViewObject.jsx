import React from 'react';
import PropTypes from 'prop-types';

export const ViewObject = ({
  id,
  name,
  price,
  image,
  nameObject,
  setProduct,
}) => {
  return (
    <div className="gradient-bg-welcome w-[100%] h-[100%] p-4 min-h-screen                              ">
      <div className="flex gap-6 border-b-[5px] border-[#e97d05] justify-center w-[95%] m-auto mb-6">
        <h1 className="font-text text-3xl cursor-pointer text-[#e97d05]">
          Product {nameObject}
        </h1>
      </div>
      <ul className="flex w-[70%] flex-wrap justify-center items-center gap-3 m-auto">
        <li
          key={id}
          className="h-[460px] w-[30%] bg-white max-w-[415px] min-w-[200px] rounded-[15px] relative shadow-lg justify-center"
        >
          <div className="w-[90%] py-5 m-auto container-info-cards">
            <h2 className="text-2xl text-amber-900 py-2 font-sans font-bold">
              {nameObject}
            </h2>
            <p className="text-2xl text-amber-900 font-bold py-2 font-sans">
              Precio: {price}
            </p>
          </div>
          <img
            src={image}
            alt={name}
            className="w-full h-[68%] object-cover rounded-t-[10px]"
          />
        </li>
      </ul>
                                                                          <button
                                                                            className="bg-[#e97d05] text-white p-2 rounded-md mt-4 cursor-pointer justify-center flex items-center m-auto w-80"
                                                                            onClick={() => setProduct(null)                  }
                                                                          >
                                                                            BACK
                                                                          </button>
    </div>
  );
};

ViewObject.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  nameObject: PropTypes.string,
  setProduct: PropTypes.func,
};
