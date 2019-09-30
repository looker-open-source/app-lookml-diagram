import * as React from "react"
import { ILookmlModelExplore, ILookmlModelExploreField } from "@looker/sdk"
import { groupBy, values, flatten, toPairs, orderBy } from "lodash"
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableDataCell,
  Box,
  ListItem,
  List,
  Heading
} from "looker-lens"
import { SQLSnippet } from "./SQLSnippet"
import styled from "styled-components"
import humanize from "humanize-string"
import { SettingsContextConsumer } from "./Settings"
import { Tags } from "./FieldDetail"

interface ExploreFieldGridState {}

interface ExploreFieldGridProps {
  explore: ILookmlModelExplore
  setDetailField: (field: ILookmlModelExploreField) => void
}

const GroupTableCell = styled(TableDataCell)`
  padding-right: 1rem;
`

export const Enumerations = ({
  field
}: {
  field: ILookmlModelExploreField
}) => {
  return (
    <List type="bullet">
      {field.enumerations.map(e => (
        <ListItem title={e.value} key={e.value}>
          {e.label}
        </ListItem>
      ))}
    </List>
  )
}

export const FieldName = styled.code`
  word-break: break-word;
`

const HoverableTableRow = styled(TableRow)`
  &:hover {
    background: #f5f5f5;
  }
`

const GroupTable = ({
  group,
  fields,
  hiddenColumns,
  setDetailField,
  index
}: {
  group: string
  fields: ILookmlModelExploreField[]
  hiddenColumns: string[]
  setDetailField: (field: ILookmlModelExploreField) => void
  index: number
}) => {
  const labelHidden = hiddenColumns.indexOf("label") !== -1
  const nameHidden = hiddenColumns.indexOf("name") !== -1
  const descriptionHidden = hiddenColumns.indexOf("description") !== -1
  const sqlHidden = hiddenColumns.indexOf("sql") !== -1
  const typeHidden = hiddenColumns.indexOf("type") !== -1
  const tagsHidden = hiddenColumns.indexOf("tags") !== -1
  return (
    <>
      {/* Don't want styles on this. */}
      <tr>
        <td colSpan={4}>
          <Heading mb="small" mt={index == 0 ? "none" : "small"}>
            {group}
          </Heading>
        </td>
      </tr>
      <TableRow>
        {!nameHidden && <TableHeaderCell>LookML Name</TableHeaderCell>}
        {!labelHidden && <TableHeaderCell>Field Label</TableHeaderCell>}
        {!descriptionHidden && <TableHeaderCell>Description</TableHeaderCell>}
        {!typeHidden && <TableHeaderCell>Type</TableHeaderCell>}
        {!sqlHidden && <TableHeaderCell>SQL</TableHeaderCell>}
        {!tagsHidden && <TableHeaderCell>Tags</TableHeaderCell>}
      </TableRow>
      {fields.map(field => {
        return (
          <HoverableTableRow
            key={field.name}
            onClick={() => setDetailField(field)}
          >
            {!nameHidden && (
              <GroupTableCell>
                <FieldName>{field.name}</FieldName>
              </GroupTableCell>
            )}
            {!labelHidden && (
              <GroupTableCell>{field.label_short}</GroupTableCell>
            )}
            {!descriptionHidden && (
              <GroupTableCell>
                {field.description}
                {field.enumerations && (
                  <Box>
                    <Enumerations field={field} />
                  </Box>
                )}
              </GroupTableCell>
            )}
            {!typeHidden && (
              <GroupTableCell>{humanize(field.type)}</GroupTableCell>
            )}
            {!sqlHidden && (
              <GroupTableCell>
                <SQLSnippet src={field.sql} />
              </GroupTableCell>
            )}
            {!tagsHidden && (
              <GroupTableCell>
                {field.tags && <Tags tags={field.tags} />}
              </GroupTableCell>
            )}
          </HoverableTableRow>
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
              groups.map(([group, fields], index) => {
                return (
                  <GroupTable
                    index={index}
                    fields={orderBy(fields, f => f.label_short)}
                    group={group}
                    setDetailField={this.props.setDetailField}
                    hiddenColumns={settings.hiddenColumns}
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
