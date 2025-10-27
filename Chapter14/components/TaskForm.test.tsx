import { jest, describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "./TaskForm";

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allows users to type in the input field", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText(/task title/i);
    await user.type(input, "New task");

    expect(input).toHaveValue("New task");
  });

  it("submits the form with valid input", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText(/task title/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await user.type(input, "Valid task");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith("Valid task");
    expect(input).toHaveValue("");
  });

  it("shows error for empty input", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /add task/i });
    await user.click(submitButton);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Task title cannot be empty"
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error for input that is too short", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText(/task title/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await user.type(input, "ab");
    await user.click(submitButton);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Task title must be at least 3 characters"
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("clears error when user starts typing again", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText(/task title/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await user.click(submitButton);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.type(input, "a");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
