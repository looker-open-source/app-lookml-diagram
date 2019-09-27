import React, { useState } from "react"

interface Settings {
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
}

const SettingsContext = React.createContext<Settings>({
  showDetails: false,
  setShowDetails: () => {}
})

export const SettingsContextConsumer = SettingsContext.Consumer

export const SettingsContextProvider = (props: { children: JSX.Element }) => {
  const setShowDetails = (showDetails: boolean) => {
    setState({ ...state, showDetails })
  }

  const initState = {
    showDetails: false,
    setShowDetails
  }

  const [state, setState] = useState(initState)

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}
