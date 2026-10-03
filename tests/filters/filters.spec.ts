import { test, expect } from "@playwright/test"

const baseurl = 'https://sdetqa.vercel.app/filters_practice'

test.beforeEach(async ({ page }) => {
    await page.goto(baseurl)
})

test.afterEach(async ({ page }) => { await page.close() })

//test.beforeAll
test.beforeAll(async () =>{
    console.log('Starting Suite Execution')
})

//test.afterAll
test.afterAll(async () =>{
    console.log('Execution Completed. report Generated...')
})

//test. describe (groups module level tests and execute them at once)
test.describe('Running Filter Tests',async()=>{

test('ds',async({ page })=>{

    await page.goto(baseurl)
})
    
})
















//individual Tests
test('filters', async ({ page }) => {

    await page.goto(baseurl)
    await page.getByRole('listitem').filter({ hasText: 'Product 2' }).
        getByRole('button', { name: 'Add to cart' }).click()


})

test('Count item not having "Out of Stock" ', async ({ page }) => {
    await page.goto(baseurl)
    const instock = page.locator('.card').nth(1).getByRole('listitem').filter({ hasText: 'In stock' })
    await expect(instock).toHaveCount(3)
})

test('filter using datatest id', async ({ page }) => {
    await page.goto(baseurl)
    // const fruites=page.locator('.card').nth(2)
    const apple = page.getByTestId('apple')
    const mango = page.getByTestId('mango')

    //verify visibility of element
    await expect(mango).toBeVisible()
    //verify text content is present 
    await expect(mango).toContainText('mango')
})


test('count testid : ', async ({ page }) => {
    await page.goto(baseurl)


    const fruites = page.locator('.card').nth(2).locator('[data-testid]').all() //captures all elements
    for (const count of await fruites) {
        const names = await count.allInnerTexts() //gets innertext
        console.log(names)
    }
    const fruitecount = (await fruites).length // gets the length of all elements combined

    expect(fruitecount).toEqual(5) // Assert count of fruites with line 43

})

test('find Say Goodbye button for john', async ({ page }) => {

    await page.goto(baseurl)
    const goodbyeBtn = page.locator('.card').nth(3).getByRole('listitem').filter({ hasText: 'John' }).getByRole('button', { name: 'Say goodbye' })
    const goodbybtn_text = await goodbyeBtn.innerText()
    console.log(goodbybtn_text)

    await expect(goodbyeBtn).toBeVisible()
    expect(goodbybtn_text).toContain('Say')
})


test('find "subscribe" button using multiple conditions', async ({ page }) => {
    await page.goto(baseurl)
    const subscribebtn = page.locator('.card')
        .nth(4)
        .getByRole('button')
        .and(page.getByText('Subscribe'))
    console.log('Count of subscribe button', await subscribebtn.count())
    await expect(subscribebtn).toHaveCount(3), 'Working as expected'

})


test('extract details button of done tasks', async ({ page }) => {
    await page.goto(baseurl)
    const tasks = page.locator('.card').nth(5)
        .getByRole('listitem')
        .filter({ hasText: 'done' })
        .getByRole('button', { name: 'details' })

    console.log(await tasks.allInnerTexts())


})