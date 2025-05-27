import {digger} from "../src/index.js"

const hash = {
  people: [
    {
      firstName: "Kasper",
      lastName: "Johansen",
      siblings: [
        {firstName: "Charlotte", lastName: "Johansen"}
      ],
      calculatedAge: () => 25
    },
    {firstName: "Christina", lastName: "Stöckel"}
  ]
}

describe("digger", () => {
  it("doesnt call functions if not set in options", () => {
    const result = digger(hash, ["people", 0, "calculatedAge"], {})

    expect(typeof result).toBe("function")
  })

  it("calls functions if set in options", () => {
    expect(digger(hash, ["people", 0, "calculatedAge"], {callFunctions: true})).toBe(25)
  })
})
