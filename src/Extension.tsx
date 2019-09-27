import * as React from "react"
import { ThemeProvider, theme } from "looker-lens"
import { DataDictionary } from "./DataDictionary"
import { SettingsContextProvider } from "./Settings"

export default () => (
  <ThemeProvider theme={theme}>
    <SettingsContextProvider>
      <DataDictionary />
    </SettingsContextProvider>
  </ThemeProvider>
)
