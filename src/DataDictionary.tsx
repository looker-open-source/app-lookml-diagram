import * as React from "react"
import ExploreList from "./ExploreList"
import PlainPageLoading from "./PlainPageLoading"
import { sdk } from "./sdk"
import { ILookmlModel, ILookmlModelNavExplore } from "@looker/sdk"
import { ExploreDictionary } from "./ExploreDictionary"
import { Flex, FlexItem, Icon, Heading } from "looker-lens"
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
  border-radius: 6px;
  border: 10px solid #f2f2f9;
`

const PageMainPane = styled(FlexItem)`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export type CurrentExplore = {
  explore: ILookmlModelNavExplore
  model: ILookmlModel
}

interface DataDictionaryState {
  loading: boolean
  models: ILookmlModel[]
  currentExplore?: CurrentExplore
}

const BigEmptyState = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mb="medium"
      flexDirection="column"
      height="100vh"
    >
      <Icon name="CircleExplore" size={128} color="palette.charcoal300" />
      <Heading fontSize="xxlarge" color="palette.charcoal300">
        Pick an explore to see what data is available.
      </Heading>
    </Flex>
  )
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
              currentExplore={this.state.currentExplore}
              onExploreSelected={currentExplore =>
                this.setState({ currentExplore })
              }
            />
          </PageSidebar>
          <PageMainPane p="large" flex="1 1 auto">
            {this.state.currentExplore ? (
              <ExploreDictionary {...this.state.currentExplore} />
            ) : (
              <BigEmptyState />
            )}
          </PageMainPane>
        </PageContainer>
      )
    }
  }
}
