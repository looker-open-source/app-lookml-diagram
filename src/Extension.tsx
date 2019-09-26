import * as React from "react"
import { ThemeProvider, theme } from "looker-lens"
import { DataDictionary } from "./DataDictionary"

import { Card, CardContent, Heading, Text } from "looker-lens"

export default () => (
  <ThemeProvider theme={theme}>
    <Card raised>
      <CardContent>
        <Heading fontWeight="semiBold" textTransform="caps">
          Welcome to Lens
        </Heading>
        <Text>Looker's component library</Text>
      </CardContent>
    </Card>

    {/* <DataDictionary></DataDictionary> */}
  </ThemeProvider>
)
