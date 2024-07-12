import styles from "./Pagination.module.css";
import React from "react";

const PAGE_SIZE = 3;

export default function Pagination({
    count,
    currentPage,
    setCurrentPage,
}: {
    count: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
    const totalPages = Math.ceil(count / PAGE_SIZE);
    const pages = Array.from({ length: totalPages }, (x, i) => i + 1);
    return (
        <div className={styles.container}>
            <div
                className={styles.pageAction}
                onClick={
                    currentPage === 1
                        ? undefined
                        : () => setCurrentPage((prevState) => prevState - 1)
                }
            >
                &lt;
            </div>
            {pages.map((page) => (
                <div
                    onClick={() => setCurrentPage(page)}
                    className={styles.pageItem}
                    style={{
                        backgroundColor:
                            page === currentPage ? "var(--main-primary-color)" : undefined,
                    }}
                >
                    {page}
                </div>
            ))}
            <div
                className={styles.pageAction}
                onClick={
                    currentPage === totalPages
                        ? undefined
                        : () => setCurrentPage((prevState) => prevState + 1)
                }
            >
                &gt;
            </div>
        </div>
    );
}
