import React from "react"
import * as ReactDOM from "react-dom"
import Extension from "./components/Extension"
import { injectGlobal } from "styled-components"
import { ExtensionWrapper } from "./extract-to-framework/ExtensionWrapper"

// Replace this with a Lens bootstrap when that is available
var link = document.createElement("link")
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
  var root = document.createElement("div")
  document.body.appendChild(root)
  ReactDOM.render(
    <ExtensionWrapper>
      <Extension />
    </ExtensionWrapper>,
    root
  )
})
