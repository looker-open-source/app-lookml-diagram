import * as React from "react"
import { ILookmlModelExplore, ILookmlModelExploreField } from "@looker/sdk"
import { groupBy, values, flatten, toPairs } from "lodash"
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableDataCell
} from "looker-lens"
import { SQLSnippet } from "./SQLSnippet"

interface ExploreDictionaryViewState {}

interface ExploreDictionaryViewProps {
  explore: ILookmlModelExplore
}

const GroupTable = ({
  group,
  fields
}: {
  group: string
  fields: ILookmlModelExploreField[]
}) => {
  return (
    <>
      <h2>{group}</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Field</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Implementation</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map(field => {
            return (
              <TableRow key={field.name}>
                <TableDataCell>{field.label_short}</TableDataCell>
                <TableDataCell>{field.type}</TableDataCell>
                <TableDataCell>{field.description}</TableDataCell>
                <TableDataCell>
                  <SQLSnippet src={field.sql} />
                </TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default class ExploreDictionaryView extends React.Component<
  ExploreDictionaryViewProps,
  ExploreDictionaryViewState
> {
  render() {
    const groups = toPairs(
      groupBy(flatten(values(this.props.explore.fields)), f => f.view_label)
    )
    return (
      <>
        <h1>{this.props.explore.label}</h1>
        {groups.map(([group, fields]) => {
          return <GroupTable fields={fields} group={group} />
        })}
      </>
    )
  }
}
