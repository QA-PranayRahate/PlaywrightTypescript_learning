import {test,expect} from "@playwright/test"

test('selector vs locator',async({page})=>{

    await page.goto('https://playwright.dev/')
    
   const select = page.locator('#id') 
   /*  '#id'  is the selector—a CSS query string identifying an element.  
   page.locator('#id')  creates a Locator object that uses that selector to find and interact with the element */
// This is locator //this is selector

})


