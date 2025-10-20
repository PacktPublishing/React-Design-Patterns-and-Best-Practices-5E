import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskList } from "./TaskList"

describe("TaskList Integration", () => {
  it("displays empty state when no tasks exist", () => {
    render(<TaskList />)

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
    expect(screen.getByText("0 of 0 tasks completed")).toBeInTheDocument()
  })

  it("adds a new task and displays it", async () => {
    const user = userEvent.setup()
    render(<TaskList />)

    const input = screen.getByLabelText(/task title/i)
    const addButton = screen.getByRole("button", { name: /add task/i })

    await user.type(input, "Buy groceries")
    await user.click(addButton)

    expect(screen.getByText("Buy groceries")).toBeInTheDocument()
    expect(screen.queryByText(/no tasks yet/i)).not.toBeInTheDocument()
  })

  it("adds multiple tasks in sequence", async () => {
    const user = userEvent.setup()
    render(<TaskList />)

    const input = screen.getByLabelText(/task title/i)
    const addButton = screen.getByRole("button", { name: /add task/i })

    await user.type(input, "First task")
    await user.click(addButton)

    await user.type(input, "Second task")
    await user.click(addButton)

    await user.type(input, "Third task")
    await user.click(addButton)

    expect(screen.getByText("First task")).toBeInTheDocument()
    expect(screen.getByText("Second task")).toBeInTheDocument()
    expect(screen.getByText("Third task")).toBeInTheDocument()
    expect(screen.getByText("0 of 3 tasks completed")).toBeInTheDocument()
  })

  it("toggles task completion and updates counter", async () => {
    const user = userEvent.setup()
    render(<TaskList />)

    const input = screen.getByLabelText(/task title/i)
    const addButton = screen.getByRole("button", { name: /add task/i })

    await user.type(input, "Complete me")
    await user.click(addButton)

    const checkbox = screen.getByRole("checkbox", { name: /toggle complete me/i })
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(screen.getByText("1 of 1 tasks completed")).toBeInTheDocument()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(screen.getByText("0 of 1 tasks completed")).toBeInTheDocument()
  })

  it("deletes a task and updates the list", async () => {
    const user = userEvent.setup()
    render(<TaskList />)

    const input = screen.getByLabelText(/task title/i)
    const addButton = screen.getByRole("button", { name: /add task/i })

    await user.type(input, "Task to delete")
    await user.click(addButton)

    const deleteButton = screen.getByRole("button", { name: /delete task to delete/i })
    await user.click(deleteButton)

    expect(screen.queryByText("Task to delete")).not.toBeInTheDocument()
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it("manages a realistic task workflow", async () => {
    const user = userEvent.setup()
    render(<TaskList />)

    const input = screen.getByLabelText(/task title/i)
    const addButton = screen.getByRole("button", { name: /add task/i })

    await user.type(input, "Morning exercise")
    await user.click(addButton)
    await user.type(input, "Check emails")
    await user.click(addButton)
    await user.type(input, "Team meeting")
    await user.click(addButton)

    const morningCheckbox = screen.getByRole("checkbox", {
      name: /toggle morning exercise/i,
    })
    await user.click(morningCheckbox)

    const emailCheckbox = screen.getByRole("checkbox", { name: /toggle check emails/i })
    await user.click(emailCheckbox)

    expect(screen.getByText("2 of 3 tasks completed")).toBeInTheDocument()

    const deleteButton = screen.getByRole("button", { name: /delete check emails/i })
    await user.click(deleteButton)

    expect(screen.getByText("1 of 2 tasks completed")).toBeInTheDocument()
    expect(screen.getByText("Morning exercise")).toBeInTheDocument()
    expect(screen.queryByText("Check emails")).not.toBeInTheDocument()
    expect(screen.getByText("Team meeting")).toBeInTheDocument()
  })
})
