import React, { useContext, useState } from 'react'
import Loading from './Loading';
import taskContext from '../store/taskContext';

const TaskItem = ({ task }) => {

    const [updateModalOpend, setupdateModalOpend] = useState(false);
    const [status, setStatus] = useState(task?.status);
    const [loading, setLoading] = useState(false);
    const { deleteTask, updateTask }  = useContext(taskContext);

    const getDate = (date) => {
        const dateObj = new Date(date);
        const day = dateObj.getDay();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const min = dateObj.getMinutes();
        const hours = dateObj.getHours();
        const sec = dateObj.getSeconds();
        return `${min}:${hours}:${sec}, ${day}/${month}/${year}`
    }

    const updateTaskStatus = async () => {
        try {
            setLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL + "/tasks/" + task.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            });

            const result = await response.json();
            updateTask(result);
            setupdateModalOpend(false);
            setLoading(false);
        }
        catch (error) {
            alert("Error")
        }
    }

    const deleteTaskBTNClick = async () => {
        console.log(task.id)
        try {
            setLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL + "/tasks/" + task.id, {
                method: "DELETE",
            });

            await response.json();
            deleteTask(task.id)
        }
        catch (error) {
            alert("Error")
        }
    }

    return (
        <>
            <div className=' col-md-4 my-3'>
                <div
                    className={`card border d-flex flex-column justify-content-between   border-4 ${task.status === 'todo' ? 'border-secondary' : task.status === 'in_progress' ? 'border-primary' : 'border-success'}`}
                    style={{ minHeight: '240px' }}
                >
                    <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                    </div>
                    <div className="card-body pb-0">
                        <p className="card-text m-0">Status {task.status === 'todo' ? 'Todo' : task.status === 'in_progress' ? 'In Progress' : 'Done'}</p>
                        <p className="card-text"><small className="text-body-secondary">Created At {getDate(task.created_at)},</small></p>
                        <button
                            onClick={() => { setupdateModalOpend(true) }}
                            className="btn btn-primary"
                        >
                            Update Status

                        </button>
                        <button onClick={deleteTaskBTNClick} className="btn btn-danger mx-1">Delete</button>
                    </div>
                </div>
            </div>
            <div
                className={`modal ${updateModalOpend ? 'show fade d-block' : ''}`}
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{task.title}</h5>
                            <button onClick={() => { setupdateModalOpend(false) }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body my-4 pb-5">
                            {loading ? <Loading /> : <>
                                <label className="form-label">Select Status</label>
                                <select
                                    onChange={(e) => { setStatus(e.target.value) }}
                                    value={task.status}
                                    className="form-select"
                                >
                                    <option value="todo">Todo</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </>}
                        </div>
                        <div className="modal-footer">

                            <button
                                onClick={() => { setupdateModalOpend(false) }} type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>

                            <button
                                onClick={updateTaskStatus}
                                type="button"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskItem
