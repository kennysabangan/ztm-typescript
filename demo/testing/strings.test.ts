import { concat, div, failedString, slowString } from "./strings";

it("should say 'Hello, world!'", () => {
    expect(
        concat("Hello, ", "world!")
    ).toEqual("Hello, world!")
});

it("should divide", () => {
    expect(
        div(10, 2)
    ).toEqual(5)
})

it("should fail to divide by zero", () => {
    expect(
        () => div(10, 0)
    ).toThrow("Cannot divide by zero")
})


test("slow string fetches sample text", async () => {
    slowString()
        .then((data) => {
            expect(data).toEqual("sample");
        })
        .catch((err) => expect(err).toBeUndefined())
})

test("failed string fails with a 'whoops'", async () => {
    failedString()
        .then((data) => {
            expect(data).toBeUndefined();
        })
        .catch((err) => expect(err).toEqual("whoops"))
})
