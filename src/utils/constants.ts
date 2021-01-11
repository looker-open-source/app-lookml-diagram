import { theme } from '@looker/components'

// MetadataPanel
export const METADATA_PANEL_PIXEL = 450

// ViewOptions
export const VIEW_OPTIONS_HIDDEN_DEFAULT = true
export const VIEW_OPTIONS_FIELDS_DEFAULT = "all"

// Diagram tables, joins
export const TABLE_WIDTH = 255
export const TABLE_ROW_HEIGHT = 30
export const TABLE_PADDING = TABLE_WIDTH * 2.2
export const JOIN_CONNECTOR_WIDTH = 40
export const NONVIEWS = ["_joinData", "_yOrderLookup"]
export const TABLE_VERTICAL_PADDING = 5
export const TABLE_DEGREE_STEP = -8

// Diagram styles
export const DIAGRAM_BACKGROUND_COLOR = theme.colors.ui1
export const DIAGRAM_JOIN_COLOR = theme.colors.inverse
export const DIAGRAM_FIELD_COLOR = "#FFFFFF"
export const DIAGRAM_VIEW_COLOR = "#ccd8e4"
export const DIAGRAM_BASE_VIEW_COLOR = "steelblue"
// export const DIAGRAM_VIEW_COLOR = "#ABB2B9"
// export const DIAGRAM_BASE_VIEW_COLOR = "#2E4053"
export const DIAGRAM_DIMENSION_COLOR = "#f6f8fa"
export const DIAGRAM_MEASURE_COLOR = "#f7f2ee"

export const DIAGRAM_HIGHLIGHT_COLOR = theme.colors.key
// export const DIAGRAM_HIGHLIGHT_COLOR = "#F1C40F"
export const DIAGRAM_HIGHLIGHT_TEXT_COLOR = theme.colors.keyText

export const MAX_TEXT_LENGTH = 23
export const DIAGRAM_TEXT_SIZE = theme.fontSizes.large
export const DIAGRAM_TEXT_COLOR = theme.colors.text
export const DIAGRAM_FIELD_WEIGHT = theme.fontWeights.normal
export const DIAGRAM_VIEW_WEIGHT = theme.fontWeights.medium

export const DIAGRAM_FIELD_STROKE_WIDTH = 8

export const DIAGRAM_FIELD_ICON_COLOR = theme.colors.text3
export const DIAGRAM_PK_ICON_COLOR = theme.colors.text1
export const DIAGRAM_ICON_SCALE = 0.7

export const DIAGRAM_SHADOW_RADIUS = 4
export const DIAGRAM_SHADOW_ALPHA = 7
