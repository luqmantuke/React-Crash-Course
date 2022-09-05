import React from 'react'
import {FaTimes} from 'react-icons/fa'

function Task({task, onDelete, onToggle}) {
  const reminderChecker = task.reminder ? 'task reminder' :  'task'
  return (
    <div className={reminderChecker} onDoubleClick={()=>onToggle(task.id)}>
  <h3 >{task.text} <FaTimes  style={{color: 'red', cursor: 'pointer'}} onClick={()=> onDelete(task.id)} /></h3>
    <p>{task.day}</p>

    </div>
  
  )
}

Task.propTypes = {}

export default Task
