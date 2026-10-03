import { test, expect } from '@playwright/test'

test.describe('flipkart dropdown for smart text', () => {

    test.beforeEach('launch flipkart website', async ({ page }) => {
        await page.goto('https://www.flipkart.com/')

    })
    test.afterEach('close', async ({ page }) => {await page.close()})

    test('Bootstrap dropdown', async ({ page }) => {
        //close the mobile number popup
        await page.getByRole('button', { name: '✕' }).click()
        //validate search box is visible
        const searchBox =  page.getByRole('textbox', { name: 'Search for Products, Brands' })

        await expect(searchBox).toBeVisible()

        // enter 'smart' text in the searchbox

        await searchBox.fill('smart')

        const allSuggestions = page.locator('div ul.VCplLH li.Swx5kP')
        await expect(allSuggestions.first()).toBeVisible()
        console.log(await allSuggestions.allTextContents()) // in array form

        //getting 5th element from the suggestions
        console.log(await allSuggestions.nth(4).textContent())

        const suggestioncount=await allSuggestions.count()
        console.log(suggestioncount) //count of all the matching suggestions

         /*
         getting all the suggestions and clicking on
        the suggestion having value as smartphone
         */

        for (let i=0;i<suggestioncount;i++)
        {
            const Suggestion= allSuggestions.nth(i)
            const allsuggestionText=await Suggestion.textContent()
            console.log(allsuggestionText)

            if (allsuggestionText==='smartphone'){

                 Suggestion.click()
                 break
            }
        }

        await page.waitForTimeout(2000)


    })
})