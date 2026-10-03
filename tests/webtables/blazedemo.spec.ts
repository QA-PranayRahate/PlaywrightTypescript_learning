import { expect, test } from '@playwright/test'
test.describe('blazedemo', () => {

    test.beforeEach('browser setup', async ({ page }) => {
        await page.goto('https://blazedemo.com/')
        await expect(page).toHaveTitle('BlazeDemo')
        expect(page).toHaveURL('https://blazedemo.com/')


    })

    test.afterEach('browser teardown', async ({ page }) => {
        await page.close()
    })


    test('ticket booking excerise', async ({ page }) => {

        //select departure
        const departureText = page.locator('.container h2').nth(0)
        expect(departureText).toContainText('departure')

        const departureCity = page.locator('[name="fromPort"]')
        await departureCity.selectOption({ value: 'Boston' })

        //select destination
        const destinationText = page.locator('.container h2').nth(1)
        expect(destinationText).toContainText('destination')

        const destinationCity = page.locator('[name="toPort"]')
        await destinationCity.selectOption('London')
        //Validating and Clicking FindFlights button
        const FindFlightsbtn = page.locator('[value="Find Flights"]')

        await expect(FindFlightsbtn).toBeVisible()
        await FindFlightsbtn.click()
        // await page.waitForTimeout(2000)

        //Capturing all data from the booking table
        const captureData: string[][] = [];
        const rows = page.locator('tbody tr')
        const rowscount = await rows.count()
        console.log('Total Row Count: ', rowscount)

        for (let i = 0; i < rowscount; i++) {
            const cellvalue = await rows.nth(i).locator('td').allInnerTexts()
            console.log(cellvalue)
            captureData.push(cellvalue)
        }

        const lowestTicketPrice = []
        let lowestPrice = 400 //random low value for comparison

        const chooseFlight = rows.locator('[value="Choose This Flight"]')

        for (let r = 0; r < rowscount; r++) {
            const currentPrices = parseInt(captureData[r][5].replace('$', ''))

            if (currentPrices < lowestPrice) {
                lowestPrice = currentPrices
                lowestTicketPrice.push(captureData[r][0])
                await chooseFlight.nth(r).click()
           }

        }
        console.log(' Lowest Price Ticket: ', lowestPrice)


        await page.getByLabel('Name').nth(0).fill('John')

        await page.getByLabel('Address').fill('Now')
        await page.getByLabel('City').fill('Mumbai')
        await page.getByLabel('State').fill('MH')
        await page.getByLabel('Zip Code').fill('12334')
        await page.locator('[name="cardType"]').selectOption({label:'American Express'})
        await page.getByLabel('Credit Card Number').fill('1232323')
        await page.getByLabel('Month').fill('12')
        await page.getByLabel('Year').fill('2028')
        await page.getByLabel('Name on Card').fill('John Doe')
        await page.getByText('Remember me').check()
        await page.getByRole('button', {name: 'Purchase Flight'}).click()

        const text= await page.getByText('Thank you for your purchase today!').innerText()
        expect(text).toContain('Thank you')
        console.log(text)
        await page.waitForTimeout(1000)
    })



})