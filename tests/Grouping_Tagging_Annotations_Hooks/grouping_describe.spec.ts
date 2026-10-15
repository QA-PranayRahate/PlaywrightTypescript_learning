import {test,expect} from "@playwright/test"

test.describe("Group individual level tests in a group",()=>{

    test("test1 - visit wikipedia",async({page})=>{
        await page.goto('https://en.wikipedia.org/')
    })

      test("test2 - wikipedia Login",async({page})=>{
        await page.goto('https://en.wikipedia.org/wiki/Login')
    })
})


test.describe("Group 2",()=>{

    test("Test1",async({page})=>{
        await page.goto('https://en.wikipedia.org/')
    })

      test("test2 - wikipedia Login",async({page})=>{
        await page.goto('https://en.wikipedia.org/wiki/Login')
    })
})
/*
 ---Running Through Command Line---
npx playwright test ./tests/Grouping_Tagging_Annotations_Hooks/grouping_describe.spec.ts --headed --project=chromium --grep 'Group 2'

*/

test.describe("Nested Describe Blocks-Ecommerce Website",()=>{ //parent describe

    test.describe("Ecommerce Website - Login",()=>{ //child describe

        test("enter User name",()=>{
            console.log("Entering User Name")
        })

        test("enter password",()=>{
            console.log("Entering Password")
        })
    })
})

/* By Default when running test cases using describe block, 
parallel execution will be selected. test would run based on number of workers in playwright.config.ts file*/

/* If you want to run test cases in serial mode then just add [test.describe.serial] and test cases will be executed one after anoter */

test.describe.serial('Serial execution with describe block',()=>{

    test.describe('Test 1', ()=>{
        

        test('Test1',()=>{
            console.log('test 1')
        })
        test('test 2', ()=>{
            console.log('Test 2')
        })
    })

})
























