import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"

export const SQLSnippet = ({ src }: { src: string }) => {
  return (
    <code>
      {src}
      {/* <SyntaxHighlighter language="sql" style={dark}>
        {src}
      </SyntaxHighlighter> */}
    </code>
  )
}
