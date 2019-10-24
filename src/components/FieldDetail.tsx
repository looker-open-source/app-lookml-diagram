import React from "react"
import {
  ILookmlModelExploreField,
  ILookmlModel,
  ILookmlModelExplore
} from "@looker/sdk/dist/sdk/models"
import { Button, styled, Flex, FlexItem, Divider } from "looker-lens"
import { FieldName, Enumerations } from "./ExploreFieldGrid"
import humanize from "humanize-string"
import { SQLSnippet } from "./SQLSnippet"
import { QueryChart } from "./QueryChart"
import { canGetTopValues, canGetDistribution } from "../utils/queries"
import { exploreFieldURL } from "../utils/urls"
import { ExternalLink } from "../extract-to-framework/ExtensionLink"
import {
  MetadataItem,
  MetadataList
} from "../components-generalized/MetadataList"
import { Tags } from "../components-generalized/Tags"

const DetailPane = styled.div``

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
        {explore.hidden && <MetadataItem label="Hidden">Yes</MetadataItem>}
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
      <Divider my="medium" appearance="light" />
      <Flex>
        <FlexItem flex="0 0 auto">
          {field.lookml_link && (
            <ExternalLink target="_blank" href={field.lookml_link}>
              <Button
                iconBefore="LogoRings"
                variant="transparent"
                size="xsmall"
              >
                Go to LookML
              </Button>
            </ExternalLink>
          )}
        </FlexItem>
        <FlexItem flex="1 1 auto" textAlign="right">
          <ExternalLink target="_blank" href={exploreFieldURL(explore, field)}>
            <Button iconBefore="Explore" variant="transparent" size="xsmall">
              Explore with Field
            </Button>
          </ExternalLink>
        </FlexItem>
      </Flex>
    </DetailPane>
  )
}
