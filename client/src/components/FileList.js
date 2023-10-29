import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        console.log('Couldnt get files');
      }
    };

    viewFiles();
  }, []); 

  const handleFileClick = async (files) => {
    try {
      const fileNames = files.target.innerHTML;
      navigate(`/code/${fileNames}`);
      await fetch(`http://localhost:5000/code/${fileNames}`);
      // const code = await response.json();
      // setCode(code);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="file-list">
      {files.map((files) => (
        <div key={files} onClick={handleFileClick}>
          <font color="white">{files}</font>
        </div>
      ))}
    </div>
  );
};

export default FileList;
