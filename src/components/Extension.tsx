import React from "react"
import { theme, GlobalStyle } from "@looker/components"
import { DataDictionary } from "./DataDictionary"
import { ThemeProvider } from "styled-components"

export const Extension: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <DataDictionary />
  </ThemeProvider>
)
