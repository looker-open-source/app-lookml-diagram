import * as React from "react"
import ExploreList from "./ExploreList"
import PlainPageLoading from "./PlainPageLoading"
import { sdk } from "./sdk"
import { ILookmlModel, ILookmlModelNavExplore } from "@looker/sdk"
import { ExploreDictionary } from "./ExploreDictionary"
import { Flex, FlexItem } from "looker-lens"
import styled from "styled-components"

const PageContainer = styled(Flex)`
  top: 0;
  left: 0;
  height: 100vh;
  position: absolute;
  width: 100%;
  overflow: hidden;
`

const PageSidebar = styled(FlexItem)`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

const PageMainPane = styled(FlexItem)`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

interface DataDictionaryState {
  loading: boolean
  models: ILookmlModel[]
  currentExplore?: { explore: ILookmlModelNavExplore; model: ILookmlModel }
}

export class DataDictionary extends React.Component<{}, DataDictionaryState> {
  constructor(props: {}) {
    super(props)

    this.state = { loading: true, models: [] }
  }

  async loadModels() {
    this.setState({
      models: await sdk.ok(sdk.all_lookml_models()),
      loading: false
    })
  }

  componentDidMount() {
    this.loadModels()
  }

  render() {
    if (this.state.loading) {
      return <PlainPageLoading />
    } else {
      return (
        <PageContainer justifyContent="stretch">
          <PageSidebar flex="0 0 250px">
            <ExploreList
              models={this.state.models}
              onExploreSelected={(model, explore) =>
                this.setState({ currentExplore: { explore, model } })
              }
            />
          </PageSidebar>
          <PageMainPane p="large" flex="1 1 auto">
            {this.state.currentExplore ? (
              <ExploreDictionary {...this.state.currentExplore} />
            ) : (
              <h3>Nothing Selected</h3>
            )}
          </PageMainPane>
        </PageContainer>
      )
    }
  }
}
