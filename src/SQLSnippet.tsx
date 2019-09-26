import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vs as theme } from "react-syntax-highlighter/dist/esm/styles/prism"

export const SQLSnippet = ({ src }: { src: string }) => {
  return (
    <SyntaxHighlighter language="sql" style={{ ...theme, hljs: {} }}>
      {src}
    </SyntaxHighlighter>
  )
}
