import React, { useEffect, useState } from "react";

interface TaskItemProps {
  id: number;
  title: string;
  IsCompleted: boolean;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  IsCompleted,
  onDelete,
  onToggleComplete,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(IsCompleted);

  useEffect(() => {
    setIsChecked(IsCompleted);
  }, [IsCompleted]);

  const handleCheckbox = async () => {
    const newIsCompleted = !isChecked;
    setIsChecked(newIsCompleted);

    console.log(
      `Sending request to server to update task ${id} completion status to ${newIsCompleted}`
    );

    try {
      await onToggleComplete(id, newIsCompleted);
      console.log(`Task ${id} updated successfully`);
    } catch (error) {
      console.error("Error updating task completion status", error);
      setIsChecked(isChecked);
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={isChecked}
        onChange={handleCheckbox}
      />
      <span className={isChecked ? "completed" : ""}>{title}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
