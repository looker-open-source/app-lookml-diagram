import * as React from "react"
import { ThemeProvider, theme } from "looker-lens"
import { DataDictionary } from "./DataDictionary"

export default () => (
  <ThemeProvider theme={theme}>
    <DataDictionary></DataDictionary>
  </ThemeProvider>
)
