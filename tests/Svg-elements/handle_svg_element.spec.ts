
import { test, expect } from "@playwright/test"

test.beforeEach('Launch chrome and visit webpage', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay')
})
test.afterEach('clean up', async ({ page }) => {
    await page.close()
})

test('handle svg elements', async ({ page }) => {
    // verify circle is visible 
    let circleShape = page.locator('svg circle')
    await expect(circleShape).toBeVisible()
    await circleShape.screenshot({ path: './screenshot/circle.png' })

    //verify color
    let circleColor = await circleShape.getAttribute('fill')
    expect(circleColor).toBe("DeepSkyBlue")

    //Count all the svg elements/shapes with simple count method used with locator
    let svg_count = await page.locator(".shape").count()
    console.log(`SVG Shape Count: ${svg_count}`)

})


test("Handle bar chart", async ({ page }) => {

    let barChart = page.locator('svg').nth(1).locator('rect')
    expect(await barChart.count()).toBe(5)
    const barsCount = await barChart.count()
    console.log('Bars count: ', barsCount)

    let barChartText = page.locator('svg').locator('text')
    expect(await barChartText.count()).toBe(5)
    const barTextCount = await barChartText.count()
    console.log('Bar Text Count: ', barTextCount)

    expect(barsCount).toEqual(barTextCount), "Not Equal"

    //Print labels along with height
    for (let i = 0; i < barsCount; i++) {

        const labels = (await barChartText.nth(i).allTextContents())
            .map(text => text.trim())
            .join('');
        const heights = Number(await barChart.nth(i).getAttribute('height'))
        console.log(` ${labels} : ${heights} `)

    }
})

