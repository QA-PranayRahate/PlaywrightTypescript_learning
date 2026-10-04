import {test,expect} from '@playwright/test'

const products:string[]=['laptop','gift card', 'smartphone','monitor']
//using for of loop
/* 
for (const item of products){
test(`Search Test for ${item}`,async({page})=>{

await page.goto('https://demowebshop.tricentis.com')
await page.locator('#small-searchterms').fill(item)
await page.locator('[type="submit"]').click()
await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true})
await page.waitForTimeout(2000)
await page.close()
})
}
 */
products.forEach((item)=>{

test(`Search product Test for ${item}`,async({page})=>{

await page.goto('https://demowebshop.tricentis.com')
await page.locator('#small-searchterms').fill(item)
await page.locator('[type="submit"]').click()
await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true})
// await page.waitForTimeout(2000)
await page.close()
})
})
