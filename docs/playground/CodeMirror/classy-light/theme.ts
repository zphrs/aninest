import { EditorView } from 'codemirror'
import colors from './colors'
const selection = colors.violet900 + '60'
let theme = EditorView.theme(
  {
    '&': {
      color: colors.gray200,
      backgroundColor: colors.gray990
    },
    '&.cm-editor': {
      minHeight: 'min(15rem, calc(100vh - 10rem))'
    },
    '&.cm-editor.cm-focused': {
      outline: 'none'
    },
    '.cm-content': {
      caretColor: colors.gray200
    },
    '.cm-scroller': {
      fontFamily: '"Fira Code", monospace'
    },
    '.emmet-preview': {
      backgroundColor: colors.gray990,
      border: colors.sea500 + ' solid 1px',
      borderRadius: '0.5rem'
    },
    '.emmet-preview::after': {
      content: "'(press tab to expand)'",
      padding: '0.5rem'
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: colors.gray200
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection
      },
    '.cm-activeLine': {
      backgroundColor: 'inherit'
    },
    '.cm-selectionMatch': {
      backgroundColor: colors.sea300
    },
    '.cm-gutter': {
      backgroundColor: colors.gray990,
      color: colors.gray800,
      border: 'none'
    },
    '& .cm-gutterElement': {
      color: colors.gray800,
      backgroundColor: 'inherit'
    },
    '& .cm-gutterElement span[title="Fold Line"]': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '.cm-gutterElement.cm-activeLineGutter': {
      color: colors.sea300,
      backgroundColor: 'inherit'
    }
    // '.cm-line': {
    //   color: colors.violet100
    // },
    // '.cm-line > *': {
    //   background: 'currentColor',
    //   fontSize: '.75em',
    //   margin: '0em 0em'
    // },
  },
  { dark: false }
)

export default theme
