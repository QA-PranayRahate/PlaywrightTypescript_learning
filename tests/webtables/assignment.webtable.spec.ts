import { test, expect } from '@playwright/test'

test('find total of all products', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay')
    const table = page.locator('table').first()

    const columns = table.locator('thead th')
    const rows = table.locator('tbody tr')


    const tableData: string[][] = []

    const rowcount = await rows.count()
    for (let r = 0; r < rowcount; r++) {

        const cellValues = await rows.nth(r).locator('td').allInnerTexts()
        tableData.push(cellValues)
        // console.log(cellValues)
    }


    let sumPrice = 0;
    for (let r = 0; r < tableData.length; r++) {

        sumPrice = sumPrice + Number(tableData[r][2].replace('$', ''))
    }
    console.log('Total of All Product Price is: ', sumPrice)
    expect(sumPrice).toBe(1456)

    console.log('Highest Price product')

    let highestPrice = 0
    const highestPriceprod = []
    for (let r = 0; r < tableData.length; r++) {

        const currentPrice = Number(tableData[r][2].replace('$', ''))

        if (currentPrice > highestPrice) {
            highestPrice = currentPrice
            highestPriceprod.push(tableData[r][0])
        }
    }
    console.log(highestPriceprod, '$', (highestPrice).toString())

    //Lowest prod price
    let lowestPrice = 29
    const lowestPriceProd = []
    for (let r = 0; r < tableData.length; r++) {
        const currentlowestPrice = Number(tableData[r][2].replace('$', ''))

        if (currentlowestPrice < lowestPrice) {
            lowestPrice = currentlowestPrice
            lowestPriceProd.push(tableData[r][0])
        }
    }
    console.log(lowestPriceProd, lowestPrice)


    //product more than 100$

    let prodPrice=100
    const prodName=[]
    for (let r = 0; r < tableData.length; r++) {
        const allprodPrice = Number(tableData[r][2].replace('$', ''))
    
    if (allprodPrice>prodPrice)
    {
        
        prodName.push(tableData[r][0])
        console.log(allprodPrice, prodName)
      
    }
   
    }

    
})
