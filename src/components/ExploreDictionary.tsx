import React, { useState } from "react"
import {
  ILookmlModelExplore,
  ILookmlModelExploreField
} from "@looker/sdk/dist/sdk/models"
import { Text, Button, Box, Divider, ButtonOutline } from "@looker/components"
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
import { useCurrentModel, useCurrentExplore } from "../utils/routes"
import PlainPageLoading from "../components-generalized/PlainPageLoading"

export const ExploreDictionary: React.FC = () => {
  const model = useCurrentModel()
  const explore = useCurrentExplore()
  const [detailField, setDetailField] = useState<
    ILookmlModelExploreField | undefined
  >()

  if (!explore || !model) {
    return <PlainPageLoading />
  }

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle> {explore.label}</PageHeaderTitle>
        <PageHeaderControls>
          <ViewCustomizer />
          <ExternalLink target="_blank" href={exploreURL(explore)}>
            <ButtonOutline iconBefore="Explore" ml="large" size="small">
              Explore
            </ButtonOutline>
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
          <Tags tags={explore.tags} />
        </Box>
      )}
      <Divider my="medium" appearance="light" />
    </>
  )
}
