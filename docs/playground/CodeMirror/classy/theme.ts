import { EditorView } from 'codemirror'
import colors from './colors'
const selection = colors.violet900 + '60'
let theme = EditorView.theme(
  {
    '&': {
      color: colors.gray900,
      backgroundColor: colors.violet100
    },
    '&.cm-editor': {
      minHeight: 'min(15rem, calc(100vh - 10rem))'
    },
    '&.cm-editor.cm-focused': {
      outline: 'none'
    },
    '.cm-content': {
      caretColor: colors.gray900
    },
    '.cm-scroller': {
      fontFamily: '"Fira Code", monospace'
    },
    '.emmet-preview': {
      backgroundColor: colors.violet100,
      border: colors.violet100 + ' solid 1px',
      borderRadius: '0.5rem'
    },
    '.emmet-preview::after': {
      content: "'(press tab to expand)'",
      padding: '0.5rem'
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: colors.gray900
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection
      },
    '.cm-activeLine': {
      backgroundColor: 'inherit'
    },
    '.cm-selectionMatch': {
      backgroundColor: colors.violet700
    },
    '.cm-gutter': {
      backgroundColor: colors.violet100,
      color: colors.gray900,
      border: 'none'
    },
    '& .cm-gutterElement': {
      color: colors.violet900 + '80',
      backgroundColor: 'inherit'
    },
    '& .cm-gutterElement span[title="Fold Line"]': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '.cm-gutterElement.cm-activeLineGutter': {
      color: colors.gray900,
      backgroundColor: 'inherit'
    },
    // '.cm-line': {
    //   color: colors.violet100
    // },
    // '.cm-line > *': {
    //   background: 'currentColor',
    //   fontSize: '.75em',
    //   margin: '0em 0em'
    // },
  },
  { dark: true }
)

export default theme
