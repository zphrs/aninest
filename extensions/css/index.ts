import { Extension, Animation, addRecursiveListener } from "aninest"
import { supportAbortSignalOption } from "../src/abortSignal"
import { getStateTreeProxy } from "../src/proxy"
import { Color, colorToString } from "./color"
export * from "./color"

type Vec3<T> = Readonly<{
  x?: T
  y?: T
  z?: T
}>

type TypedScalar = [unknown, unknown]

/**
 *
 * @param s
 * @throws when there is no number found
 */
export function typedScalarFromString(s: `${number}${string}`): TypedScalar {
  const num = Number.parseFloat(s)
  // regex to match the text following the number
  const r = /^[0-9.]+([a-zA-Z%]+)?/
  const match = s.match(r)
  if (match === null) {
    throw new Error(`Unable to parse unit in typed scalar "${s}"`)
  }
  return [num, match[1] ?? ""]
}

function orDefault<T extends TypedScalar>(a: T | undefined, defaultValue: T) {
  return a !== undefined ? a : defaultValue
}
export function typedScalarToString<T extends TypedScalar>(a: T) {
  return `${a[0]}${a[1]}` as const
}

function vec3ToString<T extends TypedScalar>(
  v: Vec3<T>,
  defaultValue: T
): string {
  const handleTypedValue = (val: T | undefined) =>
    typedScalarToString(orDefault(val, defaultValue))
  return (
    `(${handleTypedValue(v.x)}, ` +
    `${handleTypedValue(v.y)}, ` +
    `${handleTypedValue(v.z)})`
  )
}

type Vec2<T> = Readonly<{
  x?: T
  y?: T
}>

function vec2ToString<T extends TypedScalar>(v: Vec2<T>, defaultValue: T) {
  const handleTypedValue = (val: T | undefined) =>
    typedScalarToString(orDefault(val, defaultValue))
  return `(${handleTypedValue(v.x)}, ${handleTypedValue(v.y)})` as const
}

const viewportUnits = ["vw", "vh", "vmax", "vmin", "vb", "vi"] as const

const smallViewportUnits = viewportUnits.map(v => `s${v}` as const)
const largeViewportUnits = viewportUnits.map(v => `l${v}` as const)
const dynamicViewportUnits = viewportUnits.map(v => `d${v}` as const)

const lengthUnits = [
  "cap",
  "ch",
  "em",
  "ex",
  "ic",
  "lh",
  "rcap",
  "rch",
  "rem",
  "rex",
  "rlh",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmin",
  "cqmax",
  "px",
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  ...viewportUnits,
  ...smallViewportUnits,
  ...largeViewportUnits,
  ...dynamicViewportUnits,
  "%",
] as const

type LengthUnit = (typeof lengthUnits)[number]

export type Distance = [number, LengthUnit]

export type Scalar = [number, "%" | ""]

const rotationUnits = ["deg", "grad", "rad", "turn"] as const

type RotationUnit = (typeof rotationUnits)[number]

export type Angle = [number, RotationUnit]

/**
 * Note: values have units. If you want different units
 * then
 */
export type CSSProps = {
  transform?: Transform
  opacity?: Scalar
  color?: Color
  backgroundColor?: Color
  borderColor?: Color
  borderRadius?: BorderRadius

  /**
   * A key with camel case will be converted to skewered.
   * If in skewer format already, key will be left alone.
   * No need for first two dashes.
   */
  vars?: {
    [key: string]: string
  }
}

type Transform = {
  translate?: Vec3<Distance>
  scale?: Scalar | Vec2<Scalar>
  rotate?: Angle | Vec3<Angle>
  skew?: Angle | Vec2<Angle>
  perspective?: Distance
  origin?: Vec3<Distance>
}

type BorderRadius =
  | Distance
  | {
      topLeft?: Distance
      topRight?: Distance
      bottomLeft?: Distance
      bottomRight?: Distance
    }

