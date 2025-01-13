export const getTasks = async () => {
  const response = await fetch("/api/tasks", {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

export const createTask = async (text: string) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Title: text }),
  });

  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete task");
};

export const updateTaskCompletion = async (
  id: number,
  isCompleted: boolean
) => {
  console.log(
    `Sending PATCH request to update task ${id} completion status to ${isCompleted}`
  );

  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ IsCompleted: isCompleted }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task completion");
  }

  console.log(`Task ${id} completion status updated successfully`);
};
