import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

// Code snippets for different languages
const codeSnippets = {
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t// Your Java code here!\n  }\n}`,
  python: `# Write your Code here!`,
  javascript: `// Write your Code here!`,
  js: `// Write Your code here!`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n\t// Write your Code!\n\treturn 0;\n}`,
  c: `#include <stdio.h>\nint main() {\n\t// Write Your code!\n\treturn 0;\n}`,
};

const CodeEditor = ({ value, onChange, language }) => {
  const [editorCode, setEditorCode] = useState(value || codeSnippets[language]);
  const { fileName } = useParams();
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`http://localhost:5000/code/${fileName}`);
        const code = await response.json();
        if (response) {
          setEditorCode(code.code);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCode();
  }, [fileName]);

  if (language === 'js') {
    language = 'javascript';
  }
  useEffect(() => {
    // Update the editor code when the language or value changes
    setEditorCode(value || codeSnippets[language] || '');
  }, [value, language]);

  const handleEditorChange = (newCode) => {
    setEditorCode(newCode);
    onChange(newCode);
  };

  return (
    <MonacoEditor
      language={language}
      theme="vs-dark"
      loading="Loading..."
      value={editorCode}
      height="90vh"
      onChange={handleEditorChange}
      options={{
        fontSize: '18',
        lineNumbers: true,
        minimap: false,
        wordWrap: 'on',
        formatOnType: true,
        autoClosingBrackets: true,
        inlineSuggest: true,
        codeLens: true,
        quickSuggestions: true,
        quickSuggestionsDelay: 1,
        glyphMargin: true,
        multiCursorLimit: 10,
        showDeprecated: true,
        smoothScrolling: true,
        showSnippets: true,
        showStatusBar: true,
      }}
    />
  );
};

export default CodeEditor;
