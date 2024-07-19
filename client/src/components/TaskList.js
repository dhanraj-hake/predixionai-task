import React, { useContext, useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import taskContext from '../store/taskContext';
import Loading from './Loading';
import TaskForm from './TaskForm';

const TaskList = () => {

    const { taskList, setTasks } = useContext(taskContext);
    const [loading, setLoading] = useState(false);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [status, setStatus] = useState("all");

    const closeAddTask = () => {
        setAddTaskModalOpen(false);
    }

    useEffect(() => {
        console.log(taskList)
        const getAllTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(process.env.REACT_APP_API_URL + "/tasks");
                const result = await response.json();
                setTasks(result);
                setFilteredTasks(result);
                console.log(result)
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
                alert("Error");
            }
        }
        getAllTasks()

    }, []);

    const filterByStatus = () => {

        if(status === "all"){
            setFilteredTasks(taskList);
        }
        else{
            const filterTasks = taskList.filter((task)=>{
                return task.status === status;
            })
    
            setFilteredTasks(filterTasks)
        }
    }

    useEffect(()=>{
        filterByStatus();
    }, [taskList, status])


    return (
        <div className='py-2 mt-1'>
            <div className='d-flex justify-content-between'>
                <div>
                    <label htmlFor="filter">Filter By Status</label>
                    <select
                        onChange={(e) => { setStatus(e.target.value) }}
                        value={status}
                        className="form-select"
                        id='filter'
                    >
                        <option value="all">All</option>
                        <option value="todo">Todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div>
                <button
                    onClick={() => setAddTaskModalOpen(true)}
                    className='btn btn-primary'>Add Task</button>
                </div>
            </div>
            {loading ?
                <Loading /> : <div className='row p-4'>
                    {
                        filteredTasks?.map((task) => {
                            return (
                                <TaskItem task={task} key={task.id} />
                            )
                        })
                    }
                </div>
            }
            {addTaskModalOpen && <TaskForm closeAddTask={closeAddTask} />}
        </div>
    )
}

export default TaskList
