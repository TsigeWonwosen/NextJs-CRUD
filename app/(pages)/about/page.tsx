import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

function About() {
  return (
    <div className="h-full  flex  flex-col md:flex-row justify-between  items-center  px-3 py-5 w-full gap-2 md:gap-4">
      <div className="w-full mb-10 md:mb-7">
        <div className="flex justify-evenly flex-col items-center gap-2 h-[400px]">
          <h1 className="font-semibold text-2xl md:text-4xl  text-gray-300">
            We create digital ideas that are bigger, bolder, braver and better.
          </h1>
          <p className="flex flex-col justify-center items-center flex-1">
            We create digital ideas that are bigger, bolder, braver and better.
            We believe in good ideas flexibility and precission We’re world’s
            Our Special Team best consulting & finance solution provider. Wide
            range of web and software development services.
          </p>
        </div>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.svg" alt="About Image" fill className={styles.img} />
      </div>
    </div>
  );
}

export default About;
