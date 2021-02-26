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

import React, { useContext } from "react"
import {
  SpaceVertical,
  Heading,
  Divider,
  RadioGroup,
  FieldToggleSwitch,
  Label,
  Aside,
  Flex,
  FlexItem,
  Truncate,
  Tooltip,
  ButtonTransparent,
  Icon,
  theme
} from "@looker/components"
import styled from "styled-components"
import { ColumnDescriptor } from "../interfaces"
import { SettingsPanel } from "./SettingsPanel"
import { OVERRIDE_KEY_SUBTLE } from '../../utils/constants'


export const ViewList = styled.ul`
  margin: 0;
`
export const ViewListItem = styled.li`
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
`

export const ViewButton = styled.button`
  all: inherit;
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
  padding: 12px 12px;
  width: 100%;
  border: none;

  :hover {
    background-color: ${OVERRIDE_KEY_SUBTLE};
  }

  & > * {
    pointer-events: none;
  }


`


export const ViewOptions: React.FC<{
  displayFieldType: any,
  hiddenToggle: any,
  viewVisible: any,
  setViewVisible: (visible: any) => void,
  handleHiddenToggle: (toggle: React.FormEvent<HTMLInputElement>) => void,
  setDisplayFieldType: (types: any) => void,
}> = ({ 
  displayFieldType,
  hiddenToggle,
  viewVisible,
  setViewVisible,
  handleHiddenToggle,
  setDisplayFieldType,
 }) => {


  function viewDisabled(disabled: boolean) {
    if (!disabled) {
      return theme.colors.text1
    }
    return undefined
  }

  return (
    <SettingsPanel width="275px" px="medium" py="large">
      <SpaceVertical>
        <Heading fontSize="large">View Options</Heading>
        <Flex width="250px" flexDirection="column">
          <FlexItem pb="small">
            <Label>Fields to Display</Label>
            <RadioGroup 
              pt="small" 
              name="fieldScopeSelection" 
              value={displayFieldType}
              onChange={setDisplayFieldType}
              options={[{label: "All fields", value: "all"}, {label: "Fields with joins", value: "joined"}]} />
          </FlexItem>
          <Divider />
          <FlexItem py="small">
            <Flex>
              <FlexItem>
                <FieldToggleSwitch onChange={handleHiddenToggle} on={hiddenToggle} label="Hide hidden fields    " />
              </FlexItem>
              <FlexItem ml="xxxlarge">
                <Tooltip content="Enabled by default, this toggle hides fields from the diagram that contain 'hidden: yes'.">
                  <Icon size="xsmall" color="subdued" name="CircleInfoOutline"/>
                </Tooltip>
              </FlexItem>
            </Flex>
          </FlexItem>
          <Divider />
          <FlexItem pt="xsmall">
            <Flex flexDirection="column">
              <FlexItem>
                <Flex alignItems="baseline">
                  <FlexItem flexBasis="25%">
                    <Label>Views</Label>
                  </FlexItem>
                  <FlexItem  pl="xxxlarge" flexBasis="75%">
                    <Flex>
                      <FlexItem>
                        <ButtonTransparent 
                          size="small"
                          onClick={(e: any) => {
                            let newViews: any = {}
                            Object.keys(viewVisible).map((d: any) => {
                              newViews[d] = false
                            })
                            setViewVisible(newViews)
                          }}
                        >Hide all</ButtonTransparent>
                      </FlexItem>
                      <FlexItem>
                        <ButtonTransparent size="small"
                          onClick={(e: any) => {
                            let newViews: any = {}
                            Object.keys(viewVisible).map((d: any) => {
                              newViews[d] = true
                            })
                            setViewVisible(newViews)
                          }}
                        >Show all</ButtonTransparent>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <ViewList>
                  {viewVisible && Object.keys(viewVisible).map((item: string, index) => {
                    return (
                      <ViewListItem key={`view-${index}`} style={{color: viewDisabled(viewVisible[item])}}>
                        <ViewButton
                              onClick={(e: any) => {
                                let newViews: any = {}
                                Object.assign(newViews, viewVisible)
                                newViews[item] = !viewVisible[item]
                                setViewVisible(newViews)
                              }}
                              value={item}
                            >
                        <Flex alignItems="center" justifyContent="space-between">
                          <FlexItem>
                              <Truncate>{item}</Truncate>
                          </FlexItem>
                          <FlexItem>
                            <Icon 
                              size="xxsmall"
                              name={viewVisible[item] ? "VisibilityOutline" : "VisibilityOff"}
                              color={viewVisible[item] ? theme.colors.text : theme.colors.text1} />
                          </FlexItem>
                        </Flex>
                        </ViewButton>
                      </ViewListItem>
                    )
                  })}
                </ViewList>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </SpaceVertical>
    </SettingsPanel>
  )
}
