import React from "react";

function ToDoItem(props) {
  return (
    <div>
      <li onClick={props.onChecked}>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
