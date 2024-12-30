import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("draftEditorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (chars, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const startOffset = selectionState.getStartOffset();
    const block = currentContent.getBlockForKey(startKey);
    const text = block.getText();

    if (startOffset === 1) {
      switch (text[0] + chars) {
        case "# ":
          applyBlockStyle(editorState, "header-one");
          return "handled";
        case "* ":
          applyInlineStyle(editorState, "BOLD");
          return "handled";
        case "**":
          applyInlineStyle(editorState, "RED");
          return "handled";
        case "***":
          applyInlineStyle(editorState, "UNDERLINE");
          return "handled";
        default:
          break;
      }
    }

    return "not-handled";
  };

  const applyBlockStyle = (editorState, style) => {
    const contentState = Modifier.removeRange(
      editorState.getCurrentContent(),
      editorState.getSelection().merge({ anchorOffset: 0 }),
      "backward"
    );
    const newState = EditorState.push(editorState, contentState, "remove-range");
    setEditorState(RichUtils.toggleBlockType(newState, style));
  };

  const applyInlineStyle = (editorState, style) => {
    const contentState = Modifier.removeRange(
      editorState.getCurrentContent(),
      editorState.getSelection().merge({ anchorOffset: 0 }),
      "backward"
    );
    const newState = EditorState.push(editorState, contentState, "remove-range");
    setEditorState(RichUtils.toggleInlineStyle(newState, style));
  };

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("draftEditorContent", JSON.stringify(rawContent));
    alert("Content saved successfully!");
  };

  const styleMap = {
    RED: {
      color: "red",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Demo Editor By Harsh Vardhan Singh</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
        }}
        onClick={() => {
          const editor = document.querySelector(".DraftEditor-root");
          if (editor) editor.focus();
        }}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          customStyleMap={styleMap}
          handleBeforeInput={handleBeforeInput}
        />
      </div>
      <button
        style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer",backgroundColor:"blue",borderRadius:"25px",color:"white"}}
        onClick={saveContent}
      >
        Save
      </button>
    </div>
  );
};

export default DraftEditor;
