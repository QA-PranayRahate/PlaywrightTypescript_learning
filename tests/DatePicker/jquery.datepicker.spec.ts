import { test, expect } from "@playwright/test"

test('datePicker', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay')
    const datepicker = page.locator('#datepicker1').nth(0).click()

    const calendar = page.locator('.ui-datepicker-calendar')

    const dates = page.locator('.ui-datepicker-calendar tbody tr')
    await dates.locator('a').count()


    const nextbtn = page.locator('[class="ui-datepicker-next ui-corner-all"]')
    const month = page.locator('.ui-datepicker-month')
    const year = page.locator('.ui-datepicker-year')
   
  while (!(await month.innerText() === 'May' && await year.innerText() === '2028')) {
    await nextbtn.click({timeout:18000});
  }

  await calendar.locator('a').getByText('13', { exact: true }).click();
  await page.close()
});
