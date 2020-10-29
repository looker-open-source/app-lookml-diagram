/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React from "react"
import styled from "styled-components"
import { FlexItem, List, ListItem, MenuItem, theme } from "@looker/components"
import "./styles.css"
import { internalExploreURL, useCurrentModel } from "../utils/routes"
import { useHistory } from "react-router"
import { ILookmlModelExplore } from "@looker/sdk"

const isActive = (
  currentExplore: ILookmlModelExplore,
  listExplore: ILookmlModelExplore,
  loadingExplore: string
) => {
  if (
    !loadingExplore &&
    currentExplore &&
    listExplore.name === currentExplore.name
  ) {
    return "active"
  } else if (loadingExplore && listExplore.name === loadingExplore) {
    return "active"
  } else {
    return null
  }
}

export const ExploreList: React.FC<{
  currentExplore: ILookmlModelExplore
  search: string
  loadingExplore: string
}> = ({ currentExplore, loadingExplore, search }) => {
  const currentModel = useCurrentModel()
  const history = useHistory()
  return (
    <FlexItem pt="xlarge">
      <List>
        {currentModel &&
          currentModel.explores.map((explore: any) => {
            if (
              !explore.hidden &&
              (!search ||
                explore.label.toLowerCase().includes(search.toLowerCase()))
            ) {
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
                    className={isActive(
                      currentExplore,
                      explore,
                      loadingExplore
                    )}
                  >
                    {explore.label}
                  </CustomLink>
                </ListItem>
              )
            }
          })}
      </List>
    </FlexItem>
  )
}

const CustomLink = styled(MenuItem as any)`
  color: ${theme.colors.keyPressed};
  display: block;
  transition: all 0.3s ease;

  button {
    padding: ${theme.space.small} ${theme.space.large};
  }

  &.active,
  &:hover,
  &:focus {
    background-color: ${theme.colors.keySubtle};
    color: ${theme.colors.key};
    text-decoration: none;
  }
  cursor: pointer;
`
