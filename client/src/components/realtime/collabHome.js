import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../../Actions';
import Client from './components/client-avatar';
import Navbar from '../navabar';
import CollabEditor from './components/collabEditor';
import axios from 'axios';
import OutputDisplay from '../OutputDisplay';
import { initSocket } from './socket';
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
  Link,
} from 'react-router-dom';

import './styles/collabHome.css';
const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const [inputValue, setInputValue] = useState('');

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

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/collab ');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
      toast.error('Could not copy the Room ID');
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/collab');
  }

  // if (!location.state) {
  //   return <Navigate to="/collab" />;
  // }

  return (
    <>
      <div className="mainWrap">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="main-container">
          <div className="aside">
            <div className="asideInner">
              <h3>Connected</h3>
              <div className="clientsList">
                {clients.map((client) => (
                  <Client key={client.socketId} username={client.username} />
                ))}
              </div>
            </div>
            <div className="btn-class">
              <button className="btn copyBtn" onClick={copyRoomId}>
                Copy ROOM ID
              </button>
              <button className="btn leaveBtn" onClick={leaveRoom}>
                Leave
              </button>
            </div>
          </div>
          {/* <div className="Editor-wrap">
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
                <CollabEditor
                  value={code}
                  onChange={setCode}
                  language={selectedLanguage}
                  socketRef={socketRef}
                  roomId={roomId}
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
          </div> */}
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
                <CollabEditor
                  value={code}
                  onChange={setCode}
                  language={selectedLanguage}
                  socketRef={socketRef}
                  roomId={roomId}
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
      </div>
    </>
  );
};

export default EditorPage;
