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

import React, { useState } from "react"
import { ComponentsProvider, MessageBar } from "@looker/components"
import { DiagramFrame } from "./DiagramFrame/DiagramFrame"
import { useSelectExplore, usePathNames } from "../utils/routes"
import { DiagramError } from "../utils/fetchers"
import { VIEW_OPTIONS_HIDDEN_DEFAULT, VIEW_OPTIONS_FIELDS_DEFAULT,
} from '../utils/constants'

export const Extension: React.FC = () => {
  const [diagramError, setDiagramError] = useState<DiagramError | undefined>(undefined)
  const [selectedBranch, setSelectedBranch] = React.useState("")
  const { modelName, exploreName, fullPage } = usePathNames()
  const [hiddenToggle, setHiddenToggle] = React.useState(VIEW_OPTIONS_HIDDEN_DEFAULT)
  const [displayFieldType, setDisplayFieldType] = React.useState(VIEW_OPTIONS_FIELDS_DEFAULT)
  const { unfilteredModels, modelDetail, dimensions } = useSelectExplore(hiddenToggle, displayFieldType, selectedBranch, diagramError, setDiagramError)
  return (
  <ComponentsProvider themeCustomizations={{
    colors: { key: "rgb(45, 126, 234)" },
  }}>
    {/* Check out ./src/component_structure.png for a diagram of the app structure */}
    {diagramError?.kind === "git" && <MessageBar intent="critical">{diagramError.message}</MessageBar>}
    <DiagramFrame
      unfilteredModels={unfilteredModels}
      pathModelName={modelName}
      pathExploreName={exploreName}
      modelDetail={modelDetail}
      dimensions={dimensions}
      modelError={diagramError}
      setModelError={setDiagramError}
      hiddenToggle={hiddenToggle}
      setHiddenToggle={setHiddenToggle}
      displayFieldType={displayFieldType}
      setDisplayFieldType={setDisplayFieldType}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    />
  </ComponentsProvider>
)}
