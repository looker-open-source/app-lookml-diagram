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
import { ComponentsProvider, theme } from "@looker/components"
import { DiagramFrame } from "./DiagramFrame/DiagramFrame"
import { useCurrentModel, useSelectExplore, usePathNames } from "../utils/routes"
import { useAllModels } from "../utils/fetchers"
import { VIEW_OPTIONS_HIDDEN_DEFAULT, VIEW_OPTIONS_FIELDS_DEFAULT,
} from '../utils/constants'

export const Extension: React.FC = () => {
  const unfilteredModels = useAllModels()
  const currentModel = useCurrentModel()
  const { modelName, exploreName, fullPage } = usePathNames()
  const [hiddenToggle, setHiddenToggle] = React.useState(VIEW_OPTIONS_HIDDEN_DEFAULT)
  const [displayFieldType, setDisplayFieldType] = React.useState(VIEW_OPTIONS_FIELDS_DEFAULT)
  const [selectedBranch, setSelectedBranch] = React.useState("")
  const { modelDetail, dimensions, modelError, setModelError, minimapScale, minimapX, minimapY, defaultMinimap } = useSelectExplore(hiddenToggle, displayFieldType, selectedBranch)
  return (
  <ComponentsProvider themeCustomizations={{
    colors: { key: "rgb(45, 126, 234)" },
  }}>
    <DiagramFrame
      unfilteredModels={unfilteredModels}
      currentModel={currentModel}
      pathModelName={modelName}
      pathExploreName={exploreName}
      modelDetail={modelDetail}
      dimensions={dimensions}
      modelError={modelError}
      setModelError={setModelError}
      minimapScale={minimapScale}
      minimapX={minimapX}
      minimapY={minimapY}
      defaultMinimap={defaultMinimap}
      hiddenToggle={hiddenToggle}
      setHiddenToggle={setHiddenToggle}
      displayFieldType={displayFieldType}
      setDisplayFieldType={setDisplayFieldType}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    />
  </ComponentsProvider>
)}
