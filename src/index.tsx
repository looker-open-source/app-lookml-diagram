import * as React from "react"
import * as ReactDOM from "react-dom"
import Extension from "./Extension"

document.head.innerHTML += `
  <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
  <style>
    body,
    button,
    input,
    textarea,
    select {
      font-family: 'Open Sans', sans-serif;
    }
  </style>
`

window.addEventListener("DOMContentLoaded", event => {
  ReactDOM.render(<Extension />, document.getElementById("app-container"))
})
