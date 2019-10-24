import React from "react"
import { ILookmlModelExploreJoins } from "@looker/sdk/dist/sdk/models"
import { PageDetail } from "../components-generalized/Page"
import {
  MetadataItem,
  MetadataList
} from "../components-generalized/MetadataList"
import { FieldName } from "./ExploreFieldGrid"
import { SQLSnippet } from "./SQLSnippet"

interface JoinDetailProps {
  join: ILookmlModelExploreJoins
  onClose: () => void
}

export const JoinDetail: React.FC<JoinDetailProps> = ({ join, onClose }) => {
  console.log(join)
  return (
    <PageDetail title={join.name} onClose={onClose}>
      <MetadataList>
        <MetadataItem label="LookML Name">
          <FieldName>{join.name}</FieldName>
        </MetadataItem>
        <MetadataItem label="Join SQL">
          <SQLSnippet src={join.sql_on} />
        </MetadataItem>
      </MetadataList>
    </PageDetail>
  )
}
