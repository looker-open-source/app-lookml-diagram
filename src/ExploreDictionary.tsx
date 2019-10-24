import * as React from "react"
import ExploreDictionaryView from "./ExploreDictionaryView"
import PlainPageLoading from "./PlainPageLoading"
import { useCurrentExplore, useCurrentModel } from "./routes"

export const ExploreDictionary: React.FC = props => {
  const currentModel = useCurrentModel()
  const currentExplore = useCurrentExplore()
  if (currentExplore && currentModel) {
    return (
      <ExploreDictionaryView explore={currentExplore} model={currentModel} />
    )
  } else {
    return <PlainPageLoading />
  }
}
