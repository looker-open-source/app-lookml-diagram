/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

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

import React from 'react'
import {
  SpaceVertical,
  Divider,
  FieldSelect,
  FadeIn,
  Label,
} from '@looker/components'
import { useHistory } from 'react-router'
import { internalModelURL } from '../../../../utils/routes'
import { SettingsPanel, PanelHeading } from '../frame_components'
import { useUpdateGitBranches } from '../../../../utils/fetchers'
import type { DiagramSettingsProps } from './types'
import { ExploreList } from './ExploreList'
import { getBranchOptions } from './utils'

export const DiagramSettings: React.FC<DiagramSettingsProps> = ({
  modelPathName,
  explorePathName,
  modelDetails,
  modelDetail,
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
  const gitBranch = modelDetail?.gitBranch
  const updateBranch = useUpdateGitBranches(modelDetail?.model?.project_name)
  return (
    <SettingsPanel>
      <SpaceVertical>
        <PanelHeading>Diagram Settings</PanelHeading>
        <FieldSelect
          options={modelDetails}
          label="Choose a Model"
          placeholder="Select a model"
          value={modelPathName}
          onChange={(selectedModel: string) => {
            history.push(internalModelURL({ model: selectedModel }))
          }}
          listLayout={{ maxHeight: 300 }}
          isLoading={modelDetails.length === 0}
        />
        {modelPathName && exploreList && (
          <FadeIn duration="intricate">
            <FieldSelect
              options={
                gitBranch
                  ? getBranchOptions(gitBranch, modelDetail.gitBranches)
                  : []
              }
              placeholder="Loading Git Branches..."
              label="Current Branch"
              value={gitBranch && gitBranch.name}
              onChange={(value) => {
                updateBranch.mutate(value)
              }}
              disabled={
                (gitBranch && gitBranch.is_production) ||
                !diagramExplore ||
                modelDetail?.fetchError === 'git'
              }
              style={{ maxWidth: '242px' }}
            />
            <Divider
              appearance="light"
              my="medium"
              style={{ maxWidth: '242px' }}
            />
            <Label fontSize="xsmall" style={{ marginTop: '0rem' }}>
              Select an Explore
            </Label>
            <ExploreList
              exploreList={exploreList}
              currentModel={modelDetail?.model}
              selectionInfo={selectionInfo}
              currentExplore={currentExplore}
              diagramExplore={explorePathName}
              setSelectionInfo={setSelectionInfo}
              setViewVisible={setViewVisible}
              setZoomFactor={setZoomFactor}
              setViewPosition={setViewPosition}
              setMinimapUntoggled={setMinimapUntoggled}
              setMinimapEnabled={setMinimapEnabled}
            />
          </FadeIn>
        )}
      </SpaceVertical>
    </SettingsPanel>
  )
}
