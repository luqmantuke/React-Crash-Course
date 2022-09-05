import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
function App() {
const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([
    
]
)

useEffect(()=>{
  const getTasks = async ()=>{
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  getTasks()

})

// Fetch Tasks
const fetchTasks = async()=>{
  const response  = await fetch(" http://localhost:5000/tasks")
  const data =  await response.json()
  return data

}

// Fetch Task
const fetchTask = async(id)=>{
  const response  = await fetch(`http://localhost:5000/tasks/${id}`)
  const data =  await response.json()
  return data

}

//  Delete Task
const deleteTask = async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE"

  })
  setTasks(tasks.filter((task)=>task.id !==id))
}

// Toggle Reminder
const toggleReminder = async(id)=>{
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const response = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })
const data = await response.json()
  setTasks(tasks.map((task)=>task.id === id ? {
    ...task, reminder: data.reminder
  } : task))
}

// Add Task
const addTask = async(task)=>{
  const response = await fetch('http://localhost:5000/tasks',{
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
const data = await response.json()
setTasks([...tasks, data])
//  const id =  Math.floor(Math.random() * 1000) + 1
//   const newTask = {id, ...task}
//   setTasks([...tasks, newTask])
}



  return (
    <Router>
    <div className="container">
   <Header title='luqman' onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} />
<Routes>
   <Route path="/" element={
    <>
    {showAddTask && <AddTask onAdd={addTask} />}
   {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={ deleteTask} onToggle={toggleReminder} /> :<p style={{color:'red'}}>No Tasks To Show</p> }
    </>
   }/>
  <Route path="/about" element={<About/>} />
   
  </Routes>
   <Footer />
    </div>

    </Router>
  );
}

export default App;
