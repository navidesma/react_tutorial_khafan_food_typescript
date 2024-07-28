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
    const pageOverflow = totalPages >= 7;
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
            {pageOverflow && currentPage !== 1 && (
                <>
                    <div className={styles.pageItem} onClick={() => setCurrentPage(1)}>
                        1
                    </div>
                    <div className={styles.pageItem}>...</div>
                </>
            )}
            {pages.map((page) =>
                !pageOverflow || page === currentPage ? (
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
                ) : (
                    <></>
                ),
            )}
            {pageOverflow && currentPage !== totalPages && (
                <>
                    <div className={styles.pageItem}>...</div>
                    <div className={styles.pageItem} onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                    </div>
                </>
            )}
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
