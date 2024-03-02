export type DictTree<T> = {
  [key: string]: T | DictTree<T>
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type OptionalDictTree<T> = RecursivePartial<DictTree<T>>

export type keyOf<T> = (keyof T)[]

export type FlattenedDictTree<T> = {
  [key: string]: T
}

export type OptionalFlattenedDictTree<T> = RecursivePartial<
  FlattenedDictTree<T>
>

export function flattenDictTree<T>(
  tree: OptionalDictTree<T>
): FlattenedDictTree<T> {
  const out: FlattenedDictTree<T> = {}
  for (const { key, value } of dictTreeToGenerator(tree)) {
    out[key.join(".")] = value
  }
  return out
}

export function unflattenDictTree<T>(
  tree: FlattenedDictTree<T>
): OptionalDictTree<T> {
  const out: OptionalDictTree<T> = {}
  for (const key in tree) {
    dictTreeSet(out, key.split("."), tree[key])
  }
  return out
}

export function flatDictTreeGet<T>(
  tree: FlattenedDictTree<T>,
  ...key: string[]
): T | undefined {
  return tree[key.join(".")]
}

export function flatDictTreeSet<T>(
  tree: FlattenedDictTree<T>,
  key: string[],
  value: T
) {
  return (tree[key.join(".")] = value)
}

export function dictTreeGet<T>(
  tree: OptionalDictTree<T>,
  ...key: string[]
): OptionalDictTree<T> | T | undefined {
  let val: OptionalDictTree<T> | undefined = tree
  for (const [index, k] of key.entries()) {
    // check if key exists
    if (val === undefined) {
      return undefined
    }
    if (!(k in val)) {
      return undefined
    }
    const newVal = val[k as keyof typeof val]
    if (!newVal) {
      return undefined
    }
    if (typeof newVal !== "object") {
      if (index !== key.length - 1) throw new Error("Invalid key")
      return newVal as T
    }
    val = newVal as OptionalDictTree<T>
  }
  return val as T
}
export function dictTreeSet<T>(
  tree: OptionalDictTree<T>,
  key: string[],
  value: T
) {
  let val = tree
  for (const k of key.slice(0, key.length - 1)) {
    // check if key exists
    if (!(k in val)) {
      val[k as keyof typeof val] = {}
    }
    const currVal = val[k as keyof typeof val]
    if (typeof currVal !== "object") {
      throw new Error(
        `Too many keys, reached a leaf at key ${k} out of ${key.length} keys`
      )
    }
    val = currVal as OptionalDictTree<T>
  }
  val[key[key.length - 1] as keyof typeof val] = value
}

export function* dictTreeToGenerator<T>(
  tree: OptionalDictTree<T>,
  prefix: string[] = []
): Iterable<{ key: string[]; value: T }> {
  for (const key in tree) {
    const value = tree[key]
    if (typeof value === "object") {
      yield* dictTreeToGenerator(value, prefix.concat(key))
    } else {
      yield { key: prefix.concat(key), value: value as T }
    }
  }
}

export function* flatDictTreeToGenerator<T>(
  tree: FlattenedDictTree<T>
): Iterable<{ key: string[]; value: T }> {
  for (const key in tree) {
    yield { key: key.split("."), value: tree[key] }
  }
}

export function recursiveCopy<Tree extends OptionalDictTree<unknown>>(
  obj: Tree
) {
  const cpy: Tree = {} as Tree
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      cpy[key] = recursiveCopy(
        obj[key] as OptionalDictTree<unknown>
      ) as Tree[Extract<keyof Tree, string>]
    } else {
      cpy[key] = obj[key]
    }
  }
  return cpy as Tree
}

export function flatDictTreeCopy<T>(obj: FlattenedDictTree<T>) {
  const cpy: FlattenedDictTree<T> = {}
  for (const key in obj) {
    cpy[key] = obj[key]
  }
  return cpy
}

export function mergeDictTrees<
  T2 extends OptionalDictTree<unknown>,
  T1 extends OptionalDictTree<unknown>,
>(oldPartial: T1, newPartial: T2): T1 & T2 {
  type Tree = T1 & T2
  const cpy: Tree = {} as Tree
  for (const { key, value: oldVal } of dictTreeToGenerator(oldPartial)) {
    dictTreeSet(cpy, key, oldVal)
  }
  for (const { key, value: newVal } of dictTreeToGenerator(newPartial)) {
    dictTreeSet(cpy, key, newVal)
  }
  return cpy
}

export function mergeFlatTrees<
  T1 extends OptionalFlattenedDictTree<unknown>,
  T2 extends OptionalFlattenedDictTree<unknown>,
>(oldPartial: T1, newPartial: T2): T1 & T2 {
  const cpy = flatDictTreeCopy(oldPartial)
  for (const key in newPartial) {
    cpy[key] = newPartial[key]
  }
  return cpy as T1 & T2
}

export function* dictTreesToGenerator<List extends OptionalDictTree<unknown>[]>(
  ...args: List
) {
  // iterate first arg
  const first = args[0]
  for (const key of dictTreeToGenerator(first)) {
    yield args.map(animatable => {
      return {
        key: key.key as string[],
        // we know 'value' is a number because of generateAnimatable
        // and because all args are of type Animating
        value: dictTreeGet(animatable, ...key.key) as unknown as number,
      }
    })
  }
}
