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
to Individual Components with State    
To Components changing the state of the Parent Component      

### Stateless Component: Separate in different Components

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

### State in individual Components

eg: ```<li>```  List Item Element can be lined-through when clicked (click again to cancel style): 

in ToDoItem.jsx 
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
**Basic Style:**       
```style={{textDecoration: "line-through"}}```      
We wanted the ```style``` "line through" to be applied,     
We test if we can use inline styling.      
Let's tap into the ```style={}``` property and inside it,     
we add a Javascript Object ```{textDecoration: "line-through"}```     
as the code and the property was called textDecoration      
and then the value was called line-through (as a string).     

Render our style depending of a condition:     

**When the condition will change:**     
But we need our style to be rendered depending on a condition:    
If the user has clicked on this to do item ```onClick```.     
When it happens I will call a Function ```onClick={handleClick}```.     

**Functions that will be triggered when the condition changes:**     
When ```onClick``` happens, I want to set a boolean to true or to false depending on      
whether if this text decoration should be applied:      
```const [isDone, setIsDone] = useState(false);```       
I created a const and I will set it to True or False depending on whether if the user clicked on this,    
to remeber the previous state, we need ```useState```,       
The Initial Value is setted to false as default (it is not done yet with no line-through).    
...But  if the user clicks...         
then I should be able to handle this click ```onClick={handleClick}``` and call ```setIsDone```.
```javascript
function handleClick() {
    setIsDone((prevValue) => {
      return !prevValue;  // Retrun the opposite to the prevValue
    });
  }
export default ToDoItem;
```
And I want to set to the opposite of what it currently is:       
```setIsDone((prevValue) => {return !prevValue;}```          
So I use an Arrow Statement to get the previous value ```(prevValue)```      
and then I can return the opposite of the previous value. ```!prevValue```       

**Change on the conditions will render our style:**    
Use ```isDone``` to conditionally render our style.
```javascript
<li onClick={handleClick} 
    style={{ textDecoration: isDone ? "line-through" : "none" }}
    >
     {props.text}
</li>
```
We have ```textDecoration:``` with  ```CONDITION ? DO IF TRUE : DO IF FALSE``` (2 textDecorations)      
if ```isDone``` is ```true``` (textDecoration) should be the ```"line-through"```        
else ```isDone``` is ```false``` (textDecoration) should be the ```"none"```      

This is state being managed inside our ToDoItem, but (state) is localized to this item.      
What if we wanted to change the state of a parent component?      
what if we wanted to delete it from our items Array (App.jsx)?     
How do we reach up from our ToDoItem into its parent     

### State in Parent Component


---
⚠️ Uncomplete

---

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
* Separate App in different Components
  * Stateless Component
  * Props
* Manage State in individual components
  *  Inline Styling, 
  *  Conditional Rendering
  *  Ternary Operators 
  *  Event Handling and 
  *  Using State
  *  Arrow Statement
* How state is handled across the app and components
  *  An Idividual Component  changing its Parent Component
     *  Component from ToDoItem.jsx changing the items Array in App.jsx
