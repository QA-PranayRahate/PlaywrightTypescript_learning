import { test, expect } from "@playwright/test"

let baseurl = 'https://sdetqa.vercel.app/pw-locators-practice-app'

test('getByRole-Assignment', async ({ page }) => {
    await page.goto(baseurl)
    const primarybtn = page.getByRole('button', { name: 'Primary Action' })

    console.log(primarybtn.innerText())
    // primarybtn.click()
    await expect(primarybtn).toBeAttached()
    await expect(primarybtn).toBeVisible()
    await expect(primarybtn).toBeEnabled()

    //getByRole - for textbox
    const userinputbox = page.getByRole('textbox', { name: 'Username:' })
    await expect(userinputbox).toBeEmpty()
    await expect(userinputbox).toBeEditable()
    await userinputbox.fill('Sup Bitch')

    //getByRole - for links

    await page.getByRole('link', { name: 'Home' }).nth(0).click()
    console.log(page.url())

    //getByRole - checkbox

    await page.getByRole('checkbox', { name: 'Accept terms' }).check()
})


test('getByText-Assignment', async ({ page }) => {
    await page.goto(baseurl)
    const redColortext = page.getByText('colored text')
    console.log(await redColortext.innerText())
})

test('Assignment getByLabel', async ({ page }) => {

    await page.goto(baseurl)
    const email = page.getByLabel('Email Address:')
    await email.fill('Mojaved')
    console.log(await email.inputValue())
    const age = page.getByLabel('Your Age:')
    await expect(age).toBeAttached()
    await expect(age).toBeEditable()
})



test('get all links', async ({ page }) => {

    await page.goto(baseurl)
    const alllinks = page.locator('a').all()
    for (const link of await alllinks) { //we can use link as locator and access methods like getAttribute() and innerText()
        const href = await link.getAttribute('href') //get url address
        const links = await link.innerText() // gets the text 
      
        console.log(href, links)
    }
})


