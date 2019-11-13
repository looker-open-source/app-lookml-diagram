import React from "react"
import { Select, Box, styled } from "looker-lens"
import { internalModelURL, useCurrentModel } from "../utils/routes"
import { useAllModels } from "../utils/fetchers"
import { useHistory } from "react-router"

const WideSelect = styled(Select)`
  width: 100%;
`

export const ExplorePicker: React.FC = () => {
  const models = useAllModels() || []
  const currentModel = useCurrentModel()
  const history = useHistory()
  return (
    <Box m="medium" mb="none" p="none">
      <WideSelect
        m="none"
        includeBlank={false}
        value={currentModel && currentModel.name}
        options={models
          .filter(m => m.explores && m.explores.some(e => !e.hidden))
          .map(m => ({ value: m.name!, label: m.label! }))}
        onChange={event =>
          history.push(internalModelURL({ model: event.currentTarget.value }))
        }
      />
    </Box>
  )
}
