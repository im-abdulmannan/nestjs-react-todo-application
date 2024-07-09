/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import Logo from "../assets/logo.png";
import { custom_axios } from "../axios/AxiosSetup";

const SignUp = () => {
  const navigate = useNavigate();

  const firstName: any = useRef();
  const lastName: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const confirmPassword: any = useRef();

  const handleRegister = async () => {
    if (password.current.value !== confirmPassword.current?.value) {
      toast.warn("Password does not match!!!");
      return;
    }
    const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    });
    toast.success(response.data.message);
    navigate("/login");
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full  border-black xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full   h-full bg-white hidden p-12  lg:block lg:w-5/12 bg-cover rounded-l-lg ">
              <img src={Logo} className={"h-full  w-full "} />
            </div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      ref={firstName}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      required
                      placeholder="John"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      ref={lastName}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      required
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    ref={email}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      ref={password}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      required
                      placeholder="******************"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      ref={confirmPassword}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      required
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    onClick={handleRegister}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center"></div>
                <div className="text-center">
                  <p className="inline-block text-sm">
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 align-baseline hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login!
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
