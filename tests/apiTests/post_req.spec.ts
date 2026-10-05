import { expect, test } from "@playwright/test"
import { faker } from '@faker-js/faker';
let payload = {

    "email": faker.internet.email(),
    "firstName": faker.person.firstName(),
    "lastName": faker.person.lastName()

}
test('check authorization ', async ({ request }) => {
    const res = await request.post('http://localhost:8080/api/users', {
        data: payload,
        headers: {
            "Content-Type": "application/json",
        }
    })
    expect(res.status()).toBe(201)
    // const jsondata=await res.json()
    // console.log(jsondata)
    console.log(await res.text())

})