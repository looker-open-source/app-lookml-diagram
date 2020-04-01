import React, { PureComponent, useState } from "react";
import {
  FieldSelect,
  Flex,
  FlexItem,
  Heading,
  InputSearch,
  theme,
} from "@looker/components";
import { useHistory } from 'react-router'
import { ILookmlModel } from "@looker/sdk";
import "./styles.css";
import "./styles.css";
import { internalModelURL } from "../utils/routes"
import { ExploreList } from "./ExploreList";

export const Sidebar: React.FC<{
  models: ILookmlModel[],
  currentModel: ILookmlModel,
  search: string,
  setSearch: (search: string) => void
}> = ({ models, currentModel, search, setSearch }) => {

  const history = useHistory()

  return (
    <Flex flexDirection="column" pt="xxlarge" pb="xxlarge">
      <FlexItem
        borderBottom={`1px solid ${theme.colors.palette.charcoal200}`}
        ml="large"
        mr="xlarge"
        pb="xsmall"
      >
        <FieldSelect
          name="select-model"
          label="Select a Model"
          labelFontSize="xsmall"
          labelFontWeight="normal"
          options={models
            .filter(m => m.explores && m.explores.some(e => !e.hidden))
            .map(m => ({ value: m.name, label: m.label }))}
          onChange={selectedModel =>
            history.push(internalModelURL({ model: selectedModel }))
          }
          value={currentModel && currentModel.name}
        />
      </FlexItem>
      <FlexItem ml="large" mr="xlarge" pt="medium">
        <Heading
          as="h5"
          color="palette.charcoal900"
          fontWeight="semiBold"
        >
          Explores
        </Heading>
        <InputSearch
          hideSearchIcon
          placeholder="Search Model"
          mt="medium"
          onChange={e => setSearch(e.currentTarget.value)}
          value={search}
        />
      </FlexItem>
      <ExploreList
        search={search}
      />
    </Flex>
  )
}
