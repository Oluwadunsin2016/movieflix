/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRegister } from "../api/authMutation";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { MoveLeft } from "lucide-react";
import { Button } from "@heroui/react";
import { setToast } from "../components/Toast/toastUtils";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: signUp, isPending } = useRegister();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const {confirmPassword, ...restData} = data; // Exclude confirmPassword
      const response = await signUp(restData);
      console.log("Signup response:", response);
      if (response.success) {
        localStorage.setItem("movieToken", response.token);
        navigate("/");
      }
    } catch (error) {
      setToast("error", error.response.data.message || "There is an error signing up");
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/45082c39-e6d5-4b02-8867-e38fe32ed3af/ee86969d-aaf4-4633-b269-c80113a1bc4e/NG-en-20220919-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Netflix background"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full min-h-screen"></div>
      <Button onPress={()=>navigate("/")} startContent={<MoveLeft size={16} />} size="sm" className="absolute top-6 left-6 bg-white/30 text-white z-[99] rounded-full">Home</Button>
      <div className="fixed flex items-center justify-center w-full p-4 z-50 h-full">
        <div className="max-w-[500px] bg-black/75 text-white rounded-lg py-6 px-4 md:py-8 md:px-12">
          <div className="w-full">
            <h1 className="text-xl md:text-3xl font-bold text-center mb-4 uppercase">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full p-3 my-2 bg-gray-700 rounded"
                    placeholder="First Name"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full p-3 my-2 bg-gray-700 rounded"
                    placeholder="Last Name"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters",
                      },
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <input
                  type="email"
                  className="w-full p-3 my-2 bg-gray-700 rounded"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <input
                  type="tel"
                  className="w-full p-3 my-2 bg-gray-700 rounded"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Invalid phone number (10-11 digits)",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mt-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 my-2 bg-gray-700 rounded pr-10"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-5 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mt-2 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-3 my-2 bg-gray-700 rounded pr-10"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-5 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 py-3 my-6 rounded font-bold flex items-center justify-center transition"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 bg-gray-700 border-gray-600"
                  />
                  Remember me
                </label>
                <button className="hover:underline">Need Help?</button>
              </div>
              
              <p className="py-6 text-gray-400">
                Already subscribed to MovieFlix?{" "}
                <Link
                  to="/login"
                  className="text-white hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;