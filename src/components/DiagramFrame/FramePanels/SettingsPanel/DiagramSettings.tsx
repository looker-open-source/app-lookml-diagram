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
import {
  SpaceVertical,
  Divider,
  Heading,
  FieldSelect,
  Label,
  theme
} from "@looker/components"
import { internalModelURL } from "../../../../utils/routes"
import { useHistory } from "react-router"
import { DiagramSettingsProps } from "../types"
import {SettingsPanel} from "../FramePanelsHelpers"
import {ExploreList} from "./ExploreList"

export const DiagramSettings: React.FC<DiagramSettingsProps> = ({ 
  modelDetails,
  currentModel,
  modelName,
  setModelError,
  setSelectedBranch,
  branchOpts,
  gitBranch,
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
    <SettingsPanel width="275px" p="medium">
      <SpaceVertical>
        <Heading fontSize="large" color={theme.colors.text4}>Diagram Settings</Heading>
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
          <>
            <FieldSelect
              options={branchOpts ? branchOpts : []}
              placeholder="Loading Git Branches..."
              label="Current Branch"
              value={gitBranch && gitBranch.name}
              onChange={(value)=>{setSelectedBranch(value)}}
              disabled={(gitBranch && gitBranch.is_production) || !diagramExplore}
            />
            <Divider appearance="light" my="medium" />
            <Label fontSize="xsmall" style={{marginTop: "0rem"}}>Select an Explore</Label>
            <ExploreList 
              exploreList={exploreList}
              currentModel={currentModel}
              selectionInfo={selectionInfo}
              currentExplore={currentExplore}
              diagramExplore={diagramExplore}
              setSelectionInfo={setSelectionInfo}
              setViewVisible={setViewVisible}
              setZoomFactor={setZoomFactor}
              setViewPosition={setViewPosition}
              setMinimapUntoggled={setMinimapUntoggled}
              setMinimapEnabled={setMinimapEnabled}/>
          </>
        )}
      </SpaceVertical>
    </SettingsPanel>
  )
}
