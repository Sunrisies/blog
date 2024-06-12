"use client"
import React, { useState } from 'react';  
  
const FileUpload = () => {  
  const [file, setFile] = useState(null);  
  const [markdownContent, setMarkdownContent] = useState('');  
  
  const handleFileChange = (e) => {  
    const selectedFile = e.target.files[0];  
    if (selectedFile) {  
        console.log(selectedFile,'selectedFile')
      setFile(selectedFile);  
      const reader = new FileReader();  
  
      reader.onload = (event) => {  
        console.log(event.target.result);  
        setMarkdownContent(event.target.result);  
      };  
  
      reader.readAsText(selectedFile);  
    }  
  };  
  
  return (  
    <div>  
      <input type="file" onChange={handleFileChange} />  
      {file && <p>Selected file: {file.name}</p>}  
      {markdownContent && (  
        <pre>  
          <code>{markdownContent}</code>  
        </pre>  
      )}  
    </div>  
  );  
};  
  
export default FileUpload;