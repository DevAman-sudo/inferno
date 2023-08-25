import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import axios from "axios";
import format from "date-fns/format";

const profile = () => {
  const [loading, setLoading] = useState(true);
  const [circleLoading, setCircleLoading] = useState(true);

  // verify user
  async function getAuth() {
    const token = Cookies.get("token");

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
        Router.push({
          pathname: "/login",
          query: { message: "Token Expired" },
        });
      }
    }
  }
  getAuth();

  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [userData, setUserData] = useState([]);
  const userID = router.query.userId;
  const cookieId = Cookies.get("user_id")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users?id=${userID}`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();

        setUserId(data._id);
        setUserName(data.name);
        setUserEmail(data.email);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userID) {
      fetchUserData();
    }
  }, [userID]);

  // get order history
  const orderHistory = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/order?id=${cookieId}`)
      setCartData(response.data);
      setUserData(response.data);
      setCircleLoading(false);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage("Internet Connection not Stable. ");
      setShowAlert(true);
      setLoading(false);
      setCircleLoading(false);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    orderHistory();
  }, []);

  // handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    Cookies.remove("isAdmin");
    Router.push("/");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="my-8">
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

      <div className="flex w-full h-auto text-gray-700 mt-8">
        <h1 className="mt-auto font-bold float-left m-4 text-3xl">
          My Account
        </h1>
        <a
          onClick={handleLogout}
          className="ml-auto m-4 mt-auto cursor-pointer"
        >
          <p className=" font-bold  underline">log out</p>
        </a>
      </div>
      {/* body  */}
      <div className="lg:flex justify-evenly w-screen">
        {/* account details  */}
        <div className="md:w-[30%] ml-8">
          <h1 className="text-2xl tracking-widest my-1">Account details</h1>
          <p className="text-gray-600 tracking-wider my-1">{userId}</p>
          <p className="text-gray-600 tracking-wider my-1">{userName}</p>
          <p className="text-gray-600 tracking-wider my-1">{userEmail}</p>
          <p className="text-gray-600 tracking-wider my-1">
            {userData.address}
          </p>
          <p className="text-gray-600 tracking-wider my-1">
            {userData.apartment}
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default profile;
