import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github_dark';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-inline_autocomplete';

const CodeEditor = ({ value, onChange }) => {
  // const [theme, setTheme] = useState('github_dak');
  // const handleTheme = () => {};
  const handleEditorChange = (newCode) => {
    onChange(newCode);
  };

  return (
    <>
      {/* <select>
        <option value="github-dark">Dark</option>
        <option value="github">Light</option>
      </select> */}
      <AceEditor
        mode="java"
        theme="github_dark"
        value={value}
        onChange={handleEditorChange}
        name="code-editor"
        fontSize={16}
        editorProps={{ $blockScrolling: true }}
        width="100%"
        wrapEnabled
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
      />
    </>
  );
};

export default CodeEditor;
