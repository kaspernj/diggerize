const {dig} = require("../index")

const hash = {
  people: [
    {firstName: "Kasper", lastName: "Johansen"},
    {firstName: "Christina", lastName: "Stöckel"}
  ]
}

test("returns the value for the given path", () => {
  const firstName = dig(hash, "people", 1, "firstName")
  expect(firstName).toBe("Christina")
})