import React from "react";
import styles from "./Main.module.css";
import Navbar from "@/components/Navbar/Navbar.tsx";

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className={styles.main}>{children}</main>
        </>
    );
}
