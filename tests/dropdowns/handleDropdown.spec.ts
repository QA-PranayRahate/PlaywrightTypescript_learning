import { test, expect } from '@playwright/test'

const baseURL = 'https://sdetqa.vercel.app/autoplay'

test.describe('dropdown validation', () => {

    test.beforeEach('intiate browser', async ({ page }) => {

        await page.goto(baseURL)
    })

    test.afterEach('close the browser', async ({ page }) => {
        await page.close()
    })


    test('handle dropdown', async ({ page }) => {

        //select single country from the list
        const selectCountry = page.locator('#country')
        // await page.waitForTimeout(1000)

        await expect(selectCountry).toHaveValue('india')

        await selectCountry.selectOption('france')
        await page.waitForTimeout(100)
        await selectCountry.selectOption({ index: 2 })
        await page.waitForTimeout(100)
        await selectCountry.selectOption({ label: 'Germany' })
        await page.waitForTimeout(100)

        //get all the countries from the list
        console.log(await selectCountry.innerText())
        await expect(selectCountry).toHaveValue('germany')

    })

    test('select multiple options',async({page})=>{

         //select multiple values from the list (color selection)

        const multiOptionSelect = page.locator('[id="colors"]')
        await expect(multiOptionSelect).toBeVisible()

        await expect(multiOptionSelect).toHaveValue('blue')
        await multiOptionSelect.selectOption([{label:'Red'}, {label:'Blue'}, {label:'Green'}])//put mltiple values in array format
        await multiOptionSelect.selectOption([{value:'red'}, {value:'blue'}, {value:'yellow'}])//put mltiple values in array format
        await page.waitForTimeout(2000)


    })

    test('select default country from the dropdown', async ({ page }) => {

        const selectCountry = page.locator('#country option')
        await page.waitForTimeout(1000)
        await expect(selectCountry).toHaveValue('india') //check for india default value
        console.log(await selectCountry.first().innerText())

    })

    test('test get count and 1st country selected default', async ({ page }) => {

        const Countries = page.locator('#country')

        await expect(Countries).toHaveValue('india')
        //locator chaining using locator twice to get the count of countries
        const countryOption = Countries.locator('option')
        await expect(countryOption).toHaveCount(5)

        //one shot getting count of all the countries 
        const CountriesCount = page.locator('#country option') // can be written as ('#country>option')
        await expect(CountriesCount).toHaveCount(5)

        //when count is not known then use count. dynamically gets the count

        const count = await CountriesCount.count()
        expect(count).toBe(5)

    })

    test('sorted array',async({page})=>{

        const dropdownoptions =await page.locator('#sorted option').allTextContents()
        console.log(dropdownoptions)


        //original list
        const listoptions= dropdownoptions
        

    
    })



    test('infinite scroll', async ({ page }) => {

        // const infi = page.locator('#scrollable option')
        // const count = await infi.)
        //         console.log(count)

       
    })



})