import {digs} from "../src/index.mjs"

const hash = {firstName: "Kasper", lastName: "Johansen"}

describe("digs", () => {
  it("destructs the given object", () => {
    const {firstName, lastName} = digs(hash, "firstName", "lastName")
    expect(firstName).toBe("Kasper")
    expect(lastName).toBe("Johansen")
  })

  it("throws an error if an given key couldnt be found", () => {
    const test = () => {
      const {firstName, middleName, lastName} = digs(hash, "firstName", "middleName", "lastName")
    }

    expect(test).toThrow(new Error("Target didn't contain expected key: middleName"))
  })
})
