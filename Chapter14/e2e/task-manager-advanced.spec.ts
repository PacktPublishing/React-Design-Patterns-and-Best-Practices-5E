import { test, expect } from "@playwright/test"

test.describe("Task Manager - Advanced Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("submits form using Enter key", async ({ page }) => {
    await page.getByLabel("Task title").fill("Test keyboard submission")
    await page.getByLabel("Task title").press("Enter")

    await expect(page.getByText("Test keyboard submission")).toBeVisible()
  })

  test("applies correct styling to completed tasks", async ({ page }) => {
    await page.getByLabel("Task title").fill("Style test task")
    await page.getByRole("button", { name: "Add Task" }).click()

    const taskText = page.getByText("Style test task")
    await expect(taskText).not.toHaveClass(/line-through/)

    await page.getByRole("checkbox", { name: /toggle style test task/i }).check()

    await expect(taskText).toHaveClass(/line-through/)
  })

  test("handles rapid task creation", async ({ page }) => {
    const taskTitles = ["First rapid task", "Second rapid task", "Third rapid task"]

    for (const title of taskTitles) {
      await page.getByLabel("Task title").fill(title)
      await page.getByRole("button", { name: "Add Task" }).click()
    }

    for (const title of taskTitles) {
      await expect(page.getByText(title)).toBeVisible()
    }

    await expect(page.getByText("0 of 3 tasks completed")).toBeVisible()
  })

  test("maintains state during rapid interactions", async ({ page }) => {
    await page.getByLabel("Task title").fill("Quick task")
    await page.getByRole("button", { name: "Add Task" }).click()

    const checkbox = page.getByRole("checkbox", { name: /toggle quick task/i })

    await checkbox.check()
    await checkbox.uncheck()
    await checkbox.check()

    await expect(checkbox).toBeChecked()
    await expect(page.getByText("1 of 1 tasks completed")).toBeVisible()
  })
})
