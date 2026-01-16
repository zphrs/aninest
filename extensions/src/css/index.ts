import {
  Extension,
  Animation,
  addRecursiveListener,
  Layer,
  changeInterpFunction,
  addLocalListener,
  Seconds,
  UnknownAnimation,
  getStateTree,
  getInterpingToTree,
  updateAnimation,
} from "aninest"
import { supportAbortSignalOption } from "../abortSignal"
import { getStateTreeProxy } from "../proxy"
import { Color, colorToString } from "./color"
import {
  CubicBezier,
  cubicBezierToEasingFunction as cubicBezierToString,
  cubicBezierToInterp,
  Linear,
} from "./interp"
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
 * Note: values are coupled with units. If you want different units
 * then simply use the unit you'd like in the value.
 */
export type CSSProps = {
  transform?: Transform
  opacity?: Scalar
  color?: Color
  backgroundColor?: Color
  borderColor?: Color
  borderRadius?: BorderRadius
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
  const mount = (anim: Animation<CSSProps>) => {
    const proxy = getStateTreeProxy(anim)
    const controller = new AbortController()
    const { signal } = controller
    const getTransformString = (transformProxy: Transform) => {
      const { translate, rotate, skew, scale, perspective } = transformProxy
      return (
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
      },
      { signal }
    )

    return controller.abort
  }

  return supportAbortSignalOption(mount)
}

export function cssLayer<Animating extends CSSProps>(
  element: HTMLElement,
  defaultInterp: { cubicBezier: CubicBezier; duration: number } = {
    cubicBezier: Linear,
    duration: 0.25,
  }
): Layer<Animating> & {
  changeInterp: (
    property: keyof Animating,
    duration: Seconds,
    cubicBezier: CubicBezier
  ) => void
} {
  let mounted: Animation<Animating> | undefined = undefined
  let activeTransitions: {
    [property: string]: { duration: Seconds; cubicBezier: CubicBezier }
  } = {}

  const transitionsToString = (transitions: typeof activeTransitions) => {
    let out = []
    for (const property in transitions) {
      const { duration, cubicBezier } = transitions[property]
      const cubic = cubicBezierToString(cubicBezier)
      out.push(`${property} ${duration}s ${cubic}`)
    }
    return out.join(", ")
  }
  const mount = (anim: Animation<Animating>) => {
    if (mounted) throw new Error("Only one anim object can be mounted at once")
    let startedAt: number | undefined = undefined
    const ac = new AbortController()
    if (anim.children.backgroundColor) {
      const curr = getInterpingToTree(anim.children.backgroundColor) as Color
      element.style.backgroundColor = colorToString(curr)
      addLocalListener(
        anim.children.backgroundColor,
        "immutableStart",
        () => {
          setTimeout(() => {
            startedAt = performance.now()
            element.style.backgroundColor = colorToString(
              getInterpingToTree(anim.children.backgroundColor!) as Color
            )
          }, 0)
        },
        { signal: ac.signal }
      )

      addLocalListener(
        anim.children.backgroundColor,
        "beforeStart",
        () => {
          if (!startedAt || !anim.children.backgroundColor) return
          console.log("updating animation")
          updateAnimation(
            anim.children.backgroundColor,
            (performance.now() - startedAt) / 1000
          )
        },
        { signal: ac.signal }
      )

      addLocalListener(
        anim.children.backgroundColor,
        "interrupt",
        () => {
          const withoutBg = Object.fromEntries(
            Object.entries(activeTransitions).filter(
              ([k]) => k != "background-color"
            )
          )
          element.style.transition = transitionsToString(withoutBg)
          const intermediateColor = getStateTree(
            anim.children.backgroundColor!
          ) as Color
          console.log("intermediate color", intermediateColor)
          element.style.backgroundColor = colorToString(intermediateColor)
          setTimeout(() => {
            element.style.transition = transitionsToString(activeTransitions)
          }, 0)
        },
        { signal: ac.signal }
      )
    }
    mounted = anim
    for (const k in anim.children) {
      changeInterp(
        k as keyof Animating,
        defaultInterp.duration,
        defaultInterp.cubicBezier
      )
    }
    return () => {
      ac.abort()
      mounted = undefined
    }
  }
  const changeInterp = (
    property: keyof Animating,
    duration: number,
    cubicBezier: CubicBezier
  ) => {
    if (!mounted) throw new Error("no animation mounted yet")
    activeTransitions[kebabize(property.toString())] = { duration, cubicBezier }
    console.log(mounted.children)
    const nestedAnim: UnknownAnimation = mounted.children[
      property
    ] as UnknownAnimation
    changeInterpFunction(nestedAnim, cubicBezierToInterp(duration, cubicBezier))
    element.style.transition = transitionsToString(activeTransitions)
  }

  return {
    mount,
    changeInterp,
  }
}
