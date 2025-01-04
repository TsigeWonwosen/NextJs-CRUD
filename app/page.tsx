import { getServerSession } from "next-auth";
import { Options } from "./libs/auth";
import styles from "./Home.module.css";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(Options);
  return (
    <>
      <div>
        <p>Welcome, {session?.user?.name || "Guest"}</p>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>Creative Thoughts Agency.</h1>
            <p className={styles.desc}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
              blanditiis adipisci minima reiciendis a autem assumenda dolore.
            </p>
            <div className={styles.buttons}>
              <button className={styles.button}>Learn More</button>
              <button className={styles.button}>Contact</button>
            </div>
            <div className={styles.brands}>
              <Image src="/about.svg" alt="" fill className={styles.brandImg} />
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image src="/vercel.svg" alt="" fill className={styles.heroImg} />
          </div>
        </div>
      </div>
    </>
  );
}
