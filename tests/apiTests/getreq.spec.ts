import { expect, test } from "@playwright/test"

test('check status ', async ({ request }) => {

    const res = await request.get('https://simple-grocery-store-api.glitch.me/status')
    expect(res.status()).toBe(200)
    const jsondata = await res.json()
    console.log(jsondata)
    console.log(jsondata['status'])
    expect(Array.isArray(jsondata)).toBeTruthy();

})


test('get single products ', async ({ request }) => {

    const res = await request.get('https://simple-grocery-store-api.glitch.me/products/4646')
    expect(res.status()).toBe(200)
    const jsondata = await res.json()
    console.log(jsondata)
    expect(Array.isArray(jsondata)).toBeFalsy();

})


test('get all products ', async ({ request }) => {

    const res = await request.get('https://simple-grocery-store-api.glitch.me/products')
    expect(res.status()).toBe(200)
    const jsondata = await res.json()
    console.log(jsondata)
    expect(Array.isArray(jsondata)).toBeTruthy();

})

