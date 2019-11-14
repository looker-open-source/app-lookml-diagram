import React from "react"
import {
  SettingsContextConsumer,
  isColumnHidden,
  setColumnHidden,
  Settings,
  areSettingsDefault,
  resetSettingsToDefault
} from "./Settings"
import { FieldCheckbox, Popover, Box, ButtonOutline } from "@looker/components"
import styled from "styled-components"

const PopoverBox = styled(Box)`
  // min-width: 150px;
`

export const ColumnHideToggle = ({
  settings,
  label,
  id
}: {
  settings: Settings
  label: string
  id: string
}) => {
  return (
    <FieldCheckbox
      label={label}
      alignLabel="right"
      mb="none"
      onChange={(event: any) => {
        setColumnHidden(id, !event.target.checked, settings)
      }}
      checked={!isColumnHidden(id, settings)}
    />
  )
}

export const ViewCustomizer = () => {
  return (
    <SettingsContextConsumer>
      {settings => (
        <Popover
          content={
            <PopoverBox p="medium">
              <ColumnHideToggle
                label="Field Label"
                id="label"
                settings={settings}
              />
              <ColumnHideToggle
                label="LookML Name"
                id="name"
                settings={settings}
              />
              <ColumnHideToggle
                label="Description"
                id="description"
                settings={settings}
              />
              <ColumnHideToggle label="Type" id="type" settings={settings} />
              <ColumnHideToggle label="SQL" id="sql" settings={settings} />
              <ColumnHideToggle label="Tags" id="tags" settings={settings} />
              {!areSettingsDefault(settings) && (
                <ButtonOutline
                  iconBefore="Refresh"
                  onClick={() => resetSettingsToDefault(settings)}
                  size="xsmall"
                >
                  Reset View
                </ButtonOutline>
              )}
            </PopoverBox>
          }
        >
          {(onClick, ref) => (
            <ButtonOutline
              aria-haspopup="true"
              iconBefore="ViewFile"
              onClick={onClick}
              ref={ref}
              size="small"
            >
              View Options
            </ButtonOutline>
          )}
        </Popover>
        // <FieldToggleSwitch
        //   label="Details"
        //   onChange={(event: any) => {
        //     settings.setShowDetails(event.target.checked)
        //   }}
        //   on={settings.showDetails}
        // />
      )}
    </SettingsContextConsumer>
  )
}
