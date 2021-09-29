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

We will transform our app Components     
from stateless indiviual Components    
to individual Components with State    

#### Stateless Component: Separate in different Components

First, we will separate out our App into separate Components.     
eg: separate ```<li>``` in a separate Component

 in App.jsx
```html
        <ul>
          {items.map((todoItem) => (
            <ToDoItem text={todoItem} />
          ))}
        </ul>
```
In order to display a different ToDoItem each time we map through our items array,       
we're going to pass this ToDoItem which is the ```text```(as a prop, we can give it any name) ,      
this should display as a property.      
Now we receive this text inside our ToDoItem as one of the props ```{props.text}```    

in ToDoItem.jsx
```javascript
import React from "react";
function ToDoItem(props) {
  return <li>{props.text}</li>;
}
export default ToDoItem;
```

Right now, we can't modify our props because props is read-only...    
...But we can have state inside these components.

#### State in individual Components

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


⚠️ Uncomplete

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
* How to manage state in a Parent Component  
* 
* Separate in different components
* Manage State in individual components
* How state is handled across the app and components
