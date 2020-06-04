import Typography from "typography"
import stAnnesTheme from "typography-theme-st-annes"
stAnnesTheme.baseFontSize = "20px"
stAnnesTheme.headerColor = "#444"
stAnnesTheme.bodyColor = "#222"

const typography = new Typography(stAnnesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
