import * as React from "react";
import { FcGoogle } from "react-icons/fc";
import { CgFacebook } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, navigate } from "react-router-dom";
import axios from "axios";
import { authenticate, isAuth } from "../../helpers/auth";

function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    textChange: "Sign In",
  });
  const { email, password, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({
      ...formData,
      [text]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setFormData({
        ...formData,
        textChange: "Submitting",
      });
      axios
        .post(`/api/v1/user/login/`, {
          email,
          password,
        })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password: "",
              textChange: "Submitted",
            });
            isAuth() && isAuth().role === "ADMIN"
              ? navigate("/Home")
              : navigate("/Auth");
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password: "",
            textChange: "Sign In",
          });

          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else {
      toast.error("Mohon di isi email dan Password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="w-screen h-screen block md:flex  ">
      <div className="hidden md:block w-full md:w-1/2 h-full">
        <img className="w-full h-full " src="/login.png" />
      </div>
      <div className="block md:hidden  md:w-1/2 ">
        <img className=" " src="/login-m.png" />
      </div>
      <div className="w-full md:w-1/2 flex mt-10 md:mt-0 justify-center items-center">
        <div className=" w-4/5 h-4/5">
          <p className="text-3xl text-red-500 font-bold">
            Log in to Beam Space
          </p>
          <div className="w-full  my-4">
            <button className="w-full flex justify-center items-center h-14 rounded-md text-xl font-semibold bg-white shadow-md">
              <FcGoogle className="mr-2 mt-1" /> Login with Google
            </button>
          </div>

          <div className="w-full  my-4">
            <button className="w-full flex text-white justify-center items-center h-14 rounded-md text-xl font-semibold bg-[#3A589B] shadow-md">
              <CgFacebook className="mr-2 mt-1 text-white" /> Login with
              Facebook
            </button>
          </div>

          <p className="text-xl text-[#B1B1B1] text-center my-6">
            or login with your email
          </p>

          <form onSubmit={handleSubmit} className="">
            <div className="my-2">
              <label className="font-semibold">Email Address</label>
              <input
                className="w-full shadow-md focus:ring-1 px-4 py-2 my-2 rounded-lg focus:border-transparent  border-red-400"
                type="text"
                placeholder="E.g, name@email.com"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="my-2">
              <label className="font-semibold">Password</label>
              <input
                className="w-full  shadow-md focus:ring-1 focus:border-transparent px-4 py-2 my-2 rounded-lg border-gray-400"
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                value={password}
              />
            </div>

            <button className="w-full flex text-white justify-center items-center h-12 rounded-md text-xl font-semibold bg-[#EB2730] shadow-md">
              Login
            </button>
          </form>

          <p className="text-xl text-[#00ACEE] text-center my-2">
            Forgot Password
          </p>
          <p className="text-xl text-[#B1B1B1] text-center my-2">
            Don’t have an account?{" "}
            <span className="text-[#00ACEE]"> Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
