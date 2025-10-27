// components/TaskItem.test.tsx
import { jest, describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskItem } from "./TaskItem";
// no `import jest from "jest"`

describe("TaskItem", () => {
  const mockTask = { id: "1", title: "Write unit tests", completed: false };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the task title correctly", () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Write unit tests")).toBeInTheDocument();
  });

  it("displays unchecked checkbox for incomplete tasks", () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(
      screen.getByRole("checkbox", { name: /toggle write unit tests/i })
    ).not.toBeChecked();
  });

  it("displays checked checkbox for completed tasks", () => {
    render(
      <TaskItem
        task={{ ...mockTask, completed: true }}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(
      screen.getByRole("checkbox", { name: /toggle write unit tests/i })
    ).toBeChecked();
  });

  it("applies strike-through styling to completed tasks", () => {
    render(
      <TaskItem
        task={{ ...mockTask, completed: true }}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Write unit tests")).toHaveClass("line-through");
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    await user.click(
      screen.getByRole("checkbox", { name: /toggle write unit tests/i })
    );
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    await user.click(
      screen.getByRole("button", { name: /delete write unit tests/i })
    );
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
