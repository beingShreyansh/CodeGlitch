import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputDisplay from './OutputDisplay';
import Navbar from './navabar';
import './styles/home.css';

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCompile = async () => {
    try {
      const response = await fetch('http://localhost:5000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, selectedLanguage }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error compiling code:', error);
    }
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
              {console.log("hi")}
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
                <button>Save</button>
              </div>
              <div className="btn download">
                <button>Download</button>
              </div>
              <div className="btn">
                <button className="button-68" onClick={handleCompile}>
                  Compile
                </button>
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
              <OutputDisplay output={output} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

{
  /* <div className="langSelect">
<div id="select-button" class="section">
  <div id="selected-value">
    <span>Select a platform</span>
  </div>
</div>

<input
  type="radio"
  id="python"
  value="python"
  checked={selectedLanguage === 'python'}
  onChange={() => setSelectedLanguage('python')}
/>
<span class="label">Python</span>
<span class="opt-val">Python</span>
<input
  type="radio"
  id="java"
  value="java"
  checked={selectedLanguage === 'java'}
  onChange={() => setSelectedLanguage('java')}
/>
<span class="label">Java</span>
<span class="opt-val">Java</span>
<input
  type="radio"
  id="js"
  value="js"
  checked={selectedLanguage === 'js'}
  onChange={() => setSelectedLanguage('js')}
/>
<span class="label">JavaScript</span>
<span class="opt-val">JavaScript</span>

<input
  type="radio"
  id="c"
  value="c"
  checked={selectedLanguage === 'c'}
  onChange={() => setSelectedLanguage('c')}
/>
<span class="label">C</span>
<span class="opt-val">C</span>

<input
  type="radio"
  id="cpp"
  value="cpp"
  checked={selectedLanguage === 'cpp'}
  onChange={() => setSelectedLanguage('cpp')}
/>
<span class="label">C++</span>
<span class="opt-val">C++</span>
</div>
<div id="option-bg"></div> */
}
