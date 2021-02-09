import React from "react"
import {
  Aside,
} from "@looker/components"
import { ColumnDescriptor } from "./interfaces"
import styled from "styled-components"

export const SettingsPanel = styled(Aside as any)`
  border-right: solid 1px ${(props) => props.theme.colors.ui2};
  overflow-y: auto;
  z-index: 1;
`
