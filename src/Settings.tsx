import React, { useState } from "react"
import uniq from "lodash/uniq"
import isEqual from "lodash/isEqual"

export interface Settings {
  hiddenColumns: string[]
  setHiddenColumns: (hiddenColumns: string[]) => void
}

const DEFAULT_HIDDEN_COLUMNS = ["name", "sql", "tags"]

const SettingsContext = React.createContext<Settings>({
  hiddenColumns: DEFAULT_HIDDEN_COLUMNS,
  setHiddenColumns: () => {}
})

const HIDDEN_COLUMNS = "dataDictionary::hiddenColumns"

function parseJSONStringArray(string: string, fallback: string[]) {
  try {
    const res = JSON.parse(string)
    if (!Array.isArray(res) || res.some(e => typeof e !== "string")) {
      return fallback
    }
    return res
  } catch {
    return fallback
  }
}

export const SettingsContextConsumer = SettingsContext.Consumer

export function isColumnHidden(col: string, settings: Settings) {
  return settings.hiddenColumns.indexOf(col) !== -1
}

function areHiddenColumnsDefault(hiddenColumns: string[]) {
  return isEqual(
    uniq(hiddenColumns).sort(),
    uniq(DEFAULT_HIDDEN_COLUMNS).sort()
  )
}

export function areSettingsDefault(settings: Settings) {
  return areHiddenColumnsDefault(settings.hiddenColumns)
}

export function resetSettingsToDefault(settings: Settings) {
  return settings.setHiddenColumns(DEFAULT_HIDDEN_COLUMNS)
}

export function setColumnHidden(
  col: string,
  value: boolean,
  settings: Settings
) {
  if (value) {
    settings.setHiddenColumns(settings.hiddenColumns.concat([col]))
  } else {
    settings.setHiddenColumns(settings.hiddenColumns.filter(c => c !== col))
  }
}

export const SettingsContextProvider = (props: { children: JSX.Element }) => {
  const setHiddenColumns = (hiddenColumns: string[]) => {
    hiddenColumns = uniq(hiddenColumns)
    // if (areHiddenColumnsDefault(hiddenColumns)) {
    //   localStorage.removeItem(HIDDEN_COLUMNS)
    // } else {
    //   localStorage.setItem(HIDDEN_COLUMNS, JSON.stringify(hiddenColumns))
    // }
    setState({ ...state, hiddenColumns })
  }

  const initState = {
    hiddenColumns: parseJSONStringArray("", DEFAULT_HIDDEN_COLUMNS),
    setHiddenColumns
  }

  const [state, setState] = useState(initState)

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}
