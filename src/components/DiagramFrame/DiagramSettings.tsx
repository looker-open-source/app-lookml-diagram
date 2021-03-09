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
  FieldSelect,
  Label,
  Spinner,
} from "@looker/components"
import { X_INIT, Y_INIT, ZOOM_INIT } from '../../utils/constants'
import { internalModelURL, internalExploreURL } from "../../utils/routes"
import { ILookmlModel, ILookmlModelExplore, IGitBranch } from "@looker/sdk/lib/sdk/4.0/models"
import { useHistory } from "react-router"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { ExploreDropdown, DiagramSettingsProps } from "./types"
import {ExploreList, ExploreListitem, ExploreButton, SettingsPanel} from "./components"
import { buttonShade } from "./utils"

export const DiagramSettings: React.FC<DiagramSettingsProps> = ({ 
  modelDetails,
  currentModel,
  modelName,
  setModelError,
  selectedBranch,
  setSelectedBranch,
  branchOpts,
  gitBranch,
  gitBranches,
  selectionInfo,
  exploreList,
  currentExplore,
  diagramExplore,
  setSelectionInfo,
  setViewVisible,
  setZoomFactor,
  setViewPosition,
  setMinimapUntoggled,
  setMinimapEnabled,
 }) => {
  const history = useHistory()
  return (
    <SettingsPanel width="275px" px="medium" py="large">
      <SpaceVertical>
        <Heading fontSize="large">Diagram Settings</Heading>
        <FieldSelect
          options={modelDetails}
          label="Choose a Model"
          placeholder="Select a model"
          value={modelName}
          onChange={(selectedModel: string) => {
            setModelError(undefined)
            setSelectedBranch("")
            history.push(internalModelURL({ model: selectedModel }))
          }
          }
          listLayout={{ maxHeight: 300 }}
          isLoading={modelDetails.length === 0 ? true : false}
        />
        {modelName && (
          <div>
            <SpaceVertical size="xxsmall">
              <FieldSelect
                options={branchOpts ? branchOpts : []}
                placeholder="Loading Git Branches..."
                label="Current Branch"
                value={gitBranch && gitBranch.name}
                onChange={(value)=>{setSelectedBranch(value)}}
                disabled={(gitBranch && gitBranch.is_production) || !diagramExplore}
              />
              <Label>Select an Explore</Label>
              <ExploreList>
                {exploreList && exploreList.map((explore: ExploreDropdown, index: number) => {
                  return (
                    <ExploreListitem key={`explore-${index}`} style={{backgroundColor: buttonShade(explore.value, currentExplore, diagramExplore)}}>
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
