import React from "react"
import { ExploreList } from "./ExploreList"
import PlainPageLoading from "./PlainPageLoading"
import { ExploreDictionary } from "./ExploreDictionary"
import { Flex, FlexItem, Icon, Heading } from "looker-lens"
import styled from "styled-components"
import { useAllModels } from "./fetchers"
import { usePathNames } from "./routes"
import { ExplorePicker } from "./ModelPicker"

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

const DictionaryEmptyState: React.FC<{}> = () => {
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

export const DataDictionary: React.FC<{}> = () => {
  const models = useAllModels()
  const { exploreName } = usePathNames()
  if (!models) {
    return <PlainPageLoading />
  }
  return (
    <NavContainer justifyContent="stretch">
      <NavSidebar flex="0 0 300px">
        <ExploreList>
          <ExplorePicker />
        </ExploreList>
      </NavSidebar>
      <NavMainPage flex="1 1 auto">
        {exploreName ? <ExploreDictionary /> : <DictionaryEmptyState />}
      </NavMainPage>
    </NavContainer>
  )
}
