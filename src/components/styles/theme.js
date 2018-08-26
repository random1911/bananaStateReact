const theme = {
  colors: {
    red: opacity => `rgba(211, 47, 47, ${opacity || 1})`,
    blue: opacity => `rgba(21, 101, 192, ${opacity || 1})`,
    green: opacity => `rgba(6, 125, 50, ${opacity || 1})`,
    borderColor: () => '#464646',
  },
  mixins: {
    visuallyHidden: () => `
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
    `,
    resetButtonStyles: () => `
      padding: 0;
      background: transparent;
      font-family: inherit;
      font-size: inherit;
      border: none;
      color: inherit;
    `,
  },
  fonts: {
    family: '\'Segoe Ui\', Helvetica, Roboto, sans-serif',
    size: '16px',
  },
  breakpoints: {
    tabletMin: '600px',
    tabletMedium: '768px',
    desktopMin: '960px',
    desktopLarger: '1340px',
  },
  sizes: {
    tile: '100px'
  },
  transition: '.25s ease-in-out'
}

export default theme
