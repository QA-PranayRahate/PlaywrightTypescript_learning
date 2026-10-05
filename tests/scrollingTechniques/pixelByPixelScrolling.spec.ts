/* 

Most of the item, Playwright will automatically scroll for you before doing any actions.
Therfore you do not need to scroll explicitly

ways of scrolling:
1. scroll by pixel values 

2. scroll to specific element 
Brings targeted element directly into the browser viewport

3. scroll to bottom of the document 
Moves the view dirctly to the top or the very bottom of the document

4. scroll continuously

*/

import { test, expect } from "@playwright/test"

test('', async ({ page }) => {
    await page.goto('https://www.worldometers.info/geography/flags-of-the-world/')

    const UAEFlag = page.getByAltText('Flag of United Arab Emirates')
    await expect(UAEFlag).toBeVisible()
    await UAEFlag.scrollIntoViewIfNeeded()

    await page.waitForTimeout(3000)
    await page.close()

})



test('Scroll by pixel values', async ({ page }) => {
    await page.goto('https://www.worldometers.info/geography/flags-of-the-world/')

    const UAEFlag = page.getByAltText('Flag of United Arab Emirates')


    await page.evaluate(() => {
        window.scrollBy(0, 2000)
    })
    // await expect(UAEFlag).toBeVisible()

    await page.evaluate(() => {
        console.log(window.scrollY)
    })


    // await UAEFlag.scrollIntoViewIfNeeded()

    await page.waitForTimeout(3000)
    // await page.close()

})


test('scroll to bottom of document', async ({ page }) => {
    await page.goto('https://www.worldometers.info/geography/flags-of-the-world/')

    //This is Java script
    // await page.evaluate(()=>{
    //     window.scrollTo(0,document.body.scrollHeight)
    // })

    //using keyboard keys {End}

    await page.keyboard.press("End")
    await page.waitForTimeout(3000)
    await page.close()

})


test('scroll to bottom and come to top', async ({ page }) => {
    await page.goto('https://www.worldometers.info/geography/flags-of-the-world/')

    //This is Java script
    // await page.evaluate(()=>{
    //     window.scrollTo(0,document.body.scrollHeight)
    // })

    //using keyboard keys {End}

    await page.keyboard.press("End")
    await page.waitForTimeout(3000)
    //Using Keyboard key {Home}
    // await page.keyboard.press('Home')
    // await page.waitForTimeout(3000)

    /*     //Way1 - simple use 0,0
        await page.evaluate(() => { 
            window.scrollTo(0, 0)  // 0th position - 
        }) */

    //Another way2

    await page.evaluate(() => {
        window.scrollTo(0, -document.body.scrollHeight)
    })
    await page.waitForTimeout(3000)
    await page.close()

})

test('all countries names', async ({ page }) => {


    await page.goto('https://www.worldometers.info/geography/flags-of-the-world/')
    const allFlags = page.locator('.font-bold').all()

    // console.log(await allFlags)
    let counter: number = 1


    for (const flags of await allFlags) {
        console.log(`${counter} - ${await flags.allInnerTexts()}`)
        counter += 1
    }
    console.log('Thats a wrap folks')

})

test('lazily scrolling ', async ({ page }) => {

    await page.goto('https://www.booksbykilo.in/books?weightrange=101to200gm')
    const books=  page.locator('h3').all()
    
    let previousHeight = 0
    while (true) {
        await page.evaluate(()=>{window.scrollTo(0,document.body.scrollHeight)})
        await page.waitForTimeout(2000)

        const currentHeight = await page.evaluate(() => {

            return document.body.scrollHeight
        })

        for (const b of await books)
        {
            console.log(await b.allInnerTexts())
        }
        
        console.log("----------------------")
        console.log("Previous Height: ", previousHeight)
        console.log("Current Height: ", currentHeight)
        if (previousHeight === currentHeight) {
            break
        }
        previousHeight=currentHeight



    }
    console.log('end')


})