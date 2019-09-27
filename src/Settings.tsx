import React, { useState } from "react"
import { uniq, isEqual } from "lodash"

export interface Settings {
  hiddenColumns: string[]
  setHiddenColumns: (hiddenColumns: string[]) => void
}

const DEFAULT_HIDDEN_COLUMNS = ["name"]

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

export function areSettingsDefault(settings: Settings) {
  return isEqual(
    uniq(settings.hiddenColumns).sort(),
    uniq(DEFAULT_HIDDEN_COLUMNS).sort()
  )
}

export function resetSettingsToDEfault(settings: Settings) {
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
    localStorage.setItem(HIDDEN_COLUMNS, JSON.stringify(hiddenColumns))
    setState({ ...state, hiddenColumns })
  }

  const initState = {
    hiddenColumns: parseJSONStringArray(
      localStorage.getItem(HIDDEN_COLUMNS),
      DEFAULT_HIDDEN_COLUMNS
    ),
    setHiddenColumns
  }

  const [state, setState] = useState(initState)

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}
