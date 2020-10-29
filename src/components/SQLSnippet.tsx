/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React from "react"
import styled from "styled-components"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { SQL_SNIPPET_LENGTH } from "../utils/constants"

const theme = require("react-syntax-highlighter/dist/cjs/styles/prism/vs")
  .default
const sql = require("react-syntax-highlighter/dist/cjs/languages/prism/sql")
  .default

SyntaxHighlighter.registerLanguage("sql", sql)

const CodeTag = styled.code`
  white-space: pre-wrap !important;
  word-break: break-word !important;
`

export const SQLSnippet = ({ src, isRow }: { src: string; isRow: boolean }) => {
  let truncatedSrc = src
  if (isRow && src && src.length > SQL_SNIPPET_LENGTH) {
    truncatedSrc = src.substring(0, SQL_SNIPPET_LENGTH) + "..."
  }
  return (
    <SyntaxHighlighter
      language="sql"
      CodeTag={CodeTag}
      style={{
        ...theme,
        hljs: { margin: "0" }
      }}
    >
      {truncatedSrc}
    </SyntaxHighlighter>
  )
}
