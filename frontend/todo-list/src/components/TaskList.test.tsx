import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";

const tasks = [
  { id: 1, title: "Task 1", IsCompleted: false },
  { id: 2, title: "Task 2", IsCompleted: true },
];

test("calls onDelete when delete button is clicked", () => {
  const onDeleteMock = jest.fn();
  render(
    <TaskList
      tasks={tasks}
      onDelete={onDeleteMock}
      onToggleComplete={() => {}}
    />
  );

  // Получаем все кнопки "Delete" и кликаем по первой
  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(deleteButtons[0]);

  // Проверяем, что onDelete вызван один раз
  expect(onDeleteMock).toHaveBeenCalledTimes(1);
});
