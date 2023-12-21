import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import ACTIONS from '../../../Actions';

const CollabEditor = ({ value, onChange, language, socketRef, roomId }) => {
  const editorRef = useRef(null);
  const [editorCode, setEditorCode] = useState(value || 'dd');

  useEffect(() => {
    // Initialize Monaco Editor when the component mounts
    editorRef.current = MonacoEditor;

    // Set up a listener for code changes from the socket
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          setEditorCode(code);
        }
      });
    }

    return () => {
      // Clean up the listener when the component unmounts
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  const handleEditorChange = (newValue) => {
    setEditorCode(newValue);

    // Send the new code to the parent component
    onChange(newValue);

    // Send the code change to the socket
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: newValue,
    });
  };

  return (
    <MonacoEditor
      language={language}
      theme="vs-dark"
      value={editorCode}
      onChange={handleEditorChange}
      height="90vh" // Set the desired height
      width="50vw"
      options={{
        automaticLayout: true,
        lineNumbers: 'on', // Use 'on' to show line numbers
        wordWrap: 'on', // Use 'on' to enable word wrapping
      }}
    />
  );
};

export default CollabEditor;
