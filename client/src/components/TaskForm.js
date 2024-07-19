import React, { useContext, useState } from 'react'
import Loading from './Loading'
import taskContext from '../store/taskContext';

const TaskForm = ({ closeAddTask }) => {

    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "todo"
    });
    const { addTask } = useContext(taskContext);


    const saveTask = async () => {

        const tempValidation = {};
        if (task.title.trim() === "") {
            tempValidation.titleError = "Title Required*"
        }
        if (task.description.trim() === "") {
            tempValidation.descriptionError = "Description Required*"
        }
        if (task.status.trim() === "") {
            tempValidation.statusError = "Status Required*"
        }
        setValidationErrors(tempValidation);

        if (Object.keys(tempValidation).length <= 0) {
            try {
                setLoading(true);
                const response = await fetch(process.env.REACT_APP_API_URL + "/tasks/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
                });
                const result = await response.json();
                addTask(result)
                setLoading(false);
                closeAddTask();
            }
            catch (error) {
                setLoading(false);
                alert("Error");
                closeAddTask();
            }
        }
    }

    const handalInputChanges = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    return (
        <div
            className={`modal show fade d-block`}
            tabIndex="-1"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
                        <button onClick={closeAddTask} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body my-2">
                        {loading ? <Loading /> : <>
                            <div className="form-group my-2">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="title"
                                    id='title'
                                    name='title'
                                    onChange={handalInputChanges}
                                />
                                <small className='text-danger'>{validationErrors.titleError}</small>
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="desc">Description </label>
                                <input
                                    id="desc"
                                    type="text"
                                    className="form-control"
                                    aria-describedby="desc"
                                    name='description'
                                    onChange={handalInputChanges}
                                />
                                <small className='text-danger'>{validationErrors.descriptionError}</small>
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="desc">Status </label>
                                <select
                                    className="form-select"
                                    name='status'
                                    id='status'
                                    onChange={handalInputChanges}
                                >
                                    <option value="todo">Todo</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                                <small className='text-danger'>{validationErrors.statusError}</small>
                            </div>

                        </>}
                    </div>
                    <div className="modal-footer">

                        <button
                            onClick={closeAddTask}
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>

                        <button
                            onClick={saveTask}
                            type="button"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            Add
                        </button>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaskForm
