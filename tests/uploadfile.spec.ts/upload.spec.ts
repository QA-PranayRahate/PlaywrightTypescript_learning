import { test, expect } from "@playwright/test"

test('Single UploadFile', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay')
    await page.locator('#singleFileInput').setInputFiles("C:/Users/Lenovo/Downloads/Lab_Flight_Booking.pdf")

    await page.locator('button', { hasText: 'Upload Single File' }).click()
    await page.waitForTimeout(4000)
    const fileUploadStatus = await page.locator('#singleFileStatus').innerText()
    console.log(fileUploadStatus)
    expect(fileUploadStatus).toContain('selected')

})

test('Multiple UploadFile', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay')
    await page.locator('#multipleFilesInput').setInputFiles(["C:/Users/Lenovo/Downloads/Lab_Flight_Booking.pdf","C:/Users/Lenovo/Documents/QA_Interview_Notes_Notebook.pdf"])

    await page.locator('button', { hasText: 'Upload Multiple Files' }).click()
    await page.waitForTimeout(4000)
    const fileUploadStatus = await page.locator('#multipleFilesStatus').innerText()
    console.log(fileUploadStatus)
    expect(fileUploadStatus).toContain('selected')

})

