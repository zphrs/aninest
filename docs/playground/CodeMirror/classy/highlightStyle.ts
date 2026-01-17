import { tags as t } from '@lezer/highlight'
import { HighlightStyle } from '@codemirror/language'
import cd from './colors'
import { Direction } from '@codemirror/view'
const highlightStyleArray = [
  { tag: t.variableName, color: cd.violet900 },
  {
    tag: t.function(t.variableName),
    color: cd.sea900
  },
  { tag: [t.operator], color: cd.gold900 },
  { tag: t.comment, color: cd.sea500 },
  { tag: t.string, color: cd.gold700 },
  { tag: t.number, color: cd.gold500 },
  { tag: t.bool, color: cd.gold500 },
  { tag: t.regexp, color: cd.gold900 },
  { tag: t.bracket, color: cd.gray900 },
  { tag: t.name, color: cd.violet700 },
  { tag: t.tagName, color: cd.sea700 },
  { tag: t.propertyName, color: cd.violet700 },
  { tag: t.className, color: cd.gold700 },
  { tag: t.labelName, color: cd.gold500 },
  { tag: t.keyword, color: cd.gold900 },
  { tag: t.constant(t.name), color: cd.violet700 },
  { tag: t.definition(t.name), color: cd.violet700 }
]
export default HighlightStyle.define(highlightStyleArray)
