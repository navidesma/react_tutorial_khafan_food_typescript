import styles from "./Notification.module.css";
import { createPortal } from "react-dom";
import { NotificationType } from "@/interfaces.ts";

export default function Notification({ type, message }: NotificationType) {
    return createPortal(
        <div
            className={styles.notification}
            style={{
                backgroundColor:
                    type === "error"
                        ? "#D32F2F"
                        : type === "info"
                          ? "#0288D1"
                          : type === "success"
                            ? "#4CAF50"
                            : "#F57F17",
            }}
        >
            <h3>{message}</h3>
        </div>,
        document.getElementById("notification")!,
    );
}
