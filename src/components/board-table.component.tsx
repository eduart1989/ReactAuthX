import React, { useState, useEffect } from "react";
import Table from "./table/table";
import Pagination from "./table/pagination";
import  {getBanksData,  BankColumns } from "../services/bank-services";
import styled from "styled-components";
import { AnimatedText } from "./animated/animated-text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoardTable: React.FC = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalRows: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    getBanksData(currentPage).then((info) => {
      const { totalPages, totalRows, data } = info;

      setPageData({
        isLoading: false,
        rowData: data as never[],
        totalPages,
        totalRows,
      });
    });
  }, [currentPage]);

  return (
    <Container>
      <div className="container">
        <div className="jumbotron">
          <div className="container">
          <AnimatedText 
            name={`Bank Information, Total Record: ${
              pageData.totalRows 
            }`}
            
          />
          <button className= "btn btn-primary mt-3" onClick={() => setCurrentPage(1)}>Reset</button>

          </div>
          <div className="container mt-4" style={{ overflowX: "auto" }}>
            <Table
              columns={BankColumns}
              data={pageData.rowData as never[]}
              isLoading={pageData.isLoading}
            />
          </div>
          <div className="container">
            <Pagination
              totalRows={pageData.totalRows}
              pageChangeHandler={setCurrentPage}
              rowsPerPage={15}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BoardTable;