export const cssDefaults: CSSProps = {
  transform: {
    translate: {
      x: [10, "px"],
    },
  },
}

function scalarToVec3<T extends [unknown, string]>(v: T | Vec3<T>): Vec3<T> {
  return Array.isArray(v) ? { x: v as T, y: v as T, z: v as T } : v
}

function scalarToVec2<T extends [unknown, string]>(v: T | Vec2<T>): Vec2<T> {
  return Array.isArray(v) ? { x: v as T, y: v as T } : v
}
// source: https://stackoverflow.com/a/67243723
const kebabize = (str: string) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  )
const ifDef = (s: string | false | undefined): string => {
  if (s === undefined || s === false) {
    return ""
  }
  return s
}

export function bindElementToCssAnim(
  element: HTMLElement
): Extension<CSSProps> {
  const identityAngle: Angle = [0, "deg"] as const
  const identityScalar: Scalar = [1, ""] as const
  const identityLength: Distance = [0, "px"] as const
  const setBorderRadius = (
    element: HTMLElement,
    borderRadius: BorderRadius
  ) => {
    if (Array.isArray(borderRadius)) {
      element.style.borderRadius = typedScalarToString(borderRadius)
      return
    }
    const { topLeft, topRight, bottomLeft, bottomRight } = borderRadius
    const handleRadius = (rad: Distance | undefined) =>
      rad !== undefined ? typedScalarToString(rad) : ""
    element.style.borderTopLeftRadius = handleRadius(topLeft)
    element.style.borderTopRightRadius = handleRadius(topRight)
    element.style.borderBottomLeftRadius = handleRadius(bottomLeft)
    element.style.borderBottomRightRadius = handleRadius(bottomRight)
  }
  const getCssVarString = (varName: string) => {
    if (varName.indexOf("-") > -1) {
      return `--${varName}`
    }
    return `--${kebabize(varName)}`
  }
  const mount = (anim: Animation<CSSProps>) => {
    const proxy = getStateTreeProxy(anim)
    const controller = new AbortController()
    const { signal } = controller
    const getTransformString = (transformProxy: Transform) => {
      const { translate, rotate, skew, scale, perspective } = transformProxy
      return (
        `` +
        ifDef(
          translate !== undefined &&
            `translate${vec3ToString(translate, identityLength)} `
        ) +
        ifDef(
          rotate !== undefined &&
            `rotate${vec3ToString(scalarToVec3(rotate), identityAngle)} `
        ) +
        ifDef(
          scale !== undefined &&
            `scale${vec2ToString(scalarToVec2(scale), identityScalar)} `
        ) +
        ifDef(
          skew !== undefined &&
            `skew${vec2ToString(scalarToVec2(skew), identityAngle)} `
        ) +
        ifDef(perspective !== undefined && `perspective(${perspective}px);`)
      )
    }
    addRecursiveListener(
      anim,
      "update",
      () => {
        // transform
        const {
          transform,
          color,
          backgroundColor,
          borderColor,
          borderRadius,
          opacity,
        } = proxy.proxy
        const { origin: transformOrigin } = transform ?? { origin: undefined }
        const style = element.style
        transform && (style.transform = getTransformString(transform))
        // color
        color !== undefined && (style.color = colorToString(color))
        // background-color
        backgroundColor !== undefined &&
          (style.backgroundColor = colorToString(backgroundColor))
        // border-color
        borderColor !== undefined &&
          (style.borderColor = colorToString(borderColor))
        style.opacity = `${opacity}`
        // border radius
        borderRadius !== undefined && setBorderRadius(element, borderRadius)
        // transform-origin
        transformOrigin !== undefined &&
          (style.transformOrigin = vec3ToString(
            scalarToVec3(transformOrigin),
            identityLength
          ))
        // css variables
        for (const v in proxy.proxy.vars) {
          style.setProperty(getCssVarString(v), proxy.proxy.vars[v])
        }
      },
      { signal }
    )

    return controller.abort
  }

  return supportAbortSignalOption(mount)
}
