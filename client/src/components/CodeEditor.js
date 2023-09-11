import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

// Code snippets for different languages
const codeSnippets = {
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("hello code"); \n\t// Your Java code here\n  }\n}`,
  python: `print("Hello World")`,
  javascript: `console.log("Hello World")`,
  js: `console.log("Hello World")`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World!";\n    return 0;\n}`,
  c: `#include <stdio.h>\nusing namespace std;\nint main() {\n    printf("Hello World!");\n    return 0;\n}`,
};

const CodeEditor = ({ value, onChange, language }) => {
  const [editorCode, setEditorCode] = useState(value || codeSnippets[language]);
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
        automaticLayout: true,
        lineNumbers: true,
        minimap: false,
        colorDecorators: true,
        colorDecoratorsActivatedOn: 'hover',
        copyWithSyntaxHighlighting: 'true',
        fontSize: 16,
        wordWrap: 'on',
        formatOnType: true,
        autoClosingBrackets: true,
        inlineSuggest: true,
        codeLens: true,
        cursorBlinking: 'smooth',
        cursorStyle: 'line-thin',
        quickSuggestions: true,
        quickSuggestionsDelay: 1,
        glyphMargin: true,
        matchOnWordStartOnly: true,
        multiCursorLimit: 10,
        showDeprecated: true,
        smoothScrolling: true,
        showSnippets: true,
        snippetsPreventQuickSuggestions: false,
        showStatusBar: true,
        suggest: 'showSnippets',
      }}
    />
  );
};

export default CodeEditor;
