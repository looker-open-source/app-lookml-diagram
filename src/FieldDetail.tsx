import * as React from "react"
import {
  ILookmlModelExploreField,
  ILookmlModel,
  ILookmlModelExplore
} from "@looker/sdk"
import {
  Button,
  Link,
  Box,
  Text,
  styled,
  Flex,
  FlexItem,
  Divider
} from "looker-lens"
import { FieldName, Enumerations } from "./ExploreFieldGrid"
import humanize from "humanize-string"
import { SQLSnippet } from "./SQLSnippet"
import { QueryChart } from "./QueryChart"
import { canGetTopValues, canGetDistribution } from "./queries"
import { exploreFieldURL } from "./urls"

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
  aux,
  label,
  children,
  compact
}: {
  label: string
  aux?: string
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
          <Flex my="large">
            <FlexItem>
              <Text fontSize="small" fontWeight="bold" flex="0 0 auto">
                {label}
              </Text>
            </FlexItem>
            {aux && (
              <FlexItem textAlign="right" flex="1 1 auto">
                <Text fontSize="small" variant="subdued">
                  {aux}
                </Text>
              </FlexItem>
            )}
          </Flex>
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
  explore: ILookmlModelExplore
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
        {canGetDistribution({
          model,
          explore,
          field
        }) && (
          <QueryChart
            type={{
              type: "Distribution",
              model,
              explore,
              field
            }}
          />
        )}
      </MetadataList>
      <Divider my="medium" appearance="light" />
      <Flex>
        <FlexItem flex="0 0 auto">
          {field.lookml_link && (
            <Link href={field.lookml_link} target="_blank">
              <Button
                iconBefore="LogoRings"
                variant="transparent"
                size="xsmall"
              >
                Go to LookML
              </Button>
            </Link>
          )}
        </FlexItem>
        <FlexItem flex="1 1 auto" textAlign="right">
          <Link href={exploreFieldURL(explore, field)} target="_blank">
            <Button iconBefore="Explore" variant="transparent" size="xsmall">
              Explore with Field
            </Button>
          </Link>
        </FlexItem>
      </Flex>
    </DetailPane>
  )
}
