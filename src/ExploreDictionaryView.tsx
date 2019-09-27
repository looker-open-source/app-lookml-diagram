import * as React from "react"
import { ILookmlModelExplore } from "@looker/sdk"
import { groupBy, values, flatten, toPairs } from "lodash"
import { Link, Text, Button } from "looker-lens"
import { exploreURL } from "./urls"
import ExploreFieldGrid from "./ExploreFieldGrid"
import {
  Page,
  PageHeader,
  PageMain,
  PageHeaderTitle,
  PageHeaderControls
} from "./Page"
import { DetailToggleSwitch } from "./DetailToggleSwitch"

interface ExploreDictionaryViewState {}

interface ExploreDictionaryViewProps {
  explore: ILookmlModelExplore
}

export default class ExploreDictionaryView extends React.Component<
  ExploreDictionaryViewProps,
  ExploreDictionaryViewState
> {
  render() {
    const groups = toPairs(
      groupBy(
        flatten(values(this.props.explore.fields)).filter(f => !f.hidden),
        f => f.view_label
      )
    )
    return (
      <Page>
        <PageHeader>
          <PageHeaderTitle> {this.props.explore.label}</PageHeaderTitle>
          <PageHeaderControls>
            <DetailToggleSwitch />
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
        <PageMain>
          {this.props.explore.description && (
            <Text variant="subdued">{this.props.explore.description}</Text>
          )}
          <ExploreFieldGrid {...this.props} />
        </PageMain>
      </Page>
    )
  }
}
