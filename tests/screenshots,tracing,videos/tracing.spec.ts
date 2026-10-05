import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

test('this is tracing demo', async ({ browser }) => {
    // Create Directory if not exist to save videos 
    const videosDir = path.resolve("./videos")
    fs.mkdirSync(videosDir, { recursive: true })

    const context = await browser.newContext({ recordVideo: { dir: videosDir } })
    const page = await context.newPage()

    await context.tracing.start({ screenshots: true, snapshots: true, sources: true })


    await page.goto("https://sdetqa.vercel.app/login_app")
    await page.locator("#username").fill('admin')
    await page.locator("#password").fill('admin123')
    await page.getByText('Login', { exact: true }).click()

    await expect(page.locator('#displayUser')).toBeVisible()
    // Before stopping the trace:
    const tracePath = path.resolve("./traces/tracing.zip");
    // Create Directory if not exist to save traces in zip format 
    fs.mkdirSync(path.dirname(tracePath), { recursive: true });
    await context.tracing.stop({ path: tracePath });

    await context.close()


})