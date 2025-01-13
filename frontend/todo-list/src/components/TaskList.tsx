import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  IsCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          onDelete={onDelete}
          IsCompleted={task.IsCompleted}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
