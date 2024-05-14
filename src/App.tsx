import React, { useState, useEffect } from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';

type Task = {
  id: number;
  name: string,
  isDone: boolean;
}

const App = () => {
  const [taskName, setTaskName] = useState<string>('')
  const [tasks, setTask] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const tasks: string | null = localStorage.getItem('tasks');
    if (tasks) {
      setTask(JSON.parse(tasks));
    }
  }, []);

  if (loading) {
    return (
      <div className="loader25">
        <span>Loading...</span>
      </div>
    )
  }

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value)
  }

  const onDoneTask = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const filteredList = tasks.filter((task) => {
      return task.id === id;
    });
    filteredList[0].isDone = event.target.checked;
    saveTasks([...tasks]);
  }

  const addList = (task: Task) => {
    return <li key={task.id} className='task-item'>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={(event) => onDoneTask(event, task.id)} />
      <span>{task.name}</span>
      <DeleteIcon style={{ marginRight: "-150px" }} onClick={() => deleteTask(task.id)} />
    </li>
  }

  const deleteTask = (id: number) => {
    const filteredList = tasks.filter((task) => {
      return task.id !== id;
    });
    saveTasks([...filteredList]);
  }

  const addTask = () => {

    if (taskName.length < 5 && taskName.length > 0) {
      return (
        alert('Task length should be more than 5 character')
      )
    }
    else if (taskName.length === 0) {
      return (
        alert('Task Field is Empty. Enter the Task')
      )
    }
    else if (taskName.length > 20) {
      return (
        alert('Task should be less than 20 character')
      )
    }

    const updatedTask = [
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        isDone: false,
      }
    ]
    saveTasks(updatedTask)
    setTaskName('')

  }

  const saveTasks = (value: Task[]) => {
    setTask(value);
    localStorage.setItem('tasks', JSON.stringify(value));
  }



  return (
    <div className='container'>
      <h1>To-Do-Task-App</h1>

      <div className='box'>
        <input type='text' placeholder='Enter Task' value={taskName} onChange={onChangeText} onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            addTask();
          }
        }}></input>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className='list-item'>
        <ol className='list'>{tasks.map(addList)}</ol>
      </div>

    </div>
  )

}
export default App;
