import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../api/authMutation"; // Assuming you have a login mutation
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Button } from "@heroui/react";
import { MoveLeft } from "lucide-react";
import { setToast } from "../components/Toast/toastUtils";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: login, isPending } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      
      if (response.success) {
        localStorage.setItem("movieToken", response.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
     setToast("error", error.response.data.message || "There is an error");
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
            <h1 className="text-xl md:text-3xl font-bold text-center mb-4 uppercase">Sign in</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
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
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
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

              <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 bg-gray-700 border-gray-600"
                    {...register("rememberMe")}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="hover:underline">Need Help?</Link>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 py-3 my-6 rounded font-bold flex items-center justify-center transition"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              
              <div className="flex items-center text-sm text-gray-400 mt-4">
                <span className="mr-1">New to MovieFlix?</span>
                <Link
                  to="/signup"
                  className="text-white hover:underline font-medium"
                >
                  Sign up now
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                <button className="text-blue-500 hover:underline ml-1">Learn more.</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;