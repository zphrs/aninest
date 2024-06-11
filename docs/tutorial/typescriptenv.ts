import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualTypeScriptEnvironment,
} from "@typescript/vfs"
import ts from "typescript"

const fsMap = await createDefaultMapFromCDN(
  { target: ts.ScriptTarget.ES2022 },
  "3.7.3",
  true,
  ts
)
const system = createSystem(fsMap)
const compilerOpts = {}
export const env = createVirtualTypeScriptEnvironment(system, [], ts, compilerOpts)
