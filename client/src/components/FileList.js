import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/fileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const viewFiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/files');
        const files = await response.json();
        setFiles(files);
      } catch (error) {
        console.log("Couldn't get files");
      }
    };

    viewFiles();
  }, []);

  const handleFileClick = async (fileName) => {
    try {
      navigate(`/code/${fileName}`);
      // You can add additional logic here if needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="file-list">
      {files.map((fileName) => (
        <div
          key={fileName}
          onClick={() => handleFileClick(fileName)}
          className="file-item"
        >
          <span>{fileName}</span>
        </div>
      ))}
    </div>
  );
};

export default FileList;
