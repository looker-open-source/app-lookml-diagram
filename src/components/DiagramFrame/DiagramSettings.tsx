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

import React, { useContext, SyntheticEvent } from "react"
import {
  SpaceVertical,
  Heading,
  FieldSelect,
  Label,
  Aside,
  SelectOptionProps,
  Icon,
} from "@looker/components"
import { ColumnDescriptor, SelectionInfoPacket, VisibleViewLookup, ExploreDropdown } from "../interfaces"
import styled from "styled-components"
import { OVERRIDE_KEY_SUBTLE, X_INIT, Y_INIT, ZOOM_INIT } from '../../utils/constants'
import { internalModelURL, internalExploreURL } from "../../utils/routes"
import { SettingsPanel } from "./SettingsPanel"
import { useHistory } from "react-router"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { changeBranch, DiagramError } from "../../utils/fetchers"
import { IGitBranch, ILookmlModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/4.0/models"

export const ExploreList = styled.ul`
  margin: 0;
`

export const ExploreListitem = styled.li`
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
`

export const ExploreButton = styled.button`
  all: inherit;
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
  padding: 12px 12px;
  width: 100%;
  border: none;

 
  ${Icon} {
    transform: translateX(0px);
    transition: all 500ms ease-out;
  } 

  &:hover {
    background-color: ${OVERRIDE_KEY_SUBTLE};
    
    ${Icon} {
      transform: translateX(4px);
    }

  }

  & > * {
    pointer-events: none;
  }


`

export const DiagramSettings: React.FC<{
  modelDetails: SelectOptionProps[],
  currentModel: ILookmlModel,
  setModelError: (error: DiagramError) => void,
  selectedBranch: string,
  setSelectedBranch: (branchName: string) => void,
  branchOpts: SelectOptionProps[],
  gitBranch: IGitBranch,
  gitBranches: IGitBranch[],
  exploreList: ExploreDropdown[],
  selectionInfo: SelectionInfoPacket,
  projectId: string,
  currentExplore: ILookmlModelExplore,
  diagramExplore: string,
  setSelectionInfo: (info: SelectionInfoPacket) => void,
  setViewVisible: (visible: VisibleViewLookup) => void,
  setZoomFactor: (zoom: number) => void,
  setViewPosition: (info: any) => void,
  setMinimapUntoggled: (toggle: boolean) => void,
  setMinimapEnabled: (toggle: boolean) => void,
}> = ({ 
  modelDetails,
  currentModel,
  setModelError,
  selectedBranch,
  setSelectedBranch,
  branchOpts,
  gitBranch,
  gitBranches,
  exploreList,
  selectionInfo,
  projectId,
  currentExplore,
  diagramExplore,
  setSelectionInfo,
  setViewVisible,
  setZoomFactor,
  setViewPosition,
  setMinimapUntoggled,
  setMinimapEnabled,
 }) => {
  const { coreSDK } = useContext(ExtensionContext)
  const history = useHistory()

  async function changeGitBranch(branch: string) {
    setSelectedBranch(branch)
    let targetBranch = gitBranches.filter((br: IGitBranch) => {
      return br.name === branch
    })[0]
    try {
      const response = await changeBranch(coreSDK, projectId, branch, targetBranch.ref)
      location.reload()
    } catch (e) {
      setSelectedBranch(gitBranch.name)
    }
  }

  function buttonShade(exploreNameSel: string) {
    if (currentExplore && currentExplore.name === exploreNameSel) {
      return OVERRIDE_KEY_SUBTLE
    }
    if (diagramExplore === exploreNameSel) {
      return OVERRIDE_KEY_SUBTLE
    }
    return undefined
  }

  return (
    <SettingsPanel width="275px" px="medium" py="large">
      <SpaceVertical>
        <Heading fontSize="large">Diagram Settings</Heading>
        <FieldSelect
          options={modelDetails}
          label="Choose a Model"
          placeholder="Select a model"
          value={currentModel && currentModel.name}
          onChange={(selectedModel: string) => {
            setModelError(undefined)
            setSelectedBranch("")
            history.push(internalModelURL({ model: selectedModel }))
          }
          }
          listLayout={{ maxHeight: 300 }}
          isLoading={modelDetails.length === 0 ? true : false}
        />
        {currentModel && (
          <div>
            <SpaceVertical size="xxsmall">
              <FieldSelect
                options={branchOpts ? branchOpts : []}
                placeholder="Loading Git Branches..."
                label="Current Branch"
                value={gitBranch && gitBranch.name}
                onChange={changeGitBranch}
                disabled={(gitBranch && gitBranch.is_production) || !diagramExplore}
              />
              <Label>Select an Explore</Label>
              <ExploreList>
                {exploreList.map((explore: ExploreDropdown, index: number) => {
                  return (
                    <ExploreListitem key={`explore-${index}`} style={{backgroundColor: buttonShade(explore.value)}}>
                      <ExploreButton
                        onClick={() => {
                          selectionInfo.lookmlElement === "explore" || setSelectionInfo({})
                          setViewVisible({})
                          setZoomFactor(ZOOM_INIT)
                          setViewPosition({x: X_INIT, y: Y_INIT})
                          setMinimapUntoggled(true)
                          setMinimapEnabled(false)
                          history.push(
                            internalExploreURL({
                              model: currentModel.name,
                              explore: explore.value
                            })
                          )
                        }}
                        value={explore.value}
                      >
                        {explore.label}
                      </ExploreButton>
                    </ExploreListitem>
                  )
                })}
              </ExploreList>
            </SpaceVertical>
          </div>
        )}
      </SpaceVertical>
    </SettingsPanel>
  )
}
