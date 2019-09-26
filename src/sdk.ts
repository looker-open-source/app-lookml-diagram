import { LookerBrowserSDK } from "@looker/sdk/dist/rtl/browserSdk"
import { DefaultSettings } from "@looker/sdk/dist/rtl/apiSettings"

export const csrfToken = () => {
  const doc: HTMLMetaElement | null = document.head.querySelector(
    "[name=csrf-token]"
  )
  return doc ? doc.content : ""
}

export const sdk = LookerBrowserSDK.createClient({
  ...DefaultSettings(),
  base_url: "/api/internal/core/3.1",
  headers: {
    "X-CSRF-TOKEN": csrfToken()
  }
})
