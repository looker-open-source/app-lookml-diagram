import * as React from "react"
import { ILookmlModelExplore, ILookmlModelExploreField } from "@looker/sdk"
import { groupBy, values, flatten, toPairs } from "lodash"
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableDataCell
} from "looker-lens"
import { SQLSnippet } from "./SQLSnippet"
import styled from "styled-components"

interface ExploreDictionaryViewState {}

interface ExploreDictionaryViewProps {
  explore: ILookmlModelExplore
}

const GroupTableCell = styled(TableDataCell)`
  padding-right: 1rem;
`

const GroupTable = ({
  group,
  fields
}: {
  group: string
  fields: ILookmlModelExploreField[]
}) => {
  return (
    <>
      <TableRow>
        <TableDataCell colSpan={4}>
          <h3>{group}</h3>
        </TableDataCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell>Field</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        <TableHeaderCell>Implementation</TableHeaderCell>
      </TableRow>
      {fields.map(field => {
        return (
          <TableRow key={field.name}>
            <GroupTableCell>{field.label_short}</GroupTableCell>
            <GroupTableCell>{field.description}</GroupTableCell>
            <GroupTableCell>{field.type}</GroupTableCell>
            <GroupTableCell>
              <SQLSnippet src={field.sql} />
            </GroupTableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default class ExploreDictionaryView extends React.Component<
  ExploreDictionaryViewProps,
  ExploreDictionaryViewState
> {
  render() {
    const groups = toPairs(
      groupBy(
        flatten(values(this.props.explore.fields)).filter(f => !f.hidden),
        f => f.view_label
      )
    )
    return (
      <>
        <h2>{this.props.explore.label}</h2>
        <Table>
          <TableBody>
            {groups.map(([group, fields]) => {
              return <GroupTable fields={fields} group={group} key={group} />
            })}
          </TableBody>
        </Table>
      </>
    )
  }
}
