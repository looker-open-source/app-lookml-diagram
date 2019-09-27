import * as React from "react"
import styled from "styled-components"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import theme from "react-syntax-highlighter/dist/esm/styles/prism/vs"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql"

SyntaxHighlighter.registerLanguage("sql", sql)

const CodeTag = styled.code`
  white-space: pre-wrap !important;
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
