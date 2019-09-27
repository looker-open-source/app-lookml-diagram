import * as React from "react"
import { ILookmlModelExploreField } from "@looker/sdk"
import { Button, Link, Box, Text, styled } from "looker-lens"
import { FieldName } from "./ExploreFieldGrid"
import humanize from "humanize-string"
import { SQLSnippet } from "./SQLSnippet"

const DetailPane = styled.div``
const MetadataList = styled.div``
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

const MetadataItem = ({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) => {
  return (
    <Box my="large">
      <Box>
        <Text fontSize="small" fontWeight="bold">
          {label}
        </Text>
      </Box>
      <Box>
        <Text fontSize="small">{children}</Text>
      </Box>
    </Box>
  )
}

export const FieldDetail = ({ field }: { field: ILookmlModelExploreField }) => {
  return (
    <DetailPane>
      <MetadataList>
        <MetadataItem label="LookML Name">
          <FieldName>{field.name}</FieldName>
        </MetadataItem>
        <MetadataItem label="Category">{humanize(field.category)}</MetadataItem>
        {field.description && (
          <MetadataItem label="Description">
            {humanize(field.description)}
          </MetadataItem>
        )}
        {field.tags && field.tags.length > 0 ? (
          <MetadataItem label="Tags">
            <Tags tags={field.tags} />
          </MetadataItem>
        ) : (
          undefined
        )}
        <MetadataItem label="SQL">
          <SQLSnippet src={field.sql} />
        </MetadataItem>
      </MetadataList>
      <Box>
        {field.lookml_link && (
          <Link href={field.lookml_link} target="_blank">
            <Button iconBefore="LogoRings" variant="outline" size="xsmall">
              Go to LookML
            </Button>
          </Link>
        )}
      </Box>
    </DetailPane>
  )
}
