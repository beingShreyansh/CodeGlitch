import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputDisplay from './OutputDisplay';
import Navbar from './navabar';
import './styles/home.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const [inputValue, setInputValue] = useState('');

  // const { isAuthenticated, user } = useAuth0();

  // console.log(user, 'is user');
  const handleCompile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/compile', {
        code,
        selectedLanguage,
        inputValue,
      });
      const data = response.data;
      setOutput(data.output);
    } catch (error) {
      console.error('Error compiling code:', error);
    }
  };

  const handleSave = async () => {
    const fname = window.prompt('Please enter a filename');

    try {
      const response = await axios.post('http://localhost:5000/save', {
        fileName: fname,
        code,
        selectedLanguage,
      });
      if (response) {
        toast.success(`File saved`);
      } else {
        toast.error('Empty data feild');
      }
    } catch (error) {
      console.error('Error Saving the code:', error);
      toast.error('Empty data feild');
    }
  };

  const handleInputChange = (newInput) => {
    setInputValue(newInput);
  };

  const getHeadingText = () => {
    switch (selectedLanguage) {
      case 'java':
        return 'Main.java';
      case 'python':
        return 'Main.py';
      case 'c':
        return 'Main.c';
      case 'cpp':
        return 'Main.cpp';
      case 'js':
        return 'index.js';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="App">
        <Navbar />

        <div className="Editor-wrap">
          <div className="editor-window">
            <div className="options">
              <div className="langHead">
                <h3>{getHeadingText()}</h3>
              </div>
              <div className="langSelect">
                <select
                  id="languageSelect"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="js">JavaScript</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              <div className="btn save">
                <button onClick={handleSave}>Save</button>
              </div>
              <div className="btn">
                <Link to="/files">
                  <button onClick={Navigate('/files')}>View Files</button>
                </Link>
              </div>
              <div className="btn download">
                <button>Download</button>
              </div>
              <div className="btn">
                <button onClick={handleCompile}>Compile</button>
              </div>
            </div>

            <div className="codeEditor">
              <CodeEditor
                value={code}
                onChange={setCode}
                language={selectedLanguage}
              />
            </div>
          </div>
          <div className="output-Window">
            <div className="options">
              <div className="langHead">
                <h3> output : </h3>
              </div>
            </div>
            <div className="outputDisplay">
              <OutputDisplay
                output={output}
                input={inputValue}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
