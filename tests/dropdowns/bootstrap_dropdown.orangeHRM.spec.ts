import { expect, test } from '@playwright/test'


test.beforeEach('getting started', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

})
test.afterEach('Going Back to Sleep', async ({ page }) => {
    await page.close()
})
test('bootstrap dropdwon handle', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    console.log('logged in')
    //click on PIM using link Role
    await page.getByRole('link', { name: 'PIM' }).click()

    // select Jobtitle from the bootstrap dropdown

    const jobTitleDropdown = page.locator('form i').nth(2)
    await jobTitleDropdown.click()

    // capturing all options from the dropdown

    // assert visibility of 1st option from the dropdown    
    const options = page.locator('div[role="listbox"] span')
    await expect(options.first()).toBeVisible()

    //count of all option values
    const optionCount = await options.count()
    console.log(optionCount)

    //get text of all options
    const optionTexts = await options.allTextContents()
    console.log(optionTexts)

    //capturing option text one by one

    for (let i = 0; i < optionCount; i++) {
        const option = options.nth(i)
        const optiontext = await option.textContent()
        console.log(optiontext)

        if (optiontext === 'QA Lead') {
            option.click()
            break
        }
    }
    await page.waitForTimeout(3000)



    // const selectJobTitle= page.getByText('QA Lead', { exact: true })
    // await selectJobTitle.click()


    //select SubUnit from the bootstrap dropdown/ Direct method
    const SubUnit = page.locator('form i').nth(3)
    await SubUnit.click()

    const selectSubunit = page.getByText('TechOps', { exact: true })
    await selectSubunit.click()

    //

})