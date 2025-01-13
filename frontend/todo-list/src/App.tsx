import React, { useState, useEffect } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskCompletion,
} from "./api/API";
import TaskList from "./components/TaskList";
import "./index.css";

type Task = {
  id: number;
  title: string;
  IsCompleted: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTask("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleComplete = async (id: number, isCompleted: boolean) => {
    console.log(`Updating task ${id} completion status to ${isCompleted}`);

    try {
      console.log(
        `Sending request to server to update task ${id} completion status to ${isCompleted}`
      );

      await updateTaskCompletion(id, isCompleted);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, IsCompleted: isCompleted } : task
        )
      );

      console.log(`Task ${id} updated successfully`);
    } catch (error) {
      console.error("Error updating task completion", error);
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default App;
