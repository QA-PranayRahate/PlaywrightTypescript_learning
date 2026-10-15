import {test,expect} from "@playwright/test"

test('local Storage', async ({ browser }) => {


    const context = await browser.newContext()
    const page = await context.newPage()

    //Wikipedia user name: MedeivalPran  pass: FullSpeedAhead@2Y

    await page.goto('https://en.wikipedia.org/wiki/Login')
    await page.locator('#pt-login-2').click()

    await page.locator('#wpName1').fill('MedeivalPran')
    await page.locator('#wpPassword1').fill('FullSpeedAhead@2Y')
    await page.getByRole('button' , {name:'Log in'}).click()
    await page.waitForTimeout(3000)
    context.storageState({path:'./storageData/wiki_localStorage.json'})

    await page.waitForTimeout(3000)

})
