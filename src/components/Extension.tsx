import React from "react"
import { ThemeProvider, theme } from "looker-lens"
import { DataDictionary } from "./DataDictionary"
import { SettingsContextProvider } from "./Settings"

export const Extension: React.FC = () => (
  <ThemeProvider theme={theme}>
    <SettingsContextProvider>
      <DataDictionary />
    </SettingsContextProvider>
  </ThemeProvider>
)
