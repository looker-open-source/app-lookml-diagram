import React from "react"
import styled from "styled-components"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

const theme = require("react-syntax-highlighter/dist/esm/styles/prism/vs")
  .default
const sql = require("react-syntax-highlighter/dist/esm/languages/prism/sql")
  .default

SyntaxHighlighter.registerLanguage("sql", sql)

const CodeTag = styled.code`
  white-space: pre-wrap !important;
  word-break: break-word !important;
`

export const SQLSnippet = ({ src }: { src: string }) => {
  return (
    <SyntaxHighlighter
      language="sql"
      CodeTag={CodeTag}
      style={{
        ...theme,
        hljs: { margin: "0" }
      }}
    >
      {src}
    </SyntaxHighlighter>
  )
}
