import {
  createAnimation,
  getLinearInterp,
  getLocalState,
  modifyTo,
  updateAnimation,
} from "../src"

type Color = {
  hue: number
  chroma: number
  tone: number
}
describe("oof", () => {
  test("oof", () => {
    type RoundedRect = {
      styles: {
        colors: {
          backgroundColor: Color
          borderColor: Color
        }
        borderWidth: number
      }
    }

    const anim = createAnimation<RoundedRect>(
      {
        styles: {
          colors: {
            backgroundColor: { hue: 0, chroma: 0, tone: 0 },
            borderColor: { hue: 0, chroma: 0, tone: 0 },
          },
          borderWidth: 0,
        },
      },
      getLinearInterp(1)
    )

    modifyTo(anim, {
      styles: {
        borderWidth: 5,
      },
    })
    updateAnimation(anim, 0.5)
    expect(getLocalState(anim.children.styles).borderWidth).toBe(2.5)
    modifyTo(anim, {
      styles: {
        borderWidth: 0,
      },
    })
    console.log("HERE1")
    updateAnimation(anim, 0.5)
    modifyTo(anim, {
      styles: {
        colors: {
          backgroundColor: { hue: 0, chroma: 0, tone: 0 },
          borderColor: { hue: 0, chroma: 0, tone: 0 },
        },
      },
    })
    console.log("HERE2")
    updateAnimation(anim, 1)
    expect(getLocalState(anim.children.styles).borderWidth).toBe(0)
  })

  test("oof2", () => {
    type Styles = {
      colors: {
        backgroundColor: Color
        borderColor: Color
      }
      borderWidth: number
    }

    const anim = createAnimation<Styles>(
      {
        colors: {
          backgroundColor: { hue: 0, chroma: 0, tone: 0 },
          borderColor: { hue: 0, chroma: 0, tone: 0 },
        },
        borderWidth: 0,
      },
      getLinearInterp(1)
    )

    modifyTo(anim, {
      borderWidth: 5,
    })
    updateAnimation(anim, 0.5)
    expect(getLocalState(anim).borderWidth).toBe(2.5)
    modifyTo(anim, {
      borderWidth: 0,
    })
    updateAnimation(anim, 0.5)
    modifyTo(anim, {
      colors: {
        backgroundColor: { hue: 0, chroma: 0, tone: 0 },
        borderColor: { hue: 0, chroma: 0, tone: 0 },
      },
    })
    updateAnimation(anim, 1)
    expect(getLocalState(anim).borderWidth).toBe(0)
  })
  test("oof3", () => {
    type Styles = {
      color: Color
      borderWidth: number
    }

    const anim = createAnimation<Styles>(
      {
        color: {
          hue: 0,
          chroma: 0,
          tone: 0,
        },
        borderWidth: 5,
      },
      getLinearInterp(1)
    )
    modifyTo(anim, {
      borderWidth: 0,
    })
    updateAnimation(anim, 0.5)
    modifyTo(anim, {
      color: {
        hue: 0,
        chroma: 0,
        tone: 0,
      },
    })
    const shouldUpdate = updateAnimation(anim, 1)
    console.log("TIME", anim._time)
    expect(shouldUpdate).toBe(false)
    expect(getLocalState(anim).borderWidth).toBe(0)
  })
})
