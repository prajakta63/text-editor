import React from "react";

const SaveButton = ({ onSave }) => {
  return (
    <button onClick={onSave} style={{ marginTop: "10px" }}>
      Save
    </button>
  );
};

export default SaveButton;
