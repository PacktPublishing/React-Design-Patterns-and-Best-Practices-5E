import { test, expect } from "@playwright/test"

test.describe("Task Manager E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("displays the application with correct title", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Task Manager")
    await expect(page.getByText("0 of 0 tasks completed")).toBeVisible()
  })

  test("shows empty state message initially", async ({ page }) => {
    await expect(page.getByText("No tasks yet. Add one above to get started!")).toBeVisible()
  })

  test("creates a new task through the form", async ({ page }) => {
    await page.getByLabel("Task title").fill("Write E2E tests")
    await page.getByRole("button", { name: "Add Task" }).click()

    await expect(page.getByText("Write E2E tests")).toBeVisible()
    await expect(page.getByText("0 of 1 tasks completed")).toBeVisible()
    await expect(page.getByLabel("Task title")).toHaveValue("")
  })

  test("validates form input and shows errors", async ({ page }) => {
    await page.getByRole("button", { name: "Add Task" }).click()

    await expect(page.getByRole("alert")).toHaveText("Task title cannot be empty")

    await page.getByLabel("Task title").fill("ab")
    await page.getByRole("button", { name: "Add Task" }).click()

    await expect(page.getByRole("alert")).toHaveText("Task title must be at least 3 characters")
  })

  test("completes a full task lifecycle", async ({ page }) => {
    await page.getByLabel("Task title").fill("Buy groceries")
    await page.getByRole("button", { name: "Add Task" }).click()

    await page.getByLabel("Task title").fill("Do laundry")
    await page.getByRole("button", { name: "Add Task" }).click()

    await expect(page.getByText("0 of 2 tasks completed")).toBeVisible()

    const groceriesCheckbox = page.getByRole("checkbox", {
      name: /toggle buy groceries/i,
    })
    await groceriesCheckbox.check()

    await expect(groceriesCheckbox).toBeChecked()
    await expect(page.getByText("1 of 2 tasks completed")).toBeVisible()

    const laundryCheckbox = page.getByRole("checkbox", {
      name: /toggle do laundry/i,
    })
    await laundryCheckbox.check()

    await expect(page.getByText("2 of 2 tasks completed")).toBeVisible()

    const deleteButton = page.getByRole("button", {
      name: /delete buy groceries/i,
    })
    await deleteButton.click()

    await expect(page.getByText("Buy groceries")).not.toBeVisible()
    await expect(page.getByText("1 of 1 tasks completed")).toBeVisible()
  })
})
