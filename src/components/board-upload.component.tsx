import React, { useState } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import {uploadBanksData} from "../services/bank-services";

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropzoneContainer = styled.div`
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #f5f5f5;
  color: #666666;
`;

const BoardUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setLoading(true);

    for (const file of acceptedFiles) {
      const fileData = await readFileData(file);
      sendDataToEndpoint(fileData);
    }
  };

  const readFileData = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          setLoading(true);
          setMessage("loading");

          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsBinaryString(file);
    });
  };

  const sendDataToEndpoint = (data: any[]) => {
    uploadBanksData(data).then(() => {
      setLoading(false);
      setMessage("success");
    });
  };

  return (
    <Container>
      <div className="container">
        <header className="jumbotron">
          <h3>Upload Excel File</h3>
          <div className="card">
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <DropzoneContainer {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag & drop Excel files here, or click to select files</p>
                </DropzoneContainer>
              )}
            </Dropzone>
            <div>
              <ul>
                {files.map((file, index) => (
                  <div className="bi bi-file-earmark-spreadsheet" key={index}>
                    {file.name}
                  </div>
                ))}
              </ul>
            </div>
            {loading && <Spinner />}

            <div className="form-group">
              <div className={message ? "alert alert-success" : ""} role="alert">
                {message}
              </div>
            </div>
          </div>
        </header>
      </div>
    </Container>
  );
};

export default BoardUpload;
