import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";

describe("TaskItem", () => {
  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  const taskProps = {
    id: 1,
    title: "Test Task",
    IsCompleted: false,
    onDelete: mockOnDelete,
    onToggleComplete: mockOnToggleComplete,
  };

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnToggleComplete.mockClear();
  });

  test("renders task with checkbox and delete button", () => {
    render(<TaskItem {...taskProps} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("checkbox changes state and calls onToggleComplete", async () => {
    render(<TaskItem {...taskProps} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, true);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, false);
    expect(checkbox).not.toBeChecked();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(<TaskItem {...taskProps} />);

    const deleteButton = screen.getAllByText("Delete");

    fireEvent.click(deleteButton[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test("checkbox reflects initial state from props", () => {
    render(<TaskItem {...taskProps} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  test("checkbox updates when IsCompleted prop changes", () => {
    const { rerender } = render(<TaskItem {...taskProps} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    rerender(<TaskItem {...{ ...taskProps, IsCompleted: true }} />);

    expect(checkbox).toBeChecked();
  });
});
