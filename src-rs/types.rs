use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = r#"
export type Animatable = { [key: string]: number }

export type Interp = (t: number) => number

export type Bounds<T> = {
  lower: Partial<T>
  upper: Partial<T>
}

/**
 * @returns true if listener should be removed
 */
export type Listener<T> = (newValue: T) => boolean | void

type ListenerSet<T> = Set<Listener<T>>

export type Listeners<Events extends string, T> = {
  [key in `${Events}Listeners`]: ListenerSet<T>
}

export type PartialBounds<T> = Partial<Bounds<T>>

export type AnimatableEvents = "start" | "end" | "bounce" | "interrupt"

export type RecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends RecursiveAnimatable<unknown>
    ? RecursiveAnimatable<T[P]>
    : number
}

type LocalRecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends number ? number : undefined
} & Animatable

type ChildrenOfRecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? T[P] : undefined
}

type PartialRecursiveAnimatable<T> = {
  [P in keyof T]?: T[P] extends number
    ? number
    : PartialRecursiveAnimatable<T[P]>
}

type Mask<T> = {
  [P in keyof T]: T[P] | boolean
}

export type AnimationInfoWithoutChildren<
  Animating extends RecursiveAnimatable<unknown>
> = {
  time: number
  timingFunction: Interp
  from: LocalRecursiveAnimatable<Animating>
  to: Partial<LocalRecursiveAnimatable<Animating>> | null
  bounds: Bounds<LocalRecursiveAnimatable<Animating>>
} & Listeners<AnimatableEvents, Partial<LocalRecursiveAnimatable<Animating>>> &
  Listeners<"recursiveStart", undefined>

export type AnimationInfo<Animating extends RecursiveAnimatable<unknown>> =
  AnimationInfoWithoutChildren<Animating> & {
    children: {
      [P in keyof Animating]: Animating[P] extends number
        ? undefined
        : AnimationInfo<RecursiveAnimatable<Animating[P]>>
    }
  }
"#;
