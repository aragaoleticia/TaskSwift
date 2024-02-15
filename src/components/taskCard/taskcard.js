import { useEffect, useState } from 'react';
import './taskcard.css';
import TaskForm from '../taskForm/taskForm';
import Todo from '../Todo/todo';
import { v4 as uuidv4 } from 'uuid';
import EditForm from '../taskForm/editForm';
import AddTodo from './addtodo';
import Cards from '../Cards/cards';


const TaskCard = () => {

    const [tasks, setTasks] = useState([]);

    const addTodo = (task) => {
        const newList = [...tasks, {task: task, id: uuidv4(),
            completed: false, isEditing: false}]
        setTasks(newList);
        
    };
    

    const toggleCompleted = id => {
        setTasks(tasks.map(task =>{
            if(task.id === id){
                return {...task, completed: !task.completed}
            }else{
                return task
            }
        } ))
    };

    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id))
    };

    const editTask = (id) => {
        setTasks(tasks.map(task =>{
            if(task.id === id){
                return {...task, isEditing: true}
            }else{
                return task
            }
        }))
    };

    const editingTodo = (newName, id) => {
        setTasks(tasks.map(task =>{
            if(task.id === id){
                return {...task, task: newName, isEditing: false}
            }else{
                return task
            }
        }))
        
    };


    const [showTaskForm, setShowTaskForm] = useState(false);
    const [hiddeAddTodo, setHiddeAddTodo] = useState(true);

    const handleCardClick = () => {
        setShowTaskForm(true);
        setHiddeAddTodo(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(!event.target.closest('.addTodo') && !event.target.closest('.taskForm')){
                setShowTaskForm(false);
                setHiddeAddTodo(true);
            }
        };
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);



    return(
        <div className='container'>
            <div className='container-todo'>
                <div className='card'>
                    <textarea placeholder='To do'></textarea>
                        {hiddeAddTodo && <AddTodo handleCardClick={handleCardClick}/>}
                        {showTaskForm && <TaskForm addTodo={addTodo} />}  

                        {tasks.map((task, index) => (
                            task.isEditing ? 
                            (<EditForm key={task.id} task={task} editingTodo={editingTodo} />)
                                : 
                        (<Todo 
                                task={task}
                                key={index}
                                toggleCompleted={toggleCompleted}
                                deleteTask={deleteTask}
                                editTask={editTask}
                                />)
                        ))}
                </div>
            </div>   

            <Cards  label='Doing'/>
            <Cards  label='Done'/>
        </div>                           

    )
}

export default TaskCard;