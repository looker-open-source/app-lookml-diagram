import * as React from "react"
import {
  ILookmlModelExplore,
  ILookmlModelExploreField,
  ILookmlModel
} from "@looker/sdk"
import {
  Link,
  Text,
  Button,
  Heading,
  Icon,
  Flex,
  FlexItem,
  Box,
  Divider
} from "looker-lens"
import { exploreURL } from "./urls"
import ExploreFieldGrid from "./ExploreFieldGrid"
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderControls,
  PageMasterDetail,
  PageMaster,
  PageDetail
} from "./Page"
import { ViewCustomizer } from "./ViewCustomizer"
import { FieldDetail, Tags } from "./FieldDetail"
import { ExternalLink } from "./framework/ExtensionLink"

interface ExploreDictionaryViewState {
  detailField?: ILookmlModelExploreField
}

interface ExploreDictionaryViewProps {
  model: ILookmlModel
  explore: ILookmlModelExplore
}

export default class ExploreDictionaryView extends React.Component<
  ExploreDictionaryViewProps,
  ExploreDictionaryViewState
> {
  constructor(props: ExploreDictionaryViewProps) {
    super(props)
    this.state = {}
    this.setDetailField = this.setDetailField.bind(this)
  }

  setDetailField(detailField: ILookmlModelExploreField) {
    this.setState({ detailField })
  }

  render() {
    return (
      <Page>
        <PageHeader>
          <PageHeaderTitle> {this.props.explore.label}</PageHeaderTitle>
          <PageHeaderControls>
            <ViewCustomizer />
            <ExternalLink href={exploreURL(this.props.explore)}>
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
            <ExploreHeader explore={this.props.explore} />
            <ExploreFieldGrid
              {...this.props}
              setDetailField={this.setDetailField}
            />
          </PageMaster>
          {this.state.detailField && (
            <PageDetail>
              <Flex>
                <FlexItem flex="1 1 auto">
                  <Heading>{this.state.detailField.label}</Heading>
                </FlexItem>
                <FlexItem flex="0 0 auto">
                  <Button
                    p="none"
                    variant="transparent"
                    color="neutral"
                    onClick={() => this.setState({ detailField: undefined })}
                  >
                    <Icon name="Close" size="1.25rem" />
                  </Button>
                </FlexItem>
              </Flex>
              <FieldDetail
                field={this.state.detailField}
                model={this.props.model}
                explore={this.props.explore}
              />
            </PageDetail>
          )}
        </PageMasterDetail>
      </Page>
    )
  }
}

const ExploreHeader = ({ explore }: { explore: ILookmlModelExplore }) => {
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
