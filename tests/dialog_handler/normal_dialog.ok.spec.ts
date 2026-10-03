import { test, expect } from '@playwright/test'


test('using waitForEvent inbuilt method', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay')
    const popupPromise = page.waitForEvent('dialog').then(async (popup) => {
        expect(popup.type()).toBe('alert')
        await popup.accept()
    })
    await Promise.all([
        page.getByRole('button', { name: 'Simple' }).click(),
        popupPromise,
    ])

})


test('dialog handle with only accept button', async ({ page }) => {


    await page.goto('https://sdetqa.vercel.app/autoplay')
    page.on('dialog', (dialog) => {
        expect(dialog.type()).toBe('alert')
        console.log(dialog.type())
        console.log(dialog.message())
        dialog.accept()
    })

    await page.waitForTimeout(4000)

    await page.getByRole('button', { name: 'Simple' }).click()
    await page.waitForTimeout(4000)
    await page.close()

})


test('dialog handle with confirmation(Yes/No) button', async ({ page }) => {


    await page.goto('https://sdetqa.vercel.app/autoplay')
    page.on('dialog', (dialog) => {
        // expect(dialog.type()).toBe('confirm')
        console.log(dialog.type())
        console.log(dialog.message())
        // dialog.dismiss()
        dialog.accept()
    })

    await page.waitForTimeout(4000)

    await page.getByRole('button', { name: 'Confirm' }).first().click()
    await page.waitForTimeout(4000)
    await page.close()

})

test('dialog handle with user input (Yes/No) button, i.e.Prompt', async ({ page }) => {


    await page.goto('https://sdetqa.vercel.app/autoplay')
    page.on('dialog', (dialog) => {

        console.log(dialog.type())
        console.log(dialog.message())
        if (dialog.type() === 'prompt') {
            dialog.accept('SUP G')
        }
        else if (dialog.type() === 'alert') {
            dialog.accept()
        }
    })
    await page.waitForTimeout(4000)
    await page.getByRole('button', { name: 'Prompt' }).first().click()
    await page.waitForTimeout(4000)
    await page.close()




    /* 
    mind you this is just a handle, 
    once we define the handler then we have to click on the button 
    that will trigger or open the dialog box 
    */
    page.on('dialog', (dialog) => {
        //simple alert with only 1 button
        expect(dialog.type()).toBe('alert')
        //capture message of the dialog box
        console.log(dialog.message())

        dialog.accept()


    })
    page.locator('button').click()

    /*  confirmation alert*/
    page.on('dialog', (dialog) => {
        dialog.accept() // clicks yes button
        dialog.dismiss()// clicks no button
    })
    page.locator('#confirmationbtn').click()



})


