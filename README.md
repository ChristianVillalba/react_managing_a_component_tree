# React: Managing A Component Tree
Created with [CodeSandbox](https://codesandbox.io/)  
Notes from: React module  
[The Complete 2021 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/)  
Instructor: Dr. Angela Yu 


## Description
This app is a To-Do List consisting of:
* A heading "To-Do List".
* Form:
  * An Input text that allows us to write the our task.
  * An Add Button that adds the new task to the list of pending tasks.
* An unoreded list with our pending tasks.




---
## Notes

### Managing A Component Tree:
How our state is handled across the app and different components.      

#### Stateless Component

A stateless component is not trying to change itself or anything else.      
It is receiving some read-only properties and it just displays them inside.

#### State in individual Components

We can manage state in individual Components.       
eg: li Element can be lined-through when clicked (click again to cancell style): 
```javascript
import React, { useState } from "react";

function ToDoItem(props) {
  const [isDone, setIsDone] = useState(false);
  function handleClick() {
    setIsDone((prevValue) => {
      return !prevValue;  // Retrun the opposite to the prevValue
    });
  }
  return (
    <div>
      <li
        onClick={handleClick}
        style={{ textDecoration: isDone ? "line-through" : "none" }}
      >
        {props.text}
      </li>
    </div>
  );
}

export default ToDoItem;
```

### State in a Parent Component

How to manage state in a Parent Component        
eg: how to delete a ToDoItem: deleting an item from our items Array (in App.jsx)

When we pass over props to our child components,       
we can also pass over functions which gets called by our child component.

First, we will need to simplify our ToDoItems (in ToDoItems.jsx)
```javascript
import React from "react";

function ToDoItem(props) {
  return (
    <div>
      <li onClick={props.onChecked}>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
```
In our ToDoItems.jsx the Attribute ```onClick``` will trigger ```props.onChecked```,       
A function that will be placed on App.jsx



---
## What I have learned with this project:
