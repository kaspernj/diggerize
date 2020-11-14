const {digg} = require("../index")

const hash = {
  people: [
    {
      firstName: "Kasper",
      lastName: "Johansen",
      siblings: [
        {firstName: "Charlotte", lastName: "Johansen"}
      ]
    },
    {firstName: "Christina", lastName: "Stöckel"}
  ]
}

describe("digg", () => {
  it("returns the value for the given path", () => {
    const firstName = digg(hash, "people", 1, "firstName")
    expect(firstName).toBe("Christina")
  })

  it("raises an error if path cannot be found", () => {
    expect(() => digg(hash, "people", 1, "middleName")).toThrow(new Error("Path didn't exist: people.1.middleName"))
  })

  it("raises an error if a nested path cannot be found", () => {
    expect(() => digg(hash, "people", 0, "siblings", 0, "middleName")).toThrow(new Error("Path didn't exist: people.0.siblings.0.middleName"))
  })
})
