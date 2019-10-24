import React from "react"
import { styled } from "looker-lens"

const Tag = styled.span`
  background: #dee1e5;
  padding: 0 0.75em;
  border-radius: 100px;
  margin-right: 0.5em;
`

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <>
      {tags.map(t => (
        <Tag key={t}>{t}</Tag>
      ))}
    </>
  )
}
