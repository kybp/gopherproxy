const monospaced = {
  fontFamily: ['Roboto Mono', 'monospace'],
  whiteSpace: 'pre',
}

const proportional = {
  fontFamily: ['Roboto', 'sans-serif'],
}

export default (fontStyle: string): any => {
  switch (fontStyle) {
  case 'monospaced':
    return monospaced
  case 'proportional':
    return proportional
  }
}
