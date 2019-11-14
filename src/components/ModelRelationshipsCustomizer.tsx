import React from "react"
import { SettingsContextConsumer } from "./Settings"
import { Popover, Box, ButtonOutline } from "@looker/components"
import { ColumnHideToggle } from "./ViewCustomizer"

export const ModelRelationshipsCustomizer = () => {
  return (
    <SettingsContextConsumer>
      {settings => (
        <Popover
          content={
            <Box p="medium">
              <ColumnHideToggle
                label="3D"
                id="relationships-3d"
                settings={settings}
              />
            </Box>
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
      )}
    </SettingsContextConsumer>
  )
}
