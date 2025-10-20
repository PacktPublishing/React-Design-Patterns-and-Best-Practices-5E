"use client"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskItem } from "./TaskItem"
import jest from "jest" // Declaring jest variable

describe("TaskItem", () => {
  const mockTask = {
    id: "1",
    title: "Write unit tests",
    completed: false,
  }

  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the task title correctly", () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    expect(screen.getByText("Write unit tests")).toBeInTheDocument()
  })

  it("displays unchecked checkbox for incomplete tasks", () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const checkbox = screen.getByRole("checkbox", { name: /toggle write unit tests/i })
    expect(checkbox).not.toBeChecked()
  })

  it("displays checked checkbox for completed tasks", () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const checkbox = screen.getByRole("checkbox", { name: /toggle write unit tests/i })
    expect(checkbox).toBeChecked()
  })

  it("applies strike-through styling to completed tasks", () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const title = screen.getByText("Write unit tests")
    expect(title).toHaveClass("line-through")
  })

  it("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup()
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const checkbox = screen.getByRole("checkbox", { name: /toggle write unit tests/i })
    await user.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledTimes(1)
    expect(mockOnToggle).toHaveBeenCalledWith("1")
  })

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup()
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />)

    const deleteButton = screen.getByRole("button", { name: /delete write unit tests/i })
    await user.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith("1")
  })
})
