import React, { useState } from "react"

interface Settings {
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
}

const SettingsContext = React.createContext<Settings>({
  showDetails: false,
  setShowDetails: () => {}
})

const SHOW_DETAILS = "dataDictionary::showDetails"

export const SettingsContextConsumer = SettingsContext.Consumer

export const SettingsContextProvider = (props: { children: JSX.Element }) => {
  const setShowDetails = (showDetails: boolean) => {
    localStorage.setItem(SHOW_DETAILS, JSON.stringify(showDetails))
    setState({ ...state, showDetails })
  }

  const initState = {
    showDetails: localStorage.getItem(SHOW_DETAILS) == "true",
    setShowDetails
  }

  const [state, setState] = useState(initState)

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}
