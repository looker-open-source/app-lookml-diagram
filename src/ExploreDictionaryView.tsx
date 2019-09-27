import * as React from "react"
import { ILookmlModelExplore, ILookmlModelExploreField } from "@looker/sdk"
import { Link, Text, Button, Heading, Icon, Flex, FlexItem } from "looker-lens"
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
import { FieldDetail } from "./FieldDetail"

interface ExploreDictionaryViewState {
  detailField?: ILookmlModelExploreField
}

interface ExploreDictionaryViewProps {
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
            <Link href={exploreURL(this.props.explore)} target="_blank">
              <Button
                iconBefore="Explore"
                ml="large"
                variant="outline"
                size="small"
              >
                Explore
              </Button>
            </Link>
          </PageHeaderControls>
        </PageHeader>
        <PageMasterDetail>
          <PageMaster>
            {this.props.explore.description && (
              <Text variant="subdued">{this.props.explore.description}</Text>
            )}
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
              <FieldDetail field={this.state.detailField} />
            </PageDetail>
          )}
        </PageMasterDetail>
      </Page>
    )
  }
}
