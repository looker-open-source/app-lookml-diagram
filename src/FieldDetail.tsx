import * as React from "react"
import { ILookmlModelExploreField, ILookmlModel } from "@looker/sdk"
import { Button, Link, Box, Text, styled, Flex, FlexItem } from "looker-lens"
import { FieldName, Enumerations } from "./ExploreFieldGrid"
import humanize from "humanize-string"
import { SQLSnippet } from "./SQLSnippet"
import { QueryChart } from "./QueryChart"
import { canGetTopValues } from "./queries"

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

export const MetadataItem = ({
  label,
  children,
  compact
}: {
  label: string
  children: React.ReactNode
  compact?: boolean
}) => {
  if (compact) {
    return (
      <Flex my="large">
        <FlexItem>
          <Text fontSize="small" fontWeight="bold" flex="0 0 auto">
            {label}
          </Text>
        </FlexItem>
        <FlexItem textAlign="right" flex="1 1 auto">
          <Text fontSize="small">{children}</Text>
        </FlexItem>
      </Flex>
    )
  } else {
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
}

export const FieldDetail = ({
  field,
  explore,
  model
}: {
  field: ILookmlModelExploreField
  explore: ILookmlModelExploreField
  model: ILookmlModel
}) => {
  return (
    <DetailPane>
      <MetadataList>
        <MetadataItem label="Category" compact>
          {humanize(field.category)}
        </MetadataItem>
        <MetadataItem label="Type" compact>
          {humanize(field.type)}
        </MetadataItem>
        <MetadataItem label="LookML Name">
          <FieldName>{field.name}</FieldName>
        </MetadataItem>
        {field.description && (
          <MetadataItem label="Description">{field.description}</MetadataItem>
        )}
        {field.enumerations && (
          <MetadataItem label="Possible Values">
            <Enumerations field={field} />
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
        {canGetTopValues({
          model,
          explore,
          field
        }) && (
          <QueryChart
            type={{
              type: "Values",
              model,
              explore,
              field
            }}
          />
        )}
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
