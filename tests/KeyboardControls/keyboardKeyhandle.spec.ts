import { expect, test } from "@playwright/test"

const baseURL = "https://sdetqa.vercel.app/autoplay"

test.describe("keyboard controls on AutoPlay", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL)
    })

    test("types text, uses shortcuts, and edits with keyboard keys", async ({ page }) => {
        const name = page.locator("#name")
        const email = page.locator("#email")
        const keyboard = page.keyboard

        await name.fill("")
        await name.focus()
        await keyboard.type("John Doe")
        await expect(name).toHaveValue("John Doe")

        await keyboard.press("Control+A")
        await keyboard.press("Backspace")
        await expect(name).toHaveValue("")

        await keyboard.insertText("Jane Doe")
        await keyboard.press("Home")
        await keyboard.press("ArrowRight")
        await keyboard.press("!")
        await expect(name).toHaveValue("J!ane Doe")

        await keyboard.press("Home")
        await keyboard.down("Shift")
        await keyboard.press("End")
        await keyboard.up("Shift")
        await keyboard.type("Keyboard User")
        await expect(name).toHaveValue("Keyboard User")

        await email.fill("")
        await email.pressSequentially("keyboard@example.com", { delay: 10 })
        await expect(email).toHaveValue("keyboard@example.com")
    })

    test("navigates and selects form controls with the keyboard", async ({ page }) => {
        const keyboard = page.keyboard
        const name = page.locator("#name")
        const email = page.locator("#email")

        await name.focus()
        await keyboard.press("Tab")
        await expect(email).toBeFocused()
        await keyboard.press("Shift+Tab")
        await expect(name).toBeFocused()

        const male = page.locator("#male")
        const female = page.locator("#female")
        await male.focus()
        await keyboard.press("Space")
        await expect(male).toBeChecked()
        await keyboard.press("ArrowRight")
        await expect(female).toBeChecked()

        const monday = page.locator("#mon")
        await monday.focus()
        await keyboard.press("Space")
        await expect(monday).toBeChecked()
        await keyboard.press("Space")
        await expect(monday).not.toBeChecked()

        await name.fill("Keyboard User")
        await email.fill("keyboard@example.com")
        await page.locator("#phone").fill("1234567890")
        await page.locator("#address").fill("Keyboard test address")
        await monday.focus()
        await keyboard.press("Space")
        await page.getByRole("button", { name: "Submit" }).nth(0).focus()
        await keyboard.press("Enter")

        await expect(page.locator("#formErrors")).toBeHidden()
    })
})