"use client";

import { useState, useEffect } from "react";
import { addProduct } from "@/app/actions/product";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = () => {
      fetch(`/api/category`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          setProduct((prev) => ({ ...prev, category: data[0]?._id }));
        });
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        //  price:
        //  title: asdasdasd
        e.target.name === "price" ? Number(e.target.value) : e.target.value,
    });
  };
  // // product.price = Number(product.price);
  // product["price"] =

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const data = new FormData();
    //this is the file we send to cloudinary
    data.append("file", file);
    // this is the upload preset from our cloudinary account
    data.append("upload_preset", "our-first-project");
    // this is the cloud name from our cloudinary account
    data.append("cloud_name", "dcdga3gke");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dcdga3gke/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    const img = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    console.log(result, "res");
    // result.secure_url will held the image url.
    setProduct({ ...product, image: img });
    setImgUrl(result.secure_url);
  };
  // [api.reducerPath] : api.reducer

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.image) {
      return alert(`Please Wait until the image uploading is done`);
    }
    // await fetch(`http://localhost:4000/products`, {
    // 	method: "POST",
    // 	body: JSON.stringify(product),
    // 	headers: {
    // 		"Content-Type": "application/json",
    // 	},
    // });
    addProduct(product);
  };

  // const addProductWIthData = addProduct.bind(null, product);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    value={product.title}
                    onChange={handleChange}
                    name="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    name="price"
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    value={product.description}
                    onChange={handleChange}
                    name="description"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={product.category}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  >
                    {categories?.map((cat) => (
                      <option key={cat?._id} value={cat?._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Image
                  </label>
                  {product.image && (
                    <img
                      src={imgUrl}
                      alt=""
                      className="mt-2 w-24 h-24 object-cover rounded-md"
                    />
                  )}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
											file:mr-4 file:py-2 file:px-4
											file:rounded-md file:border-0
											file:text-sm file:font-semibold
											file:bg-indigo-50 file:text-indigo-700
											hover:file:bg-indigo-100"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
