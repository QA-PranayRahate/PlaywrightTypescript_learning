import { test, expect } from "@playwright/test"

const timestamp = () => new Date(Date.now() + 330 * 60_000)
        .toISOString()
        .replace(/[:.]/g, '-')
        .replace('Z', '+05-30');


// test.beforeEach('visit wiki', async ({ page }) => {
//     await page.goto('https://en.wikipedia.org/wiki/Login')
// })
test.afterEach('Close Browser', async ({ page }) => {

    console.log('Closing browser')
    await page.close()

})


test('Screenshot of visible viewport_Not the whole page',async({page},testInfo)=>{
     const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${timestamp()}.png`;

    await page.screenshot({ path: `./screenshot/${fileName}` })
})

test('take screenshot of full page', async ({ page }, testInfo) => {

    const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${timestamp()}.png`;


    await page.screenshot({
        fullPage: true,
        path: `./screenshot/${fileName}`,
        type: 'png'

    })
})

test('specific element screenshot', async ({ page },testInfo) => {
 const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${timestamp()}.png`;

    const wikipedia= page.getByAltText('Wikipedia')
    await wikipedia.screenshot({ path: `./screenshot/${fileName}`})

})

test("screenshot_after_scrolling",async({page},testInfo)=>{
 const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${timestamp()}.png`;
    await page.evaluate(()=> window.scrollBy(0,600))
    await page.screenshot({ path: `./screenshot/${fileName}`})

})

test('Mask_data_in_screenshot',async({page},testInfo)=>{
 const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${timestamp()}.png`;
const screenshotPath = `./screenshot/${fileName}`;
 const header  = page.locator('.vector-header.mw-header.no-font-mode-scale')
 const sidebar = page.locator('#vector-toc')

 await page.screenshot({path: `./screenshot/${fileName}`,
mask :[header,sidebar],
maskColor:'#87CEEB',
fullPage:true
})
  await testInfo.attach('Mask',{
    body:screenshotPath,
    contentType:'image/png'
  })
})


test ("Omit Background",async({page})=>{
    await page.goto('https://unifiedportal-mem.epfindia.gov.in/memberinterface/')
    await page.screenshot({
        path:'./screenshot/rockstar.png',
        omitBackground:true,
        fullPage:true
    })
})

test("disable animations",async({page})=>{
    await page.goto('https://www.rockstargames.com/')
    await page.screenshot({
        path:"./screenshot/animation.png",
        animations:"disabled",
        type:"png"})


        await page.waitForTimeout(3000)
})
