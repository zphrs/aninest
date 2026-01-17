import { tags as t } from '@lezer/highlight'
import { HighlightStyle } from '@codemirror/language'
import cd from './colors'
import { Direction } from '@codemirror/view'
const highlightStyleArray = [
  { tag: t.variableName, color: cd.water },
  {
    tag: [
      t.function(t.variableName),
      t.function(t.propertyName)
    ],
    color: cd.lime
  },
  { tag: [t.operator], color: cd.sun },
  { tag: t.comment, color: cd.forest },
  { tag: t.string, color: cd.gold },
  { tag: t.number, color: cd.clay },
  { tag: t.bool, color: cd.sky },
  { tag: t.regexp, color: cd.grapefruit },
  { tag: t.bracket, color: cd.white },
  { tag: t.name, color: cd.violet },
  { tag: t.tagName, color: cd.ivy },
  { tag: t.propertyName, color: cd.water },
  { tag: t.className, color: cd.sun },
  { tag: t.labelName, color: cd.sun },
  { tag: t.keyword, color: cd.violet },
  { tag: t.constant(t.name), color: cd.spring },
  { tag: t.definition(t.name), color: cd.spring }
]
export default HighlightStyle.define(highlightStyleArray)
