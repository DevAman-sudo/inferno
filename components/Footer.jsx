import React, { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");

  // handle sucribers

  const handleSubscribe = async () => {
    try {
      // Send the subscriber email to the API
      const response = await axios.post("/api/mails/subscribe", {
        email: subscriberEmail,
      });
      // Handle the API response as needed
      console.log(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <footer className="text-center bg-milky">
        <div className="container px-6 pt-6">
          <div className="flex justify-center mb-6">
            <a
              href="https://www.facebook.com/infernointeriors"
              type="button"
              className="rounded-full border-2 border-gray-400 text-gray-400 leading-normal uppercase hover:bg-grey-400 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                className="w-2 h-full mx-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                ></path>
              </svg>
            </a>

            <a
              href="mailto:inferno.interiors@gmail.com"
              type="button"
              className="rounded-full border-2 border-grey-400 text-gray-400 leading-normal uppercase hover:bg-grey hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                className="w-3 h-full mx-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/inferno.iteriors/"
              type="button"
              className="rounded-full border-2 border-grey-400 text-gray-400 leading-normal uppercase hover:bg-grey hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="instagram"
                className="w-3 h-full mx-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                ></path>
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@inferno_decor"
              type="button"
              className="rounded-full border-2 border-grey-400 text-gray-400 leading-normal uppercase hover:bg-grey hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#808080"
                width="800px"
                height="800px"
                viewBox="0 0 448 512"
                id="icons"
                className="w-3 h-full mx-auto"
              >
                <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
              </svg>
            </a>
          </div>

          <div>
            <form action="">
              <div className="grid md:grid-cols-3 gird-cols-1 gap-4  justify-center items-center">
                <div className="md:ml-auto md:mb-6">
                  <p className="">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>

                <div>
                  <input
                    className="
                          my-1
                          form-control
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={subscriberEmail}
                    onChange={(event) => setSubscriberEmail(event.target.value)}
                    required
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-themecolor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mb-6">
            <p className="text-gray-400">
              Welcome to Inferno, where dreams meet reality, and your shopping
              desires come to life. Step into a world of convenience, variety,
              and incredible savings – all at your fingertips
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center md:justify-evenly">
            <div className="text-left">
              <h3 className="font-700 text-xl">Footer Menu</h3>
              <a href="/">
                <p className="text-gray-700 mt-1">Home</p>
              </a>
              <a href="/products">
                <p className="text-gray-700 mt-1">Shop</p>
              </a>
              <a href="/story">
                <p className="text-gray-700 mt-1">Our Story</p>
              </a>
              <a href="/contact">
                <p className="text-gray-700 mt-1">Contact uS</p>
              </a>
              <a href="/login">
                <p className="text-gray-700 mt-1">LogIn</p>
              </a>
              <a href="/signup">
                <p className="text-gray-700 mt-1">Create an Account</p>
              </a>
            </div>
            <div className="text-left tracking-wide">
              <h2 className="text-xl font-900 mt-8 md:mt-0">Get In Touch</h2>
              <p className="mt-2 underline text-gray-700">+977-9766910584</p>
              <p className="mt-2 underline text-gray-700">+977-9762425505</p>
              <p className="mt-2 underline text-gray-700">
                inferno.interiors@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="text-center p-4 text-bold">
          © 2023 Copyright: Inferno Interior's
        </div>
        <div className="text-center p-1 text-bold">
          Designed & Developed by:
          <a
            className="text-black font-semibold mx-1"
            href="https://www.facebook.com/devaman.sudo/"
          >
            Aman Shah
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
