import React from "react"
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk/dist/sdk/models"
import { PageDetail } from "../components-generalized/Page"
import {
  MetadataItem,
  MetadataList
} from "../components-generalized/MetadataList"
import { Flex, FlexItem, Button } from "looker-lens/dist"
import { ExternalLink } from "../extract-to-framework/ExtensionLink"
import { exploreURL } from "../utils/urls"
import { FieldName } from "./ExploreFieldGrid"
import { Tags } from "../components-generalized/Tags"

interface ExploreDetailProps {
  model: ILookmlModel
  explore: ILookmlModelExplore
  onClose: () => void
}

export const ExploreDetail: React.FC<ExploreDetailProps> = ({
  explore,
  onClose
}) => {
  return (
    <PageDetail title={explore.label} onClose={onClose}>
      <MetadataList>
        <MetadataItem label="LookML Name">
          <FieldName>{explore.name}</FieldName>
        </MetadataItem>
        <MetadataItem label="Connection">
          <FieldName>{explore.connection_name}</FieldName>
        </MetadataItem>
        {explore.hidden && <MetadataItem label="Hidden">Yes</MetadataItem>}
        {explore.description && (
          <MetadataItem label="Description">{explore.description}</MetadataItem>
        )}
        {explore.tags && explore.tags.length > 0 ? (
          <MetadataItem label="Tags">
            <Tags tags={explore.tags} />
          </MetadataItem>
        ) : (
          undefined
        )}
        <MetadataItem compact label="Dimensions">
          {explore.fields.dimensions.length.toLocaleString()}
        </MetadataItem>
        <MetadataItem compact label="Measures">
          {explore.fields.measures.length.toLocaleString()}
        </MetadataItem>
        <MetadataItem compact label="Parameters">
          {explore.fields.parameters.length.toLocaleString()}
        </MetadataItem>
        <MetadataItem compact label="Filter-Only Fields">
          {explore.fields.filters.length.toLocaleString()}
        </MetadataItem>
        <MetadataItem compact label="Joins">
          {explore.joins.length.toLocaleString()}
        </MetadataItem>
      </MetadataList>
      <Flex>
        <FlexItem flex="1 1 auto" textAlign="center">
          <ExternalLink target="_blank" href={exploreURL(explore)}>
            <Button iconBefore="Explore" variant="transparent" size="xsmall">
              Explore
            </Button>
          </ExternalLink>
        </FlexItem>
      </Flex>
    </PageDetail>
  )
}
