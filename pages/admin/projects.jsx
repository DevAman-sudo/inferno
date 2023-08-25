import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import axios from "axios";
import AppContext from "../../components/context/AppContext";

const projects = () => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
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
    const file = event.target.files[0];
    setImageSrc(file);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!imageSrc) {
      errors.imageSrc = "Category image is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // get category
  const getCategory = async () => {
    try {
      const categoryData = await axios.get("/api/admin/projects");
      setCategoryData(categoryData.data);
      setData(categoryData.data);
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

  // handle form category
  const handleCategory = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", imageSrc);
        formData.append("upload_preset", "uploads");

        const uploadImage = await axios.post(
          "https://api.cloudinary.com/v1_1/dvo1ngia7/image/upload",
          formData
        );

        const { url } = uploadImage.data;
        const data = {
          updateCategory,
          url,
        };

        const response = await axios.post("/api/admin/projects", data);
        setLoading(false);
        setMessage(response.data.message);
        getCategory()
        setShowAlert(true);
        setUpdateCategory("");
      } catch (error) {
        setLoading(false);
        setMessage("Something Went Wrong, PLease try Again. ");
        setShowAlert(true);
        setUpdateCategory("");
      }

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  // Delete category
  const deleteCategory = async (Id) => {
    setLoading(true);

    try {
      const response = await axios.delete(`/api/admin/projects?id=${Id}`);
      setLoading(false);
      setMessage(response.data.message);
      setShowAlert(true);
      getCategory();
    } catch (error) {
      console.log(error);
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
      item.category.toLowerCase().includes(context.query.toLowerCase())
    );

    if (filteredData.length == 0) {
      setQueryMessage("Category not Found");
    } else {
      setQueryMessage(context.query);
    }
    setCategoryData(filteredData);
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

        {/* category form  */}
        <div className="flex justify-center border border-b-2 m-2 p-2">
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Add Project</h2>
            <form className="space-y-6" onSubmit={handleCategory}>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Add Project
                </label>
                <input
                  className="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="name"
                  type="text"
                  placeholder="Add Category"
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className="block w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                />
                {formErrors.imageSrc && (
                  <div className="text-red-500">{formErrors.imageSrc}</div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full sm:w-auto px-4 py-2 bg-blue-500 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* delete category  */}
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Category List</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-bold text-left">Image</th>
                  <th className="px-4 py-2 font-bold text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category, index) => (
                  <tr>
                    <td className="border px-4 py-2">
                      <img src={category.image} alt="image" />
                    </td>
                    <td className="border px-4 py-2">{category.category}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteCategory(category._id)}
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

export default projects;
