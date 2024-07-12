import React from "react";

export default function usePagination() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [count, setCount] = React.useState(0);

    return { currentPage, setCurrentPage, count, setCount };
}
