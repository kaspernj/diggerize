import {dig} from "../src/index.mjs"

const hash = {
  people: [
    {firstName: "Kasper", lastName: "Johansen"},
    {firstName: "Christina", lastName: "Stöckel"}
  ]
}

describe("dig", () => {
  it("returns the value for the given path", () => {
    const firstName = dig(hash, "people", 1, "firstName")
    expect(firstName).toBe("Christina")
  })

  it("returns undefined if path cannot be found", () => {
    const result = dig(hash, "people", 1, "middleName")
    expect(result).toBe(undefined)
  })
})
