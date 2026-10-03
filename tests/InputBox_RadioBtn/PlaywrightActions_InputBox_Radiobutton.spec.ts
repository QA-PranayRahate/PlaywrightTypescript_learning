import { test, expect } from '@playwright/test'
const baseURL = 'https://sdetqa.vercel.app/autoplay'

test.describe('Data Entry Form Validation', async () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(baseURL)
        await expect(page.getByText('AutoPlay')).toBeVisible()
    })
    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('1. page load validation', async ({ page }) => {
        await expect(page).toHaveURL(baseURL)
    })

    test('2. Input field Validation', async ({ page }) => {

        const nameField = page.getByLabel('name')
        await expect(nameField).toBeEditable()
        await nameField.click()
        await nameField.fill('Burkino faso')

        //verify max lenght

        await expect(nameField).toHaveAttribute('maxlength', '15')
        //email

        const emailField = page.getByPlaceholder('john@example.com')
        await emailField.fill('asdf@gmail.com')
        // await page.waitForTimeout(2000)
        await expect(emailField).toHaveValue('asdf@gmail.com')

        //phone

        const phoneField = page.getByLabel('phone')
        await phoneField.fill('1234568794')
        await expect(phoneField).toHaveValue('1234568794')
        // await page.waitForTimeout(2000)

        //address

        const addressField = page.getByLabel('address')
        await expect(addressField).toBeEditable()
        await expect(addressField).toBeEnabled()
        await expect(addressField).toBeAttached()
        await addressField.fill('B-40, Anand Sagar \n near Anand nagar metro station')

        //handle radio button

        const Malegender = page.getByText('Male', { exact: true })
        const femaleGender = page.getByText('Female', { exact: true })
        await Malegender.check()
        await expect(Malegender).toBeChecked()
        await expect(femaleGender).not.toBeChecked()


        // test('4. datePicker', async ({ page }) => {

        //     await page.goto(baseURL)
        //     await page.locator('[placeholder="mm/dd/yyyy"]').click()
        //     const month = page.locator('.ui-datepicker-month').innerText()
        //     const year = page.locator('.ui-datepicker-year').innerText()
        //     const nextbtn = page.getByTitle('Next')
        //     const prevbtn = page.getByTitle('Prev')
        //     while (true) {
        //         if (await month !== '' && await year === '2026') {
        //             await prevbtn.click()
        //         }
        //         else if (await month == 'December' && await year === '2026') {

        //         }
        //     }


        // })
    })


    test('3. checkbox selection', async ({ page }) => {
        //handle checkbox

        // const DayCheckbox = page.getByLabel('Sun')
        // await DayCheckbox.isChecked()
        // await DayCheckbox.click()
        // await expect(DayCheckbox).toBeChecked()

        //select all checkboxes

        //mmy logic of selecting all checkboxes using locators
        /* const selectallCheckboxes = page.locator('.check-group>input').all()
        for (const checkall of await selectallCheckboxes) {
            await checkall.check()
            await page.waitForTimeout(100)
         }

        if (await DayCheckbox.isChecked() === false) {
           await DayCheckbox.check()
        }
        else {
            await DayCheckbox.uncheck()
            console.log('sunday is already checked')
        }
        await page.waitForTimeout(2000) */

        /* pavan kumar logic using Map */

        //create a array having all the labels for each day

        const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        // const allCheckboxes = allDays.map((day) => {
        //     return page.getByLabel(day)
        // })

        // for (const checkbox of allCheckboxes) {
        //     await checkbox.check()
        //     await expect(checkbox).toBeChecked()

        // }

        // without using map
        // for (const days of allDays) {
        //     const checkbox = page.getByLabel(days)
        //     await checkbox.check()
        //     await expect(checkbox).toBeChecked()
        // }
        //Uncheck checkboxes of index 1,3,6
        const indexes = [1, 3, 6]
        const allCheckboxes = allDays.map((days) => {
            return page.getByLabel(days)
        })

        for (const i of indexes) {

            await allCheckboxes[i].check()
            await expect(allCheckboxes[i]).toBeChecked()

        }


    })

    test('field level functional validations, all fields empty', async ({ page }) => {

        const submitBtn = page.getByRole('button', { name: 'submit' }).nth(0)
        await submitBtn.click()

        const errorFields = page.locator('#formErrors')//.getByRole('listitem')
        await expect(errorFields).toContainText('Please fix the following:')
        // const allerrorMessages=errorFields.allInnerTexts()
        // console.log(allerrorMessages)

    })

    test('email validation format', async ({ page }) => {
        const emailfield = page.locator('#email')
        await emailfield.fill('222@')
        const submitBtn = page.getByRole('button', { name: 'submit' }).nth(0)
        await submitBtn.click()
        const errorFields = page.locator('#formErrors')
        await expect(errorFields).toBeVisible()
        await expect(errorFields).toContainText('Please enter a valid email address.')
    })


    test('namefield restriction', async ({ page }) => {
        const name=page.getByLabel('name')
        await name.fill('1233456789098765')
        await expect(name).toHaveValue(/.{15}/)

    })


    test ('phone field validation with regex',async({page})=>{

       const phoneField = page.getByLabel('phone')
       await phoneField.fill('123A456CDEF7890')
       await expect(phoneField).toHaveValue(/^[^A-Za-z]*$/) //matching with 123...
    })
})

