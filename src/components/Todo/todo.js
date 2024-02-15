import React, { useState } from "react";
import './todo.css';


function Todo({task, toggleCompleted, deleteTask, editTask}){

    const [classCompleted, setClassCompleted] = useState('');

    const handleClick = () => {
        toggleCompleted(task.id)
        setClassCompleted('completed')

    }

    return(
        <div className={`todo ${classCompleted}`}>
            <img src="/img/check.png" alt="Check icon"
                onClick={handleClick} className={classCompleted}
            />
            <p> 
                {task.task}
            </p>
            <div className="img-edit-trash">
                <img src='/img/pen-edit.png' alt="pen edit icon"
                    onClick={()=> editTask(task.id)}
                />
                <img src="/img/trash.png" alt="trash icon"
                    onClick={()=> deleteTask(task.id)}
                />
            </div>
        </div>
    )
}

export default Todo;


