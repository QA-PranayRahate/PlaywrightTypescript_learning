import {test,expect} from "@playwright/test"

    // const storagePath= "./storageData/saved_state.json"

test('login with existing storage state',async({browser})=>{

    
    const context=await browser.newContext({storageState:'./storageData/saved_state.json'})
    const page=await context.newPage()

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await expect(page.locator('h6', {hasText:'Dashboard'})).toBeVisible()
    await page.waitForTimeout(3000)


})
