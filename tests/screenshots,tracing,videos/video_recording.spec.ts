import { test } from "@playwright/test"

test("vide capture", async ({ browser }, testInfo) => {
    test.slow()
    const context = await browser.newContext({ recordVideo: { dir: "./videos/" } })
    const page = await context.newPage()
    const video = page.video()
    const title = testInfo.title.replace(/[^a-zA-Z0-9_-]/g, "_")
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")

    await page.goto("https://www.apple.com/")
    await page.waitForLoadState("domcontentloaded")
    await page.evaluate(() => window.scrollBy(0, 5000))
    await page.waitForTimeout(3000)
    await context.close()

    if (!video) {
        throw new Error("Video recording was not started for this page.")
    }
    await video.saveAs(`./videos/${title}-${timestamp}.webm`)
})
