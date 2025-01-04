import React from "react";
import Link from "next/link";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";

function Links({ path, name }: { path: string; name: string }) {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`${styles.navButton} ${pathName === path && styles.active}`}
    >
      {name}
    </Link>
  );
}

export default Links;
