import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

function About() {
  return (
    <div className="flex w-full grow flex-col items-center justify-between gap-2 md:flex-row-reverse md:gap-4">
      <div className="flex h-full w-full flex-col items-start justify-between gap-2 px-3 py-6 text-left md:w-1/2">
        <div className="flex h-full flex-col items-start justify-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-500/80 md:text-3xl">
            We create digital ideas that are bigger, bolder, braver and better.
          </h1>
          <p className="flex flex-1 flex-col items-center justify-center">
            We create digital ideas that are bigger, bolder, braver and better.
            We believe in good ideas flexibility and precission We’re world’s
            Our Special Team best consulting & finance solution provider. Wide
            range of web and software development services.
          </p>
        </div>
        <div className="flex h-full w-full items-center justify-between md:w-[80%]">
          <div className={styles.box}>
            <h1>20 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>50 K+</h1>
            <p>Year of Employees</p>
          </div>
          <div className={styles.box}>
            <h1>200 K+</h1>
            <p>Customers</p>
          </div>
        </div>
      </div>
      <div className="rounded-mb h-full w-full px-4 md:w-1/2">
        <Image
          src="/about.svg"
          alt="About Image"
          width={40}
          height={40}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default About;
