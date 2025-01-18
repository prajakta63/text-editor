import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "../Draft.css";
import SaveButton from "./SaveButton.js";

const styleMap = {
  BOLD: { fontWeight: "bold" },
  RED: { color: "red" },
  UNDERLINE: { textDecoration: "underline" },
};

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(savedContent));
        return EditorState.createWithContent(contentState);
      } catch (e) {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const onChange = (newState) => {
    setEditorState(newState);
  };

  const handleBeforeInput = (char) => {
    if (char !== " ") return "not-handled";

    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const text = block.getText();

    if (selection.getStartOffset() !== text.length) return "not-handled";

    let newEditorState = editorState;

    if (text === "#") {
      newEditorState = RichUtils.toggleBlockType(editorState, "header-one");
      newEditorState = removeMarker(newEditorState, 1);
      setEditorState(newEditorState);
      return "handled";
    } else if (text === "*") {
      newEditorState = applyInlineStyle(editorState, "BOLD", 1);
      setEditorState(newEditorState);
      return "handled";
    } else if (text === "**") {
      newEditorState = applyInlineStyle(editorState, "RED", 2);
      setEditorState(newEditorState);
      return "handled";
    } else if (text === "***") {
      newEditorState = applyInlineStyle(editorState, "UNDERLINE", 3);
      setEditorState(newEditorState);
      return "handled";
    }

    return "not-handled";
  };

  const applyInlineStyle = (editorState, style, markerLength) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const text = block.getText();

    // Remove marker characters
    const updatedText = text.slice(markerLength).trimStart();
    const contentWithoutMarker = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: 0,
        focusOffset: text.length,
      }),
      updatedText
    );

    let newEditorState = EditorState.push(
      editorState,
      contentWithoutMarker,
      "remove-range"
    );

    // Apply the style
    newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);

    return newEditorState;
  };

  const removeMarker = (editorState, markerLength) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const text = block.getText();

    const updatedText = text.slice(markerLength).trimStart();
    const contentWithoutMarker = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: 0,
        focusOffset: text.length,
      }),
      updatedText
    );

    return EditorState.push(editorState, contentWithoutMarker, "remove-range");
  };

  const saveContent = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
  };

  return (
    <div className="editor-container">
      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={styleMap}
          placeholder="Start typing..."
        />
      </div>
      <SaveButton onSave={saveContent} />
    </div>
  );
};

export default DraftEditor;
