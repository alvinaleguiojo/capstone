import React from "react";
import Link from "next/link";
import styles from "../styles/Layout.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/todo">Patient</Link>
      <Link href="/medicine">Medicine</Link>
      <Link href="/appointment">Appointment</Link>
      <Link href="/services">Services</Link>
    </div>
  );
};

export default Navbar;
