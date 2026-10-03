import { test, expect } from "@playwright/test"
const baseurl:string='https://sdetqa.vercel.app/pw-locators-demo-app'
test.skip('getByRole Locator', async ({ page }) => {
    await page.goto(baseurl)
    const projectLinks = page.getByRole('link', { name: 'Projects' })

    expect(projectLinks).toBeAttached()
    expect(projectLinks).toBeEnabled()
    expect(projectLinks).toBeVisible()
    await projectLinks.click()
})

test.skip ('getByText',async({page})=>{

 await page.goto(baseurl)
 const projectStatus=page.getByText('Production Ready',{exact:false})
 await expect(projectStatus).toHaveText('Production Ready')
 console.log(projectStatus.textContent)
 
})

test.skip('loop through all buttons',async({page})=>{
await page.goto(baseurl)

const groups=await page.locator('.btn-group').nth(0).all()
// const groups = await page.locator('.btn-group').all()

for (const group of groups)
{
    const allbuttonstext=await group.getByRole('button').allTextContents()
    console.log(allbuttonstext)
}

})


test.skip('getByLabel',async({page})=>{

    
    await page.goto(baseurl)
    const currenturl = page.url()
    console.log(currenturl)
    await page.getByLabel('First Name', {exact:true}).fill('Niger')
    await page.getByLabel('Country').selectOption('India')
    await page.getByText('Submit Registration').click()

    const now = new Date()
    now.toLocaleDateString().replace(/[:.]/g, '-')
    const formattedDate = now.toISOString().replace(/[:.]/g, '-')
    console.log(formattedDate)
    await page.screenshot({path:`./screenshot/ss1-${formattedDate}.png`,fullPage:true})
    await page.waitForTimeout(2000)
    
    
})

test.skip('getByPlaceholder',async({page})=>{
await page.goto(baseurl)
await page.getByPlaceholder('Tell us about yourself...').fill('kaay jhata sangu bc. lavde lagle ahet')
await page.locator('[type="submit"]').click()
await page.waitForTimeout(2000)
await page.close()

})

test.skip('getByAlttext for images basically',async({page})=>{

    await page.goto(baseurl)
    const text= page.getByAltText('Playwright logo')
    await expect.soft(text).toBeVisible()

})


test('getByTitle',async({page})=>{

    await page.goto(baseurl)
    const totalruns=page.getByTitle('Total test runs')
    const TotalRuns=await totalruns.allInnerTexts()
    console.log(TotalRuns) // get both values at once 
    for (const runs of TotalRuns)//print 1 value at a time
    {
        
        console.log(runs)
    }
    
    
    
})

