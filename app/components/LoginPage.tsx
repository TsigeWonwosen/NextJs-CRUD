"use client";

import GithubSignIn from "@/app/components/GithubSignIn";
import { useState } from "react";
import { signIn } from "next-auth/react";
import AddUser from "@/app/components/AddUser";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUser] = useState({ username: "", password: "" });
  const [state, setState] = useState({ error: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultSingIn = await signIn("credentials", {
        redirect: false,
        username: userInfo.username,
        password: userInfo.password,
      });
      if (resultSingIn?.error) {
        throw new Error("Invalid username or password");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error: any | Error) {
      setState({ error: error.message });
    }
  };

  const handleLogin = () => {
    setIsLogin((prvState) => !prvState);
  };
  return (
    <section className="flex w-[100%] flex-col items-center justify-center">
      <h2 className="text-- mb-4 text-center text-2xl font-bold">
        {!isLogin ? "Sign Up" : "Log In"}
      </h2>
      {isLogin ? (
        <form className="w-[300px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-left text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={userInfo.username}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-left text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={userInfo.password}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
          <GithubSignIn />
          {state?.error && <p className="text-red-500">{state?.error}</p>}
          <p>
            {"Don't have an account?"}{" "}
            <span onClick={handleLogin} className="cursor-pointer">
              {isLogin ? "Register" : "LogIn"}
            </span>
          </p>
        </form>
      ) : (
        <AddUser handleLogin={handleLogin} />
      )}
    </section>
  );
};

export default LoginForm;
