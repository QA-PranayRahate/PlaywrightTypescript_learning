import {test,expect} from "@playwright/test"

test('verify user logged in already with local storage',async({browser})=>{

const context=await browser.newContext({storageState:'./storageData/wiki_localStorage.json'})
const page= await context.newPage()

await page.goto('https://en.wikipedia.org/wiki/Login')
await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Login')

const userName= page.locator('#pt-userpage-2')
console.log('User Name is: ',await userName.innerText())
await expect(userName).toHaveText('MedeivalPran',{ignoreCase:true})
await page.waitForTimeout(2000)
await page.close()
})