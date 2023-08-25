import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import axios from "axios";
import AppContext from "../../components/context/AppContext";

const crudProducts = () => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [updateCategory, setUpdateCategory] = useState("");
  const [data, setData] = useState([]);
  const [queryMessage, setQueryMessage] = useState("");

  // Check authentication
  async function getAuth() {

    const token = localStorage.getItem("token")
    if (!token) {
      Router.push({
        pathname: "/login",
        query: { message: "Token Invalid" },
      });
    } else {
      try {
        const response = await fetch(`/api/middleware/auth?token=${token}`, {
          method: "POST",
        });

        if (!response.ok) {
          Router.push({
            pathname: "/login",
            query: { message: "Token Invalid" },
          });
        }
      } catch (error) {
        console.log(error)
        Router.push({
          pathname: "/login",
          query: { message: "Token Expired" },
        });
      }
    }
  }
  getAuth();

  // Loading screen
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Handle image upload
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 4);
    setImageSrc(files);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!productName) {
      errors.productName = "Product name is required";
    }

    if (!productDescription) {
      errors.productDescription = "Product description is required";
    }

    if (!productPrice) {
      errors.productPrice = "Product price is required";
    }

    if (imageSrc.length < 4) {
      errors.imageSrc = "Maximum 4 images are allowed";
    } else if (imageSrc.length > 4) {
      errors.imageSrc = "Only 4 images are allowed";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const uploadPromises = imageSrc.map((file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "uploads");

          return axios.post(
            "https://api.cloudinary.com/v1_1/dvo1ngia7/image/upload",
            formData
          );
        });

        const uploadResponses = await Promise.all(uploadPromises);

        const imageUrls = uploadResponses.map((response) => response.data.url);

        const data = {
          productName,
          productDescription,
          productCategory,
          productPrice,
          imageUrls,
        };

        const response = await axios.post("/api/admin/products", data);
        console.log(response)
        setMessage(response.data.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setLoading(false);
        getProducts();
      } catch (error) {
        console.log(error)
        setMessage("Something Went Wrong. ");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setLoading(false);
      }
    }
  };

  // get category
  const getCategory = async () => {
    try {
      const categoryData = await axios.get("/api/admin/category");
      setCategoryData(categoryData.data);
    } catch (error) {
      setMessage("Internet Connection not Stable");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(true);
      }, 3000);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  // get products
  const getProducts = async () => {
    const productData = await axios.get("/api/admin/products");
    setProductData(productData.data);
    setData(productData.data);

    // set message
    setMessage(productData.data.message);
    if (!productData.data.message === "") {
      setTimeout(() => {
        setShowAlert(true);
      }, 3000);
    }
  };
  // call getUsers on component mount
  useEffect(() => {
    getProducts();
  }, []);

  // Delete product
  const deleteProduct = async (productId) => {
    setLoading(true);

    try {
      const response = await axios.delete(
        `/api/admin/products?id=${productId}`
      );
      setLoading(false);
      setMessage(response.data.message);
      setShowAlert(true);
      getProducts();
    } catch (error) {
      setLoading(false);
      setMessage("Something went Wrong, Please Try Again. ");
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // handle search query
  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(context.query.toLowerCase())
    );

    if (filteredData.length == 0) {
      setQueryMessage("Users not Found");
    } else {
      setQueryMessage(context.query);
    }
    setProductData(filteredData);
  }, [context.query]);

  return (
    <div>
      {/* loading page  */}
      {loading ? <Loading /> : null}

      {/* popup alert */}
      {showAlert && (
        <div className="fixed top-0 left-0 lg:left-auto right-0 z-50 p-4">
          <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16 10a6 6 0 11-12 0 6 6 0 0112 0zm-6 5a1 1 0 100-2 1 1 0 000 2zm0-10a1 1 0 100-2 1 1 0 000 2zM5.78 14.55a4.002 4.002 0 01-1.513-1.513A5.984 5.984 0 013 10a6 6 0 1111.268 3H13a1 1 0 00-1 1v1a1 1 0 102 0v-1a3 3 0 00-3-3h-.268A5.992 5.992 0 015.78 14.55zM10 12a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-4">
              <div className="mt-2 mx-2 text-sm text-gray-500">{message}</div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mt-8 mb-4">Product CRUD Page</h1>

        {/* crud form  */}
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="name"
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {formErrors.productName && (
                  <div className="text-red-500">{formErrors.productName}</div>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="description"
                  placeholder="Product Description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
                {formErrors.productDescription && (
                  <div className="text-red-500">
                    {formErrors.productDescription}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:space-x-4">
                <div className="w-full sm:w-1/2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    className="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="price"
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  {formErrors.productPrice && (
                    <div className="text-red-500">
                      {formErrors.productPrice}
                    </div>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="price"
                  >
                    Category
                  </label>
                  <select
                    className="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>

                    {categoryData.map((category, index) => (
                      <option value={category.category}>{category.category}</option>
                    ))}
                  </select>
                  {formErrors.productCategory && (
                    <div className="text-red-500">
                      {formErrors.productCategory}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="imageFiles">Product Images</label>
                  <input
                    type="file"
                    id="imageFiles"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    max="4"
                  />
                  {formErrors.imageSrc && <div>{formErrors.imageSrc}</div>}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full sm:w-auto px-4 py-2 bg-blue-500 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* products data  */}
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-bold text-left">Image</th>
                  <th className="px-4 py-2 font-bold text-left">ID</th>
                  <th className="px-4 py-2 font-bold text-left">Name</th>
                  <th className="px-4 py-2 font-bold text-left">Description</th>
                  <th className="px-4 py-2 font-bold text-left">Price</th>
                  <th className="px-4 py-2 font-bold text-left">Category</th>
                  <th className="px-4 py-2 font-bold text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => (
                  <tr>
                    <td className="border px-4 py-2">
                      {" "}
                      <img src={product.images[0]} />{" "}
                    </td>
                    <td className="border px-4 py-2">{product._id}</td>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2">{product.price}</td>
                    <td className="border px-4 py-2">{product.category}</td>
                    <td className="border px-4 py-2">
                      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Edit
                      </button> */}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default crudProducts;
