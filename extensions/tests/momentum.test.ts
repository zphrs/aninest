import { RingQueue } from "../src/momentum"

describe("ring queue", () => {
  test("add", () => {
    const rc = new RingQueue(10)
    rc.push({ x: 0 })
    rc.push({ x: 1 })
    expect(rc[0]).toEqual({ x: 0 })
    expect(rc[1]).toEqual({ x: 1 })
    rc.clear()
    rc.push({ x: 2 })
    expect(rc[0]).toEqual({ x: 2 })
    expect(rc.length).toBe(1)
  })
})
