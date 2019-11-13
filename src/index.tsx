import React from "react"
import * as ReactDOM from "react-dom"
import { Extension } from "./components/Extension"
import { injectGlobal } from "styled-components"
import { ExtensionProvider } from "@looker/extension-sdk-react"

// Replace this with a Lens bootstrap when that is available
const link = document.createElement("link")
link.href =
  "https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap"
link.rel = "stylesheet"
document.head.appendChild(link)
injectGlobal`
    body,
    button,
    input,
    textarea,
    select {
      font-family: 'Open Sans', sans-serif;
    }
    body {
      padding: 0;
      margin: 0;
    }
`

window.addEventListener("DOMContentLoaded", async event => {
  const root = document.createElement("div")
  document.body.appendChild(root)
  ReactDOM.render(
    <ExtensionProvider>
      <Extension />
    </ExtensionProvider>,
    root
  )
})
