/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import Logo from "../assets/logo.png";
import { custom_axios } from "../axios/AxiosSetup";

const Login = () => {
  const navigate = useNavigate();
  const email: any = useRef();
  const password: any = useRef();

  const handleLogin = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.error("Please enter your valid credentials");
      return;
    }

    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error: any) {
      if (error.response.status == 401) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center  lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className=" w-full flex   items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl text-black tracking-tight flex justify-center items-center gap-2">
              <img src={Logo} className="h-12 w-14 " />
              Todo App
            </span>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              ref={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              onClick={handleLogin}
            >
              Login
            </button>
            <Link
              to={"/sign-up"}
              className="cursor-pointer inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-100 text-xs">
          Copyright ©2022 Notez. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
