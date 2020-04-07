import React from "react"
import { Link, LinkProps } from "@looker/components"
import { ExtensionContext } from "@looker/extension-sdk-react"

export const ExternalLink: React.FC<Omit<LinkProps, "color">> = (props: any) => {
  return (
    <ExtensionContext.Consumer>
      {context => {
        return (
          <Link
            onClick={(...args) => {
              if (props.href) {
                context.extensionSDK.updateLocation(
                  props.href,
                  undefined,
                  props.target
                )
              }
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
