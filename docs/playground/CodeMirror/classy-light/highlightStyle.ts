import { tags as t } from '@lezer/highlight'
import { HighlightStyle } from '@codemirror/language'
import cd from './colors'
import { Direction } from '@codemirror/view'
const highlightStyleArray = [
  { tag: t.variableName, color: cd.violet300 },
  {
    tag: t.function(t.variableName),
    color: cd.sea300
  },
  { tag: [t.operator], color: cd.gold900 },
  { tag: t.comment, color: cd.sea500 },
  { tag: t.string, color: cd.gold300 },
  { tag: t.number, color: cd.gold500 },
  { tag: t.bool, color: cd.gold100 },
  { tag: t.regexp, color: cd.gold500 },
  { tag: t.bracket, color: cd.gray200 },
  { tag: t.name, color: cd.violet500 },
  { tag: t.tagName, color: cd.sea300 },
  { tag: t.propertyName, color: cd.violet500 },
  { tag: t.className, color: cd.gold300 },
  { tag: t.labelName, color: cd.gold100 },
  { tag: t.keyword, color: cd.gold500 },
  { tag: t.constant(t.name), color: cd.violet500 },
  { tag: t.definition(t.name), color: cd.violet500 }
]
export default HighlightStyle.define(highlightStyleArray)
