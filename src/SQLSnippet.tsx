import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vs as theme } from "react-syntax-highlighter/dist/esm/styles/prism"
import styled from "styled-components"

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
