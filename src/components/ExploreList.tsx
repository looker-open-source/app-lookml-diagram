import React, { PureComponent, useState } from "react";
import styled from "styled-components";
import {
  FlexItem,
  List,
  ListItem,
  MenuItem,
  theme,
} from "@looker/components";
import "./styles.css";
import { useCurrentExplore} from "../utils/routes";
import { internalExploreURL, useCurrentModel } from "../utils/routes"
import { useHistory } from "react-router"

export const ExploreList: React.FC<{search: String}> = ({ search }) => {
  const currentExplore = useCurrentExplore()
  const currentModel = useCurrentModel()
  const history = useHistory()
  return (
    <FlexItem pt="xlarge">
      <List>
        { currentModel && currentModel.explores.map((explore: any) => {
          if (!explore.hidden && (!search || explore.label.toLowerCase().includes(search.toLowerCase()))) {
            return (
              <ListItem mb="0" key={explore.name}>
                <CustomLink
                  onClick={() => {
                    history.push(
                      internalExploreURL({
                        model: currentModel.name,
                        explore: explore.name
                      })
                    )
                  }}
                  className={currentExplore && explore.name === currentExplore.name ? "active" : null}
                >
                  {explore.label}
                </CustomLink>
              </ListItem>
            )
          }
        }) }
      </List>
    </FlexItem>
  )
}

const CustomLink = styled(MenuItem)`
  color: ${theme.colors.palette.purple700};
  display: block;
  transition: all 0.3s ease;

  &.active,
  &:hover,
  &:focus {
    background-color: ${theme.colors.palette.purple000};
    color: ${theme.colors.palette.purple400};
    text-decoration: none;
  }
`;
