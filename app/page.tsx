"use client";
import Image from "next/image";
import InputWidget from "./components/Input/InputWidget";
import { useCallback, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const [variant, setVarient] = useState('login');
  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) => currentVarient === 'login' ? 'register' : 'login');
  }, []);

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    console.log("Email:", value);
    setEmail(value);
  };

  const userNameChange = (e: any) => {
    const value = e.target.value;
    console.log("Username:", value);
    setUsername(value);
  };

  const passwordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle show/hide password
  };

  return (
    <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/images/hero.jpg')]">
      {/* Content Layer */}
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        {/* Navigation Bar */}
        <nav className="px-12 py-12">
          {/* Logo using next/image */}
          <Image
            src="/images/logo.png"
            alt="logo"
            width={44}
            height={44}
            className="h-11 w-auto"
            priority
          />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full min-w-[320px] max-w-[400px]">
              <h2 className="text-white text-4xl mb-8 font-semibold">{variant === 'login' ? 'Sign In' : 'Register'}</h2>
              <div className="flex flex-col gap-4 min-w-[280px]">
                {variant === 'register' && (
                  <InputWidget
                    label="Username"
                    onChange={userNameChange}
                    id="username"
                    type="text"
                    value={username}
                  />
                )}

                <InputWidget
                  label="Email"
                  onChange={handleEmailChange}
                  id="email"
                  type="email"
                  value={email}
                />
                <div className="relative">
                  <InputWidget
                    label="Password"
                    onChange={passwordChange}
                    id="password"
                    type={showPassword ? "text" : "password"} // Dynamic type
                    value={password}
                  />
                  {/* Show/Hide Password Button */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-sm focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 translate min-w-[280px] max-w-[400px]">
                {variant === 'login' ? 'Login' : 'Sign Up'}
              </button>
              <p className="text-neutral-500 mt-12 flex justify-between items-center">
                {variant === 'login' ? 'Don’t have an account?' : 'Already have an account?'}
                <span
                  onClick={toggleVarient}
                  className="text-white hover:underline cursor-pointer ml-auto"
                >
                  {variant === "login" ? "Create an Account" : "Login"}
                </span>
              </p>

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
