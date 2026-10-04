import { expect, test } from "@playwright/test"
import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

type LoginData = {
    email: string
    password: string
    validity: string
}

const csvDataPath = path.resolve(__dirname, "../../testData/data.csv")
const csvContent = fs.readFileSync(csvDataPath, "utf-8")
const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
}) as LoginData[]

test.describe("login with multiple datasets", () => {
    for (const data of records) {
        test(`login with ${data.email} and ${data.password}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/login")
            await page.locator("#Email").fill(data.email)
            await page.locator("#Password").fill(data.password)
            await page.locator('[value="Log in"]').click()

            if (data.validity.toLowerCase() === "valid") {
                await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 100000 })
            } else {
                await expect(page.locator(".validation-summary-errors")).toBeVisible({ timeout: 100000 })
            }
        })
    }
})