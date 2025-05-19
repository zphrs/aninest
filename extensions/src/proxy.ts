/**
 * Makes it easier to interact with the animation state by providing a proxy object
 * which mirrors the state of the animation.
 * Also allows you to set the state of the animation by setting the properties of the proxy object.
 * @module Proxy
 */

import {
  getInterpingToTree,
  getLocalInterpingTo,
  getLocalInterpingToValue,
  getLocalState,
  getLocalValue,
  getStateTree,
  modifyTo,
  type ListenerSuppressor,
  addLocalListener,
  IMMUTABLE_START,
  UPDATE,
  Animation,
  UnknownRecursiveAnimatable,
  LocalAnimatable,
  PartialRecursiveAnimatable,
  unsubscribe,
} from "aninest"

export function getInterpingToProxy<
  Animating extends UnknownRecursiveAnimatable
>(anim: Animation<Animating>, suppressListeners: boolean = false): Animating {
  const localProxy = getLocalInterpingToProxy(anim)
  const initialTo = getInterpingToTree(anim)
  const childrenProxies = {} as Record<string, Animating[keyof Animating]>
  for (const child in anim.children) {
    const proxy = getInterpingToProxy(anim.children[child]!)
    childrenProxies[child] = proxy as Animating[keyof Animating]
  }
  const proxy = new Proxy(initialTo, {
    get(_obj, prop, _receiver) {
      const key = prop.toString()
      const local = localProxy[key]
      if (local !== undefined) return local
      return childrenProxies[key]
    },
    set(_target, p, newValue, _receiver) {
      if (typeof newValue === "number" || typeof newValue === "object") {
        modifyTo(
          anim,
          {
            [p.toString()]: newValue,
          } as PartialRecursiveAnimatable<Animating>,
          suppressListeners
        )
        return true
      }
      return false
    },
  })

  return proxy
}

/**
 * Returns a proxy object that allows you to interact with the local state of the animation.
@example
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
const proxy = getLocalInterpingToProxy(anim)
proxy.a // 0
proxy.b // 0
proxy.a = 1
proxy.a // 1
proxy.b // 0
 * @param anim 
 * @param suppressListeners whether to suppress the 
 * @returns 
 * @internal
 * @example
 */
export function getLocalInterpingToProxy<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>,
  suppressListeners?: ListenerSuppressor
): LocalAnimatable<Animating> {
  const initialTo = getLocalInterpingTo(anim)
  const proxy = new Proxy(initialTo, {
    get(_obj, prop, _receiver) {
      return getLocalInterpingToValue(anim, prop.toString() as keyof Animating)
    },
    set(_target, prop, newValue, _receiver) {
      if (typeof newValue !== "number") {
        return false
      }
      modifyTo(
        anim,
        {
          [prop.toString()]: newValue,
        } as PartialRecursiveAnimatable<Animating>,
        suppressListeners
      )
      return true
    },
  })

  return proxy
}

/**
 * Returns a proxy object that allows you to interact with the animation state
 * as though it were a plain object.
 * @example
const anim = createAnimation({a: {x: 0, y: 0}, b: 0}, getLinearInterp(1))
const { proxy } = getStateTreeProxy(anim)
proxy.a.x // 0
proxy.a.y // 0
proxy.b // 0
proxy.a.x = 1
proxy.a.x // 0 - the value reflects the current state of the animation so
          // it will not change until the animation is updated
updateAnimation(anim, 0.5)
proxy.a.x // 0.5
updateAnimation(anim, 0.5)
proxy.a.x // 1
 * @example
const anim = createAnimation({a: {x: 0, y: 0}}, getLinearInterp(1))
const { proxy } = getStateTreeProxy(anim)
proxy.a.x // 0
proxy.a.y // 0
proxy.a = {x: 1, y: 1}
updateAnimation(anim, 0.5)
proxy.a // {x: 0.5, y: 0.5}
updateAnimation(anim, 0.5)
proxy.a // {x: 1, y: 1}
 * @description Note that the root object of the animation's state cannot
 * be set directly, but the children can be set.
 * @param anim
 * @returns A proxy object that allows you to interact with the animation state
 * along with an unsubscribe function that remove the proxy from the animation.
 */
