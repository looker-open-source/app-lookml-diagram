import * as React from "react"
import ExploreList from "./ExploreList"
import PlainPageLoading from "./PlainPageLoading"
import { sdk } from "./sdk"
import { ILookmlModel, ILookmlModelNavExplore } from "@looker/sdk"
import { ExploreDictionary } from "./ExploreDictionary"
import { Flex, FlexItem, Icon, Heading } from "looker-lens"
import styled from "styled-components"

const NavContainer = styled(Flex)`
  top: 0;
  left: 0;
  height: 100vh;
  position: absolute;
  width: 100%;
  overflow: hidden;
`

const NavSidebar = styled(FlexItem)`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #f5f5f5;
  border: #e8e8e8 solid;
  border-width: 0 1px 0 0;
`

const NavMainPage = styled(FlexItem)`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
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
        <NavContainer justifyContent="stretch">
          <NavSidebar flex="0 0 300px">
            <ExploreList
              models={this.state.models}
              currentExplore={this.state.currentExplore}
              onExploreSelected={currentExplore =>
                this.setState({ currentExplore })
              }
            />
          </NavSidebar>
          <NavMainPage flex="1 1 auto">
            {this.state.currentExplore ? (
              <ExploreDictionary {...this.state.currentExplore} />
            ) : (
              <BigEmptyState />
            )}
          </NavMainPage>
        </NavContainer>
      )
    }
  }
}
