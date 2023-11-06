import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface PaginationProps {
  pageChangeHandler: (page: number) => void;
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageChangeHandler,
  totalRows,
  rowsPerPage,
  currentPage,
}) => {
  const noOfPages = Math.ceil(totalRows / rowsPerPage);
  const pagesArr = [...new Array(noOfPages)];

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const [pageFirstRecord, setPageFirstRecord] = useState(1);
  const [pageLastRecord, setPageLastRecord] = useState(rowsPerPage);

  const onNextPage = () => pageChangeHandler(currentPage + 1);
  const onPrevPage = () => pageChangeHandler(currentPage - 1);
  const onPageSelect = (pageNo: number) => pageChangeHandler(pageNo);

  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  useEffect(() => {
    const skipFactor = (currentPage - 1) * rowsPerPage;
    setPageFirstRecord(skipFactor + 1);
  }, [currentPage]);

  useEffect(() => {
    const count = pageFirstRecord + rowsPerPage;
    setPageLastRecord(count > totalRows ? totalRows : count - 1);
  }, [pageFirstRecord, rowsPerPage, totalRows]);

  const handlePageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPage = parseInt(event.target.value, 10);
    if (!isNaN(enteredPage) && enteredPage > 0 && enteredPage <= noOfPages) {
      onPageSelect(enteredPage);
    }
  };

  const renderPageNumbers = () => {
    const firstPage = Math.max(currentPage - 4, 1);
    const lastPage = Math.min(currentPage + 4, noOfPages);

    const pageNumbers = [];

    for (let i = firstPage; i <= lastPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => onPageSelect(pageNumber)}
        className={`${styles.pageBtn} ${
          pageNumber === currentPage ? styles.activeBtn : ""
        }`}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <>
      {noOfPages > 1 ? (
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Showing {pageFirstRecord} - {pageLastRecord} of {totalRows}
          </div>
          <div className={styles.pageInput}>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageInput}
              min={1}
              max={noOfPages}
            />
            <span> of {noOfPages}</span>
          </div>
          <div className={styles.pagebuttons}>
            <button 
              className={styles.pageBtn}
              onClick={onPrevPage}
              disabled={!canGoBack}
            >
              &#8249;
            </button>
            {renderPageNumbers()}
            <button
              className={styles.pageBtn}
              onClick={onNextPage}
              disabled={!canGoNext}
            >
              &#8250;
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
