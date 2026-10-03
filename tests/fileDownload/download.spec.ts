import { test, expect } from "@playwright/test"
import fs from 'fs'
test.beforeEach(async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay')
    await expect(page).toHaveTitle(/Web Automation Playground/)
    await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay')
})

test('demo download file', async ({ page }) => {

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('button', { hasText: 'Download File' }).click()

    ])
    expect(download.suggestedFilename()).toContain('sample.txt')

    const downloadPath = `./downloads/${download.suggestedFilename()}`
    console.log(downloadPath)
    await download.saveAs(downloadPath)


    const fileExists = fs.existsSync(downloadPath)
    expect(fileExists).toBeTruthy()


    if (fileExists) {
        fs.unlinkSync(downloadPath)
    }
})


test('open pdf on new tab', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay')

    const [newTab] = await Promise.all([

        page.context().waitForEvent('page'),
        page.locator('button', { hasText: 'Open PDF' }).click()

    ])
    console.log(await newTab.title())
    expect(newTab).toBeTruthy()
    // await expect(newTab).toHaveTitle('dummy.pdf')
    await expect(newTab).toHaveURL('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf')


})



test('frame', async ({ page }) => {

    await page.goto('https://jqueryui.com/datepicker/')
    const frame = page.frameLocator('.demo-frame')
    await frame.locator('#datepicker').click()
    await page.waitForTimeout(4000)
    // const path='./screenshot/1.jpg'
    await page.screenshot({ fullPage: true })


})



test('simple Download with suggested file name', async ({ page }) => {

const [downloadFile]=await Promise.all([

    page.waitForEvent('download'),
    page.locator('#initiateDownload').click()

])
    expect (downloadFile.suggestedFilename).toContain('sample.txt')
    const downloadPath=`./downloads/${downloadFile.suggestedFilename}`
    console.log(downloadPath)
   await downloadFile.saveAs(downloadPath)
    
   const fileexists=fs.existsSync(downloadPath)
   expect(fileexists).toBeTruthy()

   if (fileexists){
    fs.unlinkSync(downloadPath)
   }
 
})