export function getStateTreeProxy<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>
): { proxy: Animating; unsubscribe: unsubscribe } {
  const unsubscribers: unsubscribe[] = []
  const { proxy: localProxy, unsubscribe: localUnsub } =
    getLocalStateProxy(anim)
  unsubscribers.push(localUnsub)
  const childrenProxies = {} as Record<string, Animating[keyof Animating]>
  for (const child in anim.children) {
    const { proxy: proxy, unsubscribe } = getStateTreeProxy(
      anim.children[child]!
    )
    childrenProxies[child] = proxy as Animating[keyof Animating]
    unsubscribers.push(unsubscribe)
  }
  const inititalState = getStateTree(anim)
  const proxy = new Proxy(inititalState, {
    get(_obj, prop, _receiver) {
      if (prop in childrenProxies) {
        return Reflect.get(childrenProxies, prop)
      }
      return Reflect.get(localProxy, prop)
    },
    set(_target, p, newValue, _receiver) {
      if (typeof newValue === "number" || typeof newValue === "object") {
        modifyTo(anim, {
          [p.toString()]: newValue,
        } as PartialRecursiveAnimatable<Animating>)
        return true
      }
      return false
    },
  })
  return {
    proxy,
    unsubscribe: () => unsubscribers.forEach(unsub => unsub()),
  }
}
/**
 * Returns a proxy object that allows you to interact with the local state of the animation.
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
const _removeLoop = mountExtension(anim, UpdateExtension)
const proxy = getLocalProxyAnimatable(anim)
proxy.a // 0
proxy.b // 0
proxy.a = 1
setTimeout(() => {
  proxy.a // ~0.5
}, 500)
 * @param anim 
 * @returns 
 * @internal
 * @example
 */
export function getLocalStateProxy<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>
): {
  proxy: LocalAnimatable<Animating>
  unsubscribe: unsubscribe
} {
  const currentState = getLocalState(anim)
  type StampedValue = { value: LocalAnimatable<Animating>[keyof Animating]; counter: number }
  const currentMap = new Map<keyof Animating, StampedValue>()

  let counter = 0
  const unsubscribers: unsubscribe[] = []
  const unsubStart = addLocalListener(anim, IMMUTABLE_START, to => {
    counter = 0
    const localKeys = Object.getOwnPropertySymbols(currentState)
    for (const key of localKeys) {
      const keyStr = key.toString() as keyof Animating
      if (to[keyStr] !== undefined) {
        currentMap.set(keyStr, { value: getLocalValue(anim, keyStr), counter })
      } else {
        // TODO: potentially inneficient,
        // try using an invalidate boolean field on StampedValue
        // rather than deleting from this map
        currentMap.delete(keyStr)
      }
    }
  })
  unsubscribers.push(unsubStart)

  const unsubUpdate = addLocalListener(anim, UPDATE, () => {
    counter++
  })

  unsubscribers.push(unsubUpdate)

  const proxy = new Proxy(currentState, {
    get(_obj, prop, _receiver) {
      const key = prop.toString() as keyof Animating
      const stamp = currentMap.get(key)
      if (stamp && stamp.counter === counter) {
        return stamp.value
      }
      const value = getLocalValue(anim, prop.toString() as keyof Animating)
      currentMap.set(key, { value, counter })
      return value
    },
    set(_target, p, newValue, _receiver) {
      if (typeof newValue !== "number") {
        return false
      }
      modifyTo(anim, {
        [p.toString()]: newValue,
      } as PartialRecursiveAnimatable<Animating>)
      return true
    },
  })
  return {
    proxy,
    unsubscribe: () => unsubscribers.forEach(unsub => unsub()),
  }
}
