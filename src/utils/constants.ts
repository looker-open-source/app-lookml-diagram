import { theme } from '@looker/components'

// MetadataPanel
export const METADATA_PANEL_PIXEL = 550
export const DIAGRAM_HEADER_HEIGHT = 90

// ViewOptions
export const VIEW_OPTIONS_HIDDEN_DEFAULT = true
export const VIEW_OPTIONS_FIELDS_DEFAULT = "all"

// Diagram zoom
export const ZOOM_INIT = 0.5
export const ZOOM_STEP = 0.1
export const ZOOM_MAX = 2
export const ZOOM_MIN = 0.2
export const X_INIT = 600
export const Y_INIT = 100

// Diagram tables, joins
export const TABLE_WIDTH = 255
export const TABLE_ROW_HEIGHT = 30
export const TABLE_PADDING = TABLE_WIDTH * 2.2
export const JOIN_CONNECTOR_WIDTH = 40
export const NONVIEWS = ["_joinData", "_yOrderLookup"]
export const TABLE_VERTICAL_PADDING = 5
export const TABLE_DEGREE_STEP = -3

// Diagram styles
export const OVERRIDE_KEY = "rgb(45, 126, 234)"
export const OVERRIDE_KEY_SUBTLE = "#eaf2fc"
export const DIAGRAM_BACKGROUND_COLOR = theme.colors.ui1
export const TABLE_BACKGROUND_COLOR = theme.colors.ui3
export const DIAGRAM_JOIN_COLOR = theme.colors.ui4
export const DIAGRAM_FIELD_COLOR = "#FFF"
export const DIAGRAM_VIEW_COLOR = "#ccd8e4"
export const DIAGRAM_BASE_VIEW_COLOR = "steelblue"
export const DIAGRAM_DIMENSION_COLOR = "#FFF"
export const DIAGRAM_MEASURE_COLOR = '#FDF7E3'
export const DIAGRAM_BASE_TEXT_COLOR = theme.colors.keyText


export const DIAGRAM_HOVER_COLOR = OVERRIDE_KEY_SUBTLE
export const DIAGRAM_HOVER_TEXT_COLOR = theme.colors.text
export const DIAGRAM_SELECT_COLOR = OVERRIDE_KEY
export const DIAGRAM_SELECT_TEXT_COLOR = theme.colors.keyText
export const DIAGRAM_SELECT_ICON_COLOR = theme.colors.keyText
export const DIAGRAM_MEASURE_HOVER_COLOR = "#FAE6B3"
export const DIAGRAM_JOIN_HOVER_COLOR = theme.colors.ui5 

export const DIAGRAM_JOIN_SELECT_COLOR = OVERRIDE_KEY

export const MAX_TEXT_LENGTH = 23
export const DIAGRAM_TEXT_SIZE = theme.fontSizes.large
export const DIAGRAM_TEXT_COLOR = theme.colors.text
export const DIAGRAM_FIELD_WEIGHT = theme.fontWeights.normal
export const DIAGRAM_VIEW_WEIGHT = theme.fontWeights.medium

export const DIAGRAM_FIELD_STROKE_WIDTH = 8

export const DIAGRAM_FIELD_ICON_COLOR = theme.colors.text2
export const DIAGRAM_PK_ICON_COLOR = theme.colors.text3
export const DIAGRAM_ICON_SCALE = 0.7
export const DIAGRAM_MEASURE_ICON_COLOR = '#CA8B01'

export const DIAGRAM_SHADOW_RADIUS = 4
export const DIAGRAM_SHADOW_ALPHA = 7

export const CAP_RADIUS = 7

export const DIAGRAM_IGNORED_MODELS = ['system__activity']
