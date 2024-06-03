import styles from "./Navbar.module.css";
import Button from "@/components/Button/Button.tsx";
import logo from "@/resources/images/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link to={"/home"}>
                    <h1 style={{ marginTop: "0.8rem", marginRight: "1.5rem" }}>خفن فود</h1>
                </Link>
                <img src={logo} alt='' width='70px' height={"70px"} />
                <div style={{ display: "flex", marginLeft: "1rem" }}>
                    <Link to='/shopping-cart' style={{ margin: "0.5rem" }}>
                        <Button size={"small"} variant={"outlined"}>
                            سبد خرید
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
