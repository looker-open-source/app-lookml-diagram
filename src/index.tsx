import React from "react"
import * as ReactDOM from "react-dom"
import { Extension } from "./components/Extension"
import { ExtensionProvider } from "@looker/extension-sdk-react"

window.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div")
  document.body.appendChild(root)
  ReactDOM.render(
    <ExtensionProvider>
      <Extension />
    </ExtensionProvider>,
    root
  )
})
