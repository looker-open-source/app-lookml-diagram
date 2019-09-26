import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"

export const SQLSnippet = ({ src }: { src: string }) => {
  return (
    <SyntaxHighlighter language="sql" style={prism}>
      {src}
    </SyntaxHighlighter>
  )
}
