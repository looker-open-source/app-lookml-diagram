import React from "react"
import { SettingsContextConsumer } from "./Settings"
import { ToggleSwitch, styled, FieldToggleSwitch } from "looker-lens/dist"

export const DetailToggleSwitch = () => {
  return (
    <SettingsContextConsumer>
      {settings => (
        <FieldToggleSwitch
          label="Details"
          onChange={(event: any) => {
            settings.setShowDetails(event.target.checked)
          }}
          on={settings.showDetails}
        />
      )}
    </SettingsContextConsumer>
  )
}
