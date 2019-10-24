import React, { useState } from "react"
import { MemoryRouter as Router, useLocation, Redirect } from "react-router-dom"
import {
  LookerExtensionSDK,
  ExtensionHostApi,
  connectExtensionHost
} from "bryns-extension-api"
import { LookerSDK } from "@looker/sdk/dist/sdk/methods"

export { LookerSDK }

interface ExtensionContextProps {}

export interface ExtensionContextData {
  extensionSDK: ExtensionHostApi
  coreSDK: LookerSDK
}

export const ExtensionContext = React.createContext<ExtensionContextData>(
  undefined as any // no one will ever see this undefined!
)
export const ExtensionWrapper: React.FC<ExtensionContextProps> = props => {
  const [pathname, setPathname] = useState("")
  const [initialRoute, setInitialRoute] = useState()
  const [hostInitialized, setHostInitialized] = useState(false)
  const [extensionData, setExtensionData] = React.useState<
    ExtensionContextData
  >()

  const initialized = () => {
    setHostInitialized(true)
  }

  React.useEffect(() => {
    connectExtensionHost({
      initializedCallback: initialized,
      restoreRoute: true,
      setInitialRoute
    })
      .then(extensionHost => {
        const ctx = {
          extensionSDK: extensionHost,
          coreSDK: LookerExtensionSDK.createClient(extensionHost)
        }
        setExtensionData(ctx)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      {hostInitialized && (
        <Router>
          <RouteChangeListener
            setPathname={setPathname}
            extensionHost={extensionData!.extensionSDK}
          />
          <ExtensionContext.Provider value={extensionData!}>
            {props.children}
          </ExtensionContext.Provider>
        </Router>
      )}
    </>
  )
}

interface RouteChangeListenerProps {
  setPathname: (pathname: string) => void
  extensionHost: ExtensionHostApi
}

const RouteChangeListener: React.FC<RouteChangeListenerProps> = ({
  setPathname,
  extensionHost
}) => {
  let location = useLocation()
  React.useEffect(() => {
    setPathname(location.pathname)
    extensionHost.clientRouteChanged(location.pathname)
  }, [location])
  return <></>
}
