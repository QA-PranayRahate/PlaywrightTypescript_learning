import {test,expect} from "@playwright/test"

test('manual scripting',async({page})=>{
await page.goto('https://demowebshop.tricentis.com/')
await expect(page.getByText('Register')).toHaveText('Register')
})


//Now we will try with codegen 
//command for opening url with codegen is  npx playwright codegen 'URL' ex 'https://demowebshop.tricentis.com/'


test("using codegen npx playwright codegen 'URL' ", async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Welcome to our store');
  await page.getByAltText('Tricentis Demo Web Shop').click() //clicking on the image with AlternateText
  await page.waitForTimeout(3000)
})