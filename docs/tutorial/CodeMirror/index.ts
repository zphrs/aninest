import type { Extension } from '@codemirror/state'
import { syntaxHighlighting } from '@codemirror/language'

import fcTheme from './forest-cottage/theme'
import fcHighlightStyle from './forest-cottage/highlightStyle'

export const forestCottageTheme: Extension = [
  fcTheme,
  syntaxHighlighting(fcHighlightStyle)
]

import cTheme from './classy/theme'
import cHighlightStyle from './classy/highlightStyle'

export const classyTheme: Extension = [
  cTheme,
  syntaxHighlighting(cHighlightStyle)
]
