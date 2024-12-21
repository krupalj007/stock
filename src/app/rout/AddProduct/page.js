// AddProduct.js

'use client';
import React, { useState } from 'react';
import Header from './Header1';
import { toast } from 'react-toastify';

function AddProduct() {
  const [productForm, setProductForm] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevProductForm) => ({
      ...prevProductForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsClicked(true);
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        toast.success('🦄 Product Added Successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error('Something Went Wrong, Please Try Again!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsClicked(false);
      setProductForm({});
    }
  };

  return (
    <>
      <div className="bg-white">
        <Header />
      </div>

      <div className="container mx-auto mt-8 p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
          Add New Product
        </h1>
        <div className="bg-white p-4 sm:p-8 shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Slug
              </label>
              <input
                id="slug"
                className="w-full border rounded py-2 px-3 text-uppercase"
                type="text"
                name="slug"
                placeholder="Product Name"
                onChange={handleChange}
                value={productForm?.slug || ""}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Quantity
              </label>
              <input
                id="quantity"
                className="w-full border rounded py-2 px-3"
                type="number"
                placeholder="Product Quantity"
                name="quantity"
                onChange={handleChange}
                value={productForm?.quantity || ""}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Price
              </label>
              <input
                id="price"
                className="w-full border rounded py-2 px-3"
                type="number"
                placeholder="Product Price"
                name="price"
                onChange={handleChange}
                value={productForm?.price || ""}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Upload Product Photo
              </label>
              <input
                id="photo"
                className="w-full border rounded py-2 px-3"
                type="text"
                placeholder="Paste Link Here..."
                name="photo"
                onChange={handleChange}
                value={productForm?.photo || ""}
                required
              />
            </div>

            <button
              className={`${
                isClicked
                  ? 'cursor-not-allowed bg-gray-100 text-black'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } py-2 px-4 rounded`}
              type="submit"
              disabled={isClicked}
            >
              {isClicked ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
