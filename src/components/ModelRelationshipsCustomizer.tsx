import React from "react"
import { SettingsContextConsumer } from "./Settings"
import { Popover, Button, Box } from "looker-lens/dist"
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
            <Button
              aria-haspopup="true"
              variant="outline"
              iconBefore="ViewFile"
              onClick={onClick}
              innerRef={ref}
              size="small"
            >
              View Options
            </Button>
          )}
        </Popover>
      )}
    </SettingsContextConsumer>
  )
}
