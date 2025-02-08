"use client";

import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import GithubSignIn from "@/app/components/GithubSignIn";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [userInfo, setUser] = useState({ username: "", password: "" });
  const [state, setState] = useState({ error: "" });
  const route = useRouter();

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

      if (resultSingIn?.ok) {
        const session = await getSession();
      } else {
        throw new Error("Invalid username or password");
      }

      route.push("/dashboard");
    } catch (error: any | Error) {
      setState({ error: error.message });
    }
  };

  return (
    <section className={styles.container}>
      <GithubSignIn />
      <div className={styles.imgContainer}>
        <Image
          src="/login.svg"
          width={30}
          height={30}
          alt="Login Image"
          className={styles.img}
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={userInfo.username}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={userInfo.password}
        />
        <button type="submit">Login</button>
        {state?.error && <p className="text-red-500">{state?.error}</p>}
        <Link href="/register">
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </section>
  );
};

export default LoginForm;
