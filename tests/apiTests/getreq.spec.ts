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



// using token generated from one test to use it in other

export { }
let token: string;//declaring token variable in global scope
test.beforeAll('token creation', async () => {

    test('', async ({ request }) => {

        const res = await request.post('',{data: { username: 'x', password: 'y' }})
        const jsondata = await res.json()
        expect(res.status()).toBe(200)
        token = await jsondata["token"]
    })
})

test("post", async ({ request }) => {

    const res = await request.post('baseurl.com', {
        data: { "name": "pranay", "sd": 12 },
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
})
