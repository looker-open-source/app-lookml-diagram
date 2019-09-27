import * as React from "react"
import { ILookmlModelExplore, ILookmlModelExploreField } from "@looker/sdk"
import { groupBy, values, flatten, toPairs, orderBy } from "lodash"
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableDataCell
} from "looker-lens"
import { SQLSnippet } from "./SQLSnippet"
import styled from "styled-components"
import humanize from "humanize-string"
import { SettingsContextConsumer } from "./Settings"

interface ExploreFieldGridState {}

interface ExploreFieldGridProps {
  explore: ILookmlModelExplore
}

const GroupTableCell = styled(TableDataCell)`
  padding-right: 1rem;
`

const GroupTable = ({
  group,
  fields,
  showDetails
}: {
  group: string
  fields: ILookmlModelExploreField[]
  showDetails: boolean
}) => {
  return (
    <>
      {/* Don't want styles on this. */}
      <tr>
        <td colSpan={4}>
          <h3>{group}</h3>
        </td>
      </tr>
      <TableRow>
        <TableHeaderCell>Field</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        {showDetails && <TableHeaderCell>Implementation</TableHeaderCell>}
      </TableRow>
      {fields.map(field => {
        return (
          <TableRow key={field.name}>
            <GroupTableCell>{field.label_short}</GroupTableCell>
            <GroupTableCell>{field.description}</GroupTableCell>
            <GroupTableCell>{humanize(field.type)}</GroupTableCell>
            {showDetails && (
              <GroupTableCell>
                <SQLSnippet src={field.sql} />
              </GroupTableCell>
            )}
          </TableRow>
        )
      })}
    </>
  )
}

export default class ExploreFieldGrid extends React.Component<
  ExploreFieldGridProps,
  ExploreFieldGridState
> {
  render() {
    const groups = orderBy(
      toPairs(
        groupBy(
          flatten(values(this.props.explore.fields)).filter(f => !f.hidden),
          f => f.view_label
        )
      ),
      ([group]) => group
    )
    return (
      <Table>
        <TableBody>
          <SettingsContextConsumer>
            {settings =>
              groups.map(([group, fields]) => {
                return (
                  <GroupTable
                    fields={orderBy(fields, f => f.label_short)}
                    group={group}
                    showDetails={settings.showDetails}
                    key={group}
                  />
                )
              })
            }
          </SettingsContextConsumer>
        </TableBody>
      </Table>
    )
  }
}
