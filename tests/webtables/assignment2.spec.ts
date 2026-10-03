import { test, expect } from '@playwright/test'

test('find total of all products', async ({ page }) => {


    await page.goto('https://sdetqa.vercel.app/autoplay')

    // ==========================================================
    // Test Step 1:
    // Open the CRUD Web Table page.
    // Expected Result:
    // The page opens successfully and the "Web Table with CRUD"
    // section is displayed.
    // ================
    const crudTableHeadig = page.locator('h3', { hasText: 'Web Table with CRUD' })
    await expect(crudTableHeadig).toBeVisible()

    // ==========================================================
    // Test Step 2:
    // Verify the CRUD table is displayed.
    // Expected Result:
    // The table is visible with the headers:
    // #, Name, Role, Action./enclosed with array [].line30
    // =======

    const crudTable = page.locator('[id="dynamicTable"]')
    const cols = crudTable.locator('thead th')
    const rows = crudTable.locator('tbody tr')

    await expect(cols).toHaveText(["#", "Name", "Role", "Action"])

    /* 3. Verify the input fields and buttons.  */
    const nameField = page.locator('#newName')

    await expect(nameField).toBeEnabled()
    await expect(nameField).toBeVisible()

    const roleField = page.locator('#newRole')
    await expect(roleField).toBeVisible()
    await expect.soft(roleField).toBeEnabled()


    const searchField = page.getByPlaceholder('Search table...')

    await expect(searchField).toBeEnabled()
    await expect(searchField).toBeVisible()

    const addBtn = page.locator('[onclick="addRow()"]')
    await expect(addBtn).toBeEnabled()

    const dynamicBtn = page.getByRole('button', { name: '+ Dynamic' })
    await expect(dynamicBtn).toBeEnabled()

    /* 4. Verify the default table data. The table contains two records: Alice and Bob.  */


    const Alicerow = crudTable.locator('tbody tr', { hasText: 'Alice' })
    const Bobrow = crudTable.locator('tbody tr', { hasText: 'Bob' })

    await expect(Alicerow).toBeVisible()
    await expect(Bobrow).toBeVisible()

    await expect(rows).toHaveCount(2)


    /*
    5. Enter Sam Tester as Name and QA 
    Lead as Role. Click Add.
    
     A new row for Sam Tester with role QA Lead is added to the 
    table.
    */

    await nameField.fill('Sam Tester')
    await roleField.fill('QA Lead')
    await addBtn.click()

    await expect(crudTable.locator('tbody tr', { hasText: 'Sam Tester' })).toBeVisible()

    await expect(rows).toHaveCount(3) // updated count 

    /* 7. Search for Alice in the search box. 
    Only the Alice record is visible, 
    and other rows are hidden. 
     */

    await searchField.fill('Alice')
    await expect(crudTable.locator('tbody tr', { hasText: 'Alice' })).toBeVisible()

    /* 8. Clear the search box. All table rows become visible again.  */

    await searchField.clear()
    await expect(searchField).toHaveValue('')
    await expect(crudTable.locator('tbody tr')).toHaveCount(3)

    /*  Delete the Bob record by 
    clicking Delete and accept the 
    confirmation dialog. 
    
    expected:
    The Bob record is removed from the table and the total row 
    count decreases to 2. */


    console.log(await rows.allInnerTexts())
    page.once('dialog', dialog => dialog.accept())
    await Bobrow.locator('button', { hasText: 'Delete' }).click()
    await expect(
        crudTable.locator('tbody tr', { hasText: 'Bob' })
    ).toHaveCount(0);

    await expect(crudTable.locator('tbody tr')).toHaveCount(2);



    /* click the Dynamic button. verify new row is added */

    await dynamicBtn.click()

    await expect(crudTable.locator('tbody tr')).toHaveCount(3)

    await expect(crudTable.locator('tbody tr', { hasText: 'New' })).toBeVisible()
    await expect(crudTable.locator('tbody tr', { hasText: 'Dev' })).toBeVisible()

    await page.close()
})