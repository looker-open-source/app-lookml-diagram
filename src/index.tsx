import * as React from "react"
import * as ReactDOM from "react-dom"
import Extension from "./Extension"
import { injectGlobal } from "styled-components"
import {
  LookerExtensionSDK,
  connectExtensionHost,
  ExtensionHostApi
} from "bryns-extension-api"
import { APIMethods as LookerSDK } from "@looker/sdk/dist/rtl/apiMethods"

var link = document.createElement("link")
link.href = "https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
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

export interface ExtensionContextData {
  extensionSDK: ExtensionHostApi
  coreSDK: LookerSDK
}

export const ExtensionContext = React.createContext<ExtensionContextData>(
  undefined
)

window.addEventListener("DOMContentLoaded", async event => {
  const extensionSDK = await connectExtensionHost()
  const coreSDK = LookerExtensionSDK.createClient(extensionSDK)
  ;(window as any).sdk = coreSDK
  const context = {
    extensionSDK,
    coreSDK
  }
  var root = document.createElement("div")
  document.body.appendChild(root)
  ReactDOM.render(
    <ExtensionContext.Provider value={context}>
      <Extension />
    </ExtensionContext.Provider>,
    root
  )
})
