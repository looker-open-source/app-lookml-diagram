import React from "react"
import { Link, LinkProps } from "looker-lens"
import { ExtensionContext } from "./ExtensionWrapper"

export const ExtensionLink: React.FC<LinkProps> = props => {
  return (
    <ExtensionContext.Consumer>
      {context => {
        return (
          <Link
            onClick={(...args) => {
              context.extensionSDK.updateLocation(props.href)
              if (props.onClick) {
                props.onClick(...args)
              }
            }}
            {...props}
          />
        )
      }}
    </ExtensionContext.Consumer>
  )
}
