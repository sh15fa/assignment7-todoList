import "./App.css";
import React, { useEffect, useState } from "react";
import EditDialog from "./editDialog";

import { v4 as uuidv4 } from "uuid";
const App = () => {
 const [taskStatus,setTaskStatus]=useState(true);
 const [task,setTask]=useState('');
 const[checked,setChecked]=useState(false);

 const[tasksList,setTasksList]=useState([{
  id:'',
  taskName:''
 }]);
 

 function handleTaskInput(e){
      setTask(e.target.value);
      setTaskStatus(true);
  }

  function addTaskHandler(e){
    e.preventDefault();
    if(task===''){
      setTaskStatus(false);
    }
    else{
      setTaskStatus(true);
      const tasksAdded=[...tasksList,
      {id:uuidv4(),
      taskName: task}];
      setTasksList(tasksAdded);
      localStorage.setItem('tasks',JSON.stringify(tasksAdded));
        
    }
    setTask('');
  }
  useEffect(()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'));
    setTasksList(storedTasks);
  },[tasksList])

  const showTasks=tasksList.map((taskk)=>{
    return(
      <div className="todo" key={taskk.id}>
        <div className="todo-text">
          <input className="checkbox" type="checkbox" id="isCompleted" value={checked} onChange={handleChecked}/>
        </div>
        <div >{taskk.taskName}</div>

        <div className="todo-actions">
        <EditDialog editValue={taskk.taskName} valueId={taskk.id} taskList={tasksList}/>
          <button className="submit-edits" onClick={()=>deleteTaskHandller(taskk.id)}>Delete</button>
        </div>
      </div>
    );
  })
  //-----------------TASKS LIST-------------------
  function handleChecked(e){
    setChecked(e.target.checked);
    console.log(e.target.checked);
    console.log('checkkkkkkkk ',checked);


  }
 
  
  
  function deleteTaskHandller(id){
      const tasks=tasksList.filter((taskk)=>taskk.id !== id);
      setTasksList(tasks);
      localStorage.setItem('tasks',JSON.stringify(tasks));

  }

  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <div className="form">
      <form onSubmit={addTaskHandler}>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          onChange={handleTaskInput}
          value={task}
        />
        <button type="submit" className="add-button">
          Add
        </button>
       
      </form>
      {!taskStatus && task===''&&  <div className="validate">Please Write a task it must not be empty</div>}
      </div>
      {showTasks}
    </div>
  );
};
export default App;
