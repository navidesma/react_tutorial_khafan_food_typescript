import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <h1 style={{marginTop: "0.8rem", marginRight: "0.7rem"}}>نرم افزار سفارش غذا</h1>
                <div style={{display: "flex", marginLeft: "1rem"}}>
                    <a href="#">
                        <button className={styles.navbarLinkButton}>link 1</button>
                    </a>
                    <a href="#">
                        <button className={styles.navbarLinkButton}>link 1</button>
                    </a>
                    <a href="#">
                        <button className={styles.navbarLinkButton}>link 1</button>
                    </a>
                </div>
            </div>
        </nav>
    );
}
