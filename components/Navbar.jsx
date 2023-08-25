import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Navbar.module.css";
import { Transition } from "@headlessui/react";
import AppContext from "./context/AppContext";
import Cookies from "js-cookie";
import NavLinks from "./NavLinks";
import axios from "axios";

const Navbar = () => {
  const context = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");

  // handle sucribers

  const handleSubscribe = async () => {
    try {
      // Send the subscriber email to the API
      const response = await axios.post("/api/mails/subscribe", {
        email: subscriberEmail,
      });
      // Handle the API response as needed
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // get alert message
  const alert = async () => {
    try {
      const response = await axios.get("/api/admin/alert");
      setAlertMessage(response.data.data[0].alert);
    } catch (error) {
      setAlertMessage("Something went Wrong. ");
    }
  };
  useEffect(() => {
    alert();
  }, []);

  function handleSearchChange(event) {
    const value = event.target.value;
    setQuery(value);
    context.setQuery(value);
  }

  return (
    <>
      {/* alert box */}
      <div className={`${styles.alert} bg-themecolor text-white px-4 py-2`}>
        <p className="animate-pulse font-bold tracking-wider">{alertMessage}</p>
      </div>

      {/* Navbar */}
      <nav
        className={`${styles.nav} shadow-lg z-10 sticky top-0 mb-16 md:mb-0 w-full md:border-b border-grey-400 mr flex justify-between px-8 md:px-20 py-7 items-center bg-white z-501`}
      >
        {/* search box */}
        <div
          className={`${styles.searchbox}
          w-[100%] md:w-[25%] bg-white flex absolute top-24 left-1/2 transform -translate-x-1/2 md:static md:top-0 md:-translate-x-0 border border-grey-400 md:flex justify-between align-center p-3`}
        >
          <input
            className="ml-2 outline-none bg-transparent font-"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={query}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 pt-0.5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* logo */}
        <a href="/">
          <h1 className={`${styles.logo} text-md md:text-lg text-gray-800 font-bold`}>
            Inferno Decor's
          </h1>
        </a>

        {/* roots */}
        <div className="flex items-center">
          <div className="flex items-center"></div>
          <ul className="flex items-center space-x-6">
            <a href="/signup" className="md:flex font-semibold text-gray-700">
              <li className="px-1 hidden md:block">Account</li>

              <svg
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
              >
                <path d="M32,2A30.034,30.034,0,0,0,2,32a29.6307,29.6307,0,0,0,1.1387,8.1758,1,1,0,1,0,1.9218-.5518A27.64,27.64,0,0,1,4,32a28,28,0,0,1,56,0,27.64,27.64,0,0,1-1.06,7.624,1,1,0,1,0,1.9218.5518A29.6307,29.6307,0,0,0,62,32,30.034,30.034,0,0,0,32,2Z" />
                <path d="M37.8383,35.5991a13,13,0,1,0-11.6766,0,28.89,28.89,0,0,0-16.5474,9.97,5.0514,5.0514,0,0,0,.1484,6.564,29.9923,29.9923,0,0,0,44.4746,0,5.0514,5.0514,0,0,0,.1484-6.564A28.89,28.89,0,0,0,37.8383,35.5991Z" />
              </svg>
            </a>

            <a href="/cart" className="flex font-semibold text-gray-700">
              <li className="px-1 hidden md:block">Cart</li>

              <svg
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 2"
                viewBox="0 0 35 35"
              >
                <path d="M27.47,23.93H14.92A5.09,5.09,0,0,1,10,20L8,11.87a5.11,5.11,0,0,1,5-6.32h16.5a5.11,5.11,0,0,1,5,6.32l-2,8.15A5.1,5.1,0,0,1,27.47,23.93ZM12.94,8.05a2.62,2.62,0,0,0-2.54,3.23l2,8.15a2.6,2.6,0,0,0,2.54,2H27.47a2.6,2.6,0,0,0,2.54-2l2-8.15a2.61,2.61,0,0,0-2.54-3.23Z" />
                <path d="M9.46 14a1.25 1.25 0 0 1-1.21-1L6.46 5.23A3.21 3.21 0 0 0 3.32 2.75H1.69a1.25 1.25 0 0 1 0-2.5H3.32A5.71 5.71 0 0 1 8.9 4.66l1.78 7.77a1.24 1.24 0 0 1-.93 1.5A1.43 1.43 0 0 1 9.46 14zM15.11 34.75a4 4 0 1 1 4-4A4 4 0 0 1 15.11 34.75zm0-5.54a1.52 1.52 0 1 0 1.52 1.52A1.52 1.52 0 0 0 15.11 29.21zM28.93 34.75a4 4 0 1 1 4-4A4 4 0 0 1 28.93 34.75zm0-5.54a1.52 1.52 0 1 0 1.53 1.52A1.52 1.52 0 0 0 28.93 29.21z" />
                <path d="M28.93,29.21H12.27a3.89,3.89,0,1,1,0-7.78h2.65a1.25,1.25,0,1,1,0,2.5H12.27a1.39,1.39,0,1,0,0,2.78H28.93a1.25,1.25,0,0,1,0,2.5Z" />
              </svg>

              {/* cart number  */}
              <span className="bg-themecolor font-bold-900 text-white p-3 rounded-full w-5 h-5 text-[0.8rem] flex items-center justify-center mt-[-0.5rem] ml-[-0.4rem]">
                {context.cartNumber}
              </span>
            </a>
            <a
              onClick={() => {
                setIsOpen(!isOpen);
                // window.scrollTo(0, 0);
              }}
            >
              <img src="/img/menu.png" className="w-8" alt="menu" />
            </a>
          </ul>
        </div>
      </nav>

      {/* menu items */}

      <Transition
        show={isOpen}
        enter="transition ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:block md:mt-0">
          <div className="z-20 bg-milky shadow-md transform translate-y-2 fixed top-[22%] md:top-[17%] right-[0%] w-[80%] ml-[10%] md:border-0 md:bg-white h-full md:h-12 md:w-full">
            <ul className="md:flex justify-evenly flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium h-[70%] md:h-12 md:overflow-visible overflow-y-scroll scroll-smooth">
              <NavLinks />
              <li>
                <div className="flex mt-16 md:hidden justify-center mb-6">
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
              </li>
              <li>
                <div className="md:hidden">
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
                          onChange={ (event) => setSubscriberEmail(event.target.value) }
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
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Navbar;
