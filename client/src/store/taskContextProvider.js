import { useState } from "react";
import taskContext from "./taskContext";

const TaskContextProvider = ({ children }) => {

    const [taskList, setTasks] = useState([]);

    const deleteTask = (id)=>{
        const filterdTasks = taskList.filter((task)=>{
            return task.id !== id;
        })
        setTasks(()=>[...filterdTasks]);
    }

    const updateTask = (task)=>{
        const filterdTasks = taskList.map((t)=>{
            if(task.id === t.id){
                return task
            }
            return t;
        })
        setTasks(()=>[...filterdTasks]);
    }

    const addTask = (task)=>{
        setTasks((preTasks)=>[...preTasks, task])
    }

    return (
        <taskContext.Provider value={{taskList, setTasks, deleteTask, addTask, updateTask}}>
            {children}
        </taskContext.Provider>
    )
}

export default TaskContextProvider
