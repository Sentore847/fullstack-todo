import { getTasks, createTask, deleteTask, updateTaskCompletion } from "./API";

describe("API Tests", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getTasks", () => {
    it("Return task list if status code 200", async () => {
      const mockTasks = [
        { id: 1, title: "Task 1", IsCompleted: false },
        { id: 2, title: "Task 2", IsCompleted: true },
      ];

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockTasks),
      });

      const tasks = await getTasks();
      expect(fetch).toHaveBeenCalledWith("/api/tasks", { method: "GET" });
      expect(tasks).toEqual(mockTasks);
    });

    it("Throw error if status code 400 or 500", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: false });

      await expect(getTasks()).rejects.toThrow("Failed to fetch tasks");
      expect(fetch).toHaveBeenCalledWith("/api/tasks", { method: "GET" });
    });
  });

  describe("createTask", () => {
    it("Send POST request and return task", async () => {
      const mockTask = { id: 3, title: "New Task", IsCompleted: false };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockTask),
      });

      const task = await createTask("New Task");

      expect(fetch).toHaveBeenCalledWith("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title: "New Task" }),
      });
      expect(task).toEqual(mockTask);
    });

    it("Throw error if task is not created", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: false });

      await expect(createTask("New Task")).rejects.toThrow(
        "Failed to create task"
      );
      expect(fetch).toHaveBeenCalledWith("/api/tasks", expect.any(Object));
    });
  });

  describe("deleteTask", () => {
    it("Send DELETE request", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true });

      await deleteTask(1);

      expect(fetch).toHaveBeenCalledWith("/api/tasks/1", { method: "DELETE" });
    });

    it("Throw error if task is not deleted", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: false });

      await expect(deleteTask(1)).rejects.toThrow("Failed to delete task");
      expect(fetch).toHaveBeenCalledWith("/api/tasks/1", { method: "DELETE" });
    });
  });

  describe("updateTaskCompletion", () => {
    it("Send PATCH request, updated state", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true });

      await updateTaskCompletion(1, true);

      expect(fetch).toHaveBeenCalledWith("/api/tasks/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IsCompleted: true }),
      });
    });

    it("Throw error if state is not updated", async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: false });

      await expect(updateTaskCompletion(1, false)).rejects.toThrow(
        "Failed to update task completion"
      );
      expect(fetch).toHaveBeenCalledWith("/api/tasks/1", expect.any(Object));
    });
  });
});
