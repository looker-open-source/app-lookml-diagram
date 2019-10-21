import { LookerSDK } from "@looker/sdk/dist/sdk/methods"

export const sdk = (): LookerSDK => {
  return (window as any).sdk
}
