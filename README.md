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

From the [Starting Files](https://codesandbox.io/s/es6-spread-operator-practice-completed-mm4qj?fontsize=14&hidenavigation=1&theme=dark&file=/src/components/App.jsx),
we will transform our app Components:     
To stateless indiviual Components...    
To Individual Components with State...    
To Components changing the state of the Parent Component      

---
## Stateless Component: Separate in different Components

First, we will separate out our App into separate Components.     
eg: separate ```<li>``` in a separate Component

 in App.jsx
```html
     ...<ul>
          {items.map((todoItem) => (
            <ToDoItem text={todoItem} />
          ))}
        </ul>...
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

---
## State in individual Components

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
Our style is ```textDecoration:``` with  ```CONDITION ? DO IF TRUE : DO IF FALSE``` (2 textDecorations)      
if ```isDone``` is ```true``` (textDecoration) should be the ```"line-through"```        
else if ```isDone``` is ```false``` (textDecoration) should be the ```"none"```      

This is state being managed inside our ToDoItem, but (state) is localized to this item.      
What if we wanted to change the state of a parent component?      
what if we wanted to delete it from our items Array (App.jsx)?     
How do we reach up from our ToDoItem into its parent     

---
## State in Parent Component

When we pass over **props** to our **child components**,       
we can also pass over **functions** which gets called by our **child component**.

In ToDoItems.jsx       
First, we will need to simplify our ToDoItems 
```javascript
import React from "react";

function ToDoItem(props) {
  function handleClick() {}
  return (
    <div>
      <li onClick=handleClick>{props.text}</li> 
    </div>
  );
}
export default ToDoItem;
```

In our App.jsx     
In addition to the text property (props), we can add more props: ```onChecked``` (or any name)     
and set this equal to a function inside our app component ```onChecked={deleteItem}```.     
```javascript
     ...<ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              text={todoItem}
              onChecked={deleteItem}
            />...
```
We create a function ```deleteItem``` and this was the function that we would pass to our child ToDoItem.
```javascript
function deleteItem() {console.log("deleteItem function was called")}
// console.log for testing
```

In ToDoItem.jsx        
We'll now be able to trigger, instead of ```handleClick```,      
we can trigger ```props.onChecked```
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

In  ToDoItems.jsx the Attribute ```onClick``` will trigger ```props.onChecked```,       
In App.jsx, the props ```onChecked``` will trigger the function ```deleteItem```      
(right now, the console will print "deleteItem function was called").
<!-- This means the entire function ```deleteItem``` is being packaged up      
and sent over to the ```<ToDoItem ... ... />``` under the prop ```onChecked```.
And then that prop is only triggered when the div detects a click (onClick). -->
In App.jsx
Now that we tested the the function ```deleteItem``` works,  we can address its functionality 
```javascript
  function deleteItem() {
    setItems((prevItems) => {});
  }
```
If I wanted to delete an item from my items Array (App.jsx), I'm going to need to call ```setItems()```,      
and inside of it, I'll need to get hold of the previous item ```(prevItems) => {}```     
but how to delete the specific item the requested deletion?

To delete the item that requested the deletion:         
When I call this onChecked, I could pass over something that identifies this particular ToDoItem      
We add ```id``` (props).
Remember that when we ```.map()``` through arrays and create components we should always have a ```key```.     
We add ```key``` (props).
```javascript
     ...<ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>...
```


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
