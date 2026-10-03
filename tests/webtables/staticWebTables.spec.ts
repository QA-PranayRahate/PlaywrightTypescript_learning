import { expect, test } from '@playwright/test'

test.describe('Static table Handle', () => {

    test('static web table', async ({ page }) => {

        await page.goto('https://sdetqa.vercel.app/autoplay')
        const table = page.locator('table').first()

        const headers = table.locator('thead th')
        const rows = table.locator('tbody tr')

        // assert column count
        await expect(headers).toHaveCount(5)
        console.log('header / column count : ', await headers.count())

        // assert row count
        await expect(rows).toHaveCount(4)
        console.log('rows count : ', await rows.count())

        // get 3rd row from the table. 
        const thridRowcell = rows.nth(2).locator('td')
        console.log(await thridRowcell.allInnerTexts())
        console.log('-------------------------------------------')
        //get all records excluding headers

        const tableData: string[][] = [];

        const rowCount = await rows.count()
        for (let r = 0; r < rowCount; r++) {

            const cellValues = await rows.nth(r).locator('td').allInnerTexts()
            tableData.push(cellValues)
            console.log(cellValues)
        }
        console.log('-----------------Only product Names--------------------------')
        //get only product names

        const productNames: string[] = []

        for (let r = 0; r < tableData.length; r++) {
            productNames.push(tableData[r][0])

        }
        console.log(productNames)

        expect(productNames).toEqual(['Laptop', 'Mouse', 'Keyboard', 'Monitor'])

        console.log('-------------------print products where stock is 0. keyboard-------------------')

        const outofstock: string[] = []

        for (let r = 0; r < tableData.length; r++) {
            if (tableData[r][3] === '0') {
                outofstock.push(tableData[r][0])
            }
        }
        expect(outofstock).toEqual(['Keyboard'])
        console.log(outofstock)


        console.log('-------------------print products in stock -------------------')

        const instock = []

        for (let r = 0; r < tableData.length; r++) {
            if (tableData[r][4] == 'In Stock') // checks the specific column for 'In Stock' text
            {
                instock.push(tableData[r][4])// gets the associated data from the productname column for above condition
            }


        }
        console.log(instock)


        console.log('--------------Count the products----------------')


        expect(outofstock.length).toBe(1)
        expect(instock.length).toBe(3)


        console.log('--------- price 29$ item fetch  ----------')

        const prductprice: string[] = [];
        for (let r = 0; r < tableData.length; r++) {
            if (tableData[r][2] === '$29') {
                prductprice.push(tableData[r][0])
                break
            }
        }
        console.log(prductprice)












        

        console.log('-----------------2nd table. can ignore--------------------------')
        //2nd table

        const tableContent = page.locator('#dynamicTable')
        const tcols = tableContent.locator('thead th')
        const trows = tableContent.locator('tbody tr')
        await expect(trows).toHaveCount(2)


        const rowcount = await trows.count()

        const tableval: string[][] = []
        for (let row = 0; row < rowcount; row++) {

            const data = await trows.nth(row).locator('td').allInnerTexts()
            tableval.push(data)
            console.log(tableval)
        }
    })

})