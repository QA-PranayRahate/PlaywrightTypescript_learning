import { test, expect } from '@playwright/test';

test('Config_GlobalLevel_Changes_Trace_Video_Screenshot', async ({ page }) => {
  await page.goto('https://sdetqa.vercel.app/autoplay');
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await expect(page.locator('#dataEntryForm')).toMatchAriaSnapshot(`- text: Full name`);
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('KUNAL DESAI');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Email' }).fill('dotdot@gmail.com');
  await page.getByRole('textbox', { name: 'Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone' }).fill('90');
  await page.getByRole('textbox', { name: 'Phone' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Phone' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Phone' }).fill('1234565432');
  await page.getByRole('textbox', { name: 'Address' }).click();
  await page.getByRole('textbox', { name: 'Address' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Address' }).fill('8 mile, detroit');
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Thu' }).check();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: ' Submit' }).click();
  await expect(page.locator('#dataEntryForm')).toMatchAriaSnapshot(`- button " Submit"`);
});