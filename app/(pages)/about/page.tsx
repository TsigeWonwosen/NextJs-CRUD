import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

function About() {
  return (
    <div className="flex grow flex-col justify-between md:flex-row-reverse items-center w-full gap-2 md:gap-4 ">
      <div className="flex flex-col items-start justify-between h-full w-full  text-left md:w-1/2 py-6 px-3 gap-2">
        <div className="h-full flex justify-center flex-col items-start gap-4 ">
          <h1 className="font-semibold text-2xl md:text-3xl  text-gray-500/80">
            We create digital ideas that are bigger, bolder, braver and better.
          </h1>
          <p className="flex flex-col justify-center items-center flex-1">
            We create digital ideas that are bigger, bolder, braver and better.
            We believe in good ideas flexibility and precission We’re world’s
            Our Special Team best consulting & finance solution provider. Wide
            range of web and software development services.
          </p>
        </div>
        <div className="h-full w-full md:w-[80%] flex justify-between items-center ">
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
      <div className="h-full w-full rounded-mb px-4  md:w-1/2">
        <Image
          src="/about.svg"
          alt="About Image"
          width={40}
          height={40}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default About;
