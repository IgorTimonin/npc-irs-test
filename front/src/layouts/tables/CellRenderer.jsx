import React from "react";

export default function cellRenderer(props) {
  const handleClick = () => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.getId(),
    });
  };
  return (
    <span className="">
      {props.editable && (
        <button type="button" style={{ height: "30px" }} onClick={handleClick}>
          ✎
        </button>
      )}
      <span style={{ paddingLeft: "4px" }}>{props.value}</span>
    </span>
  );
}
