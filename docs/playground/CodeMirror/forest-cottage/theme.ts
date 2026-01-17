import { EditorView } from 'codemirror'
import colors from './colors'
const selection = colors.sky + '60'
let theme = EditorView.theme(
  {
    '&': {
      color: colors.white,
      backgroundColor: colors.plum
    },
    '&.cm-editor': {
      minHeight: 'min(15rem, calc(100vh - 10rem))'
    },
    '&.cm-editor.cm-focused': {
      outline: 'none',
    },
    '.cm-content': {
      caretColor: colors.white
    },
    '.cm-scroller': {
      fontFamily: '"Fira Code", monospace',
    },
    ".emmet-preview": {
      backgroundColor: colors.plum,
      border: colors.violet + ' solid 1px',
      borderRadius: '0.5rem',
    },
    ".emmet-preview::after": {
      content: "'(press tab to expand)'",
      padding: '0.5rem',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: colors.white
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
    {
      backgroundColor: selection
    },
    '.cm-activeLine': {
      backgroundColor: 'inherit'
    },
    '.cm-selectionMatch': {
      backgroundColor: colors.sky + '40'
    },
    '.cm-gutter': {
      backgroundColor: colors.plum,
      color: colors.white,
      border: 'none'
    },
    '& .cm-gutterElement': {
      color: colors.white + '80',
      backgroundColor: 'inherit',
    },
    '& .cm-gutterElement span[title="Fold Line"]': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '.cm-gutterElement.cm-activeLineGutter': {
      color: colors.white,
      backgroundColor: 'inherit'
    }
  },
  { dark: true }
)

export default theme
