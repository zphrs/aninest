import { Angle, Scalar, typedScalarToString } from "."

export type EightBitNumber = number

type Rgb = {
  space: "rgb"
  r: EightBitNumber
  g: EightBitNumber
  b: EightBitNumber
  a?: Scalar
}

type Hsl = {
  space: "hsl"
  h: Angle
  s: Scalar
  l: Scalar
  a?: Scalar
}

type Hwb = {
  space: "hwb"
  h: Angle
  w: Scalar
  b: Scalar
  a?: Scalar
}

const rectangularColorSpaces = [
  "srgb",
  "srgb-linear",
  "display-p3",
  "a98-rgb",
  "prophoto-rgb",
  "rec2020",
  "lab",
  "oklab",
  "xyz",
  "xyz-d50",
  "xyz-d65",
] as const

type RectangularColorSpace = (typeof rectangularColorSpaces)[number]

const polarColorSpaces = ["lch", "oklch"] as const
type PolarColorSpace = (typeof polarColorSpaces)[number]

export type Color =
  | {
      space: RectangularColorSpace | PolarColorSpace
      c1: Scalar
      c2: Scalar
      c3: Scalar
      a?: Scalar
    }
  | Rgb
  | Hsl
  | Hwb

export function colorToString(color: Color) {
  const alphaString = color.a === undefined ? "" : ` / ${color.a}`
  const toPercent = (s: Scalar) => {
    const [n, unit] = s
    if (unit === "") {
      return `${Math.round(n * 100)}%` as const
    } else return `${n}${unit}` as const
  }

  switch (color.space) {
    case "rgb":
      return `rgb(${color.r} ${color.g} ${color.b}${alphaString})` as const
    case "hsl":
      return (
        `hsl(${typedScalarToString(color.h)} ` +
        `${toPercent(color.s)} ` +
        `${toPercent(color.l)}` +
        `${alphaString})`
      )
    case "hwb":
      return (
        `hwb(${typedScalarToString(color.h)} ` +
        `${toPercent(color.w)} ` +
        `${toPercent(color.b)}` +
        `${alphaString})`
      )
  }

  return `color(${color.space} ${color.c1} ${color.c2} ${color.c3}${alphaString})`
}
