import { test, expect } from '@playwright/test'
test.describe('sorting Assignment with browserstack website', () => {
    test.beforeEach('Browser Initialize', async ({ page }) => {
        await page.goto('https://bstackdemo.com/')
        await expect(page).toHaveURL('https://bstackdemo.com/')
    })
    test.afterEach('Closing Browser', async ({ page }) => {
        await page.close()
    })
    test('1. Assignment', async ({ page }) => {
        // selecting lowest to highest option from Order By
        // await page.waitForLoadState('domcontentloaded')
        await page.getByRole('combobox').selectOption('Lowest to highest');
        await page.waitForTimeout(3000)

        //capturing all text of all the devices
        const allproducts = await page.locator('p.shelf-item__title').allTextContents()
        console.log(allproducts)
        const productCount = allproducts.length

        //capturing all prices of each devices
        const allProdPrices = (await page.locator('.val b').allTextContents())
        console.log(allProdPrices)
        const productPriceCount = allProdPrices.length
        expect(productCount).toEqual(productPriceCount)
        expect(productCount).toBeGreaterThan(0)

        //fetch the lowest price device and its name

        const firstProductIndex = 0 // Arrays are zero-indexed, so 0 is the first item.
        const lastProductIndex = allproducts.length - 1 // Calculate the last index from the current array size.(gets the literal value. -1 is used to get the last value since array starts from 0)
        const firstProductName = allproducts[firstProductIndex] // Get the name at the first index.
        const firstProductPrice = allProdPrices[firstProductIndex] // Get its price at the matching index.
        const lastProductName = allproducts[lastProductIndex] // Get the name at the last index.
        const lastProductPrice = allProdPrices[lastProductIndex] // Get its price at the matching index.

        console.log('Lowest-priced product:', firstProductName, firstProductPrice)
        console.log('Highest-priced product:', lastProductName, lastProductPrice)


      
    })
})
