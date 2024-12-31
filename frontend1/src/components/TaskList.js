import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks, onTasksUpdated }) => {
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onTasksUpdated(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const markComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);

      // Update local state immediately for a seamless UI experience
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <div className="task-buttons">
            <button onClick={() => markComplete(task._id)}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button className="delete" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
