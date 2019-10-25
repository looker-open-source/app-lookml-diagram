import React, { useState } from "react"
import {
  ILookmlModelExplore,
  ILookmlModelExploreField,
  ILookmlModel
} from "@looker/sdk/dist/sdk/models"
import { Text, Button, Box, Divider } from "looker-lens"
import { exploreURL } from "../utils/urls"
import { ExploreFieldGrid } from "./ExploreFieldGrid"
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderControls,
  PageMasterDetail,
  PageMaster,
  PageDetail
} from "../components-generalized/Page"
import { ViewCustomizer } from "./ViewCustomizer"
import { FieldDetail } from "./FieldDetail"
import { ExternalLink } from "../extract-to-framework/ExtensionLink"
import { Tags } from "../components-generalized/Tags"

interface ExploreDictionaryViewProps {
  model: ILookmlModel
  explore: ILookmlModelExplore
}

export const ExploreDictionaryView: React.FC<ExploreDictionaryViewProps> = ({
  model,
  explore
}) => {
  const [detailField, setDetailField] = useState<
    ILookmlModelExploreField | undefined
  >()
  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle> {explore.label}</PageHeaderTitle>
        <PageHeaderControls>
          <ViewCustomizer />
          <ExternalLink target="_blank" href={exploreURL(explore)}>
            <Button
              iconBefore="Explore"
              ml="large"
              variant="outline"
              size="small"
            >
              Explore
            </Button>
          </ExternalLink>
        </PageHeaderControls>
      </PageHeader>
      <PageMasterDetail>
        <PageMaster>
          <ExploreHeader explore={explore} />
          <ExploreFieldGrid explore={explore} setDetailField={setDetailField} />
        </PageMaster>
        {detailField && (
          <PageDetail
            title={detailField.label}
            onClose={() => setDetailField(undefined)}
          >
            <FieldDetail field={detailField} model={model} explore={explore} />
          </PageDetail>
        )}
      </PageMasterDetail>
    </Page>
  )
}

const ExploreHeader: React.FC<{ explore: ILookmlModelExplore }> = ({
  explore
}) => {
  const hasDescription = !!explore.description
  const hasTags = !!(explore.tags && explore.tags.length > 0)
  if (!hasDescription && !hasTags) {
    return <></>
  }
  return (
    <>
      {hasDescription && (
        <Text mb="medium" variant="subdued">
          {explore.description}
        </Text>
      )}
      {hasTags && (
        <Box mb="medium">
          <Tags tags={explore.tags!} />
        </Box>
      )}
      <Divider my="medium" appearance="light" />
    </>
  )
}
