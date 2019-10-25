import React from "react"
import { ExploreDictionaryView } from "./ExploreDictionaryView"
import PlainPageLoading from "../components-generalized/PlainPageLoading"
import { useCurrentExplore, useCurrentModel } from "../utils/routes"

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
