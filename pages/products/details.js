import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import Loading from "../../components/Loading";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AppContext from "../../components/context/AppContext";
import Image from "next/image";

const Details = () => {
  const context = useContext(AppContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [productDataLocal, setProductDataLocal] = useState([]);
  const [num, setNum] = useState(1);
  const [disPrice, setDisPrice] = useState("");
  const [images, setImages] = useState([]);
  const [mainImg, setMainImg] = useState("")

  const token = Cookies.get("token");
  const userId = Cookies.get("user_id");

  // image slider
  const handlePrev = () => {
    setImages((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNext = () => {
    setImages((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  // number increment and decrement
  const setDecrease = () => {
    num > 1 ? setNum(num - 1) : setNum(1);
  };

  const setIncrease = () => {
    setNum(num + 1);
  };

  // getProducts
  const getProducts = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/admin/products");
      const data = response.data;
      const foundData = data.find((item) => item._id == Router.query.ids);

      const discountPrice =
        foundData.price - (foundData.price / 100) * foundData.discount;
      const newFoundData = { ...foundData, discountPrice };

      setDisPrice(discountPrice);

      if (foundData.discount > 0) {
        setProductDataLocal(newFoundData);
        setImages(newFoundData.images);
        setMainImg(newFoundData.images[0])
      } else {
        setProductDataLocal(foundData);
        setImages(foundData.images);
        setMainImg(foundData.images[0])
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Something Went Wrong. ");
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  useEffect(() => {
    getProducts();
  }, []);

  // handle buy function
  const handleBuy = async () => {
    setLoading(true);

    if (!token && !userId) {
      router.push("/login?message=Please Log In");
    } else {
      try {
        const productId = router.query.ids;
        const newProductData = [
          ...context.productData,
          { productId, num, disPrice },
        ];

        context.setProductData(newProductData);
        router.push("/cart?message=Items added to Cart");

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessage("Something Went Wrong. ");
        setShowAlert(true);
      }
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };


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

      <div>
        <div className="min-w-screen min-h-screen bg-themecolor flex items-center p-5 md:p-10 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 md:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative flex flex-col items-center justify-center">
                  <img className=" w-96 h-96  object-contain" src={mainImg} />
                  <div className="flex justify-center ">
                    {images.map((image, index) => (
                      <img className="w-14 h-14 md:w-24 md:h-24 mx-1 object-contain" src={image} key={index} onClick={ () => setMainImg(image)} />
                    ))}
                  </div>

                  <div className="border-4 border-themecolor absolute top-10 bottom-10 left-10 right-10 z-[-1]"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {productDataLocal.name}
                  </h1>
                  <p className="text-sm">{productDataLocal.description}</p>
                </div>
                <div>
                  <div className="inline-block align-bottom mr-5">
                    <span className="text-2xl leading-none align-baseline">
                      Rs
                    </span>
                    <div className="flex flex-col">
                      {productDataLocal.discountPrice ? (
                        <span className="font-bold text-5xl leading-none align-baseline line-through">
                          {productDataLocal.price}
                        </span>
                      ) : (
                        <span className="font-bold text-5xl leading-none align-baseline">
                          {productDataLocal.price}
                        </span>
                      )}
                      {productDataLocal.discountPrice ? (
                        <span className="font-bold text-5xl leading-none align-baseline">
                          {productDataLocal.discountPrice}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center my-4 w-12 h-auto border-gray-900">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-themecolor hover:text-blue-50"
                      onClick={setDecrease}
                    >
                      {" "}
                      -{" "}
                    </span>
                    <input
                      className="h-8 w-14 font-bold border bg-white text-center text-xs outline-none m-auto flex items-center appearance-none rounded"
                      type="number"
                      value={num}
                      min="1"
                    />
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-themecolor hover:text-blue-50"
                      onClick={setIncrease}
                    >
                      {" "}
                      +{" "}
                    </span>
                  </div>

                  <div className="inline-block align-bottom">
                    <button
                      className="bg-themecolor text-white hover:text-gray-300 rounded-full px-10 py-2 font-semibold"
                      onClick={handleBuy}
                    >
                      <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
