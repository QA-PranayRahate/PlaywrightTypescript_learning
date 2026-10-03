import {test,expect} from "@playwright/test"

test('selector vs locator',async({page})=>{

    await page.goto('https://playwright.dev/')
    
   const select = page.locator('#id')
})


