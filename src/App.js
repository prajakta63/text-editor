import React from "react";
import "./styles.css";
import Title from "./components/Title";
import DraftEditor from "./components/DraftEditor";

export default function App() {
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
      }}
    >
      <Title />
      <DraftEditor />
    </div>
  );
}
