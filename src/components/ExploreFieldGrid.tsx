import React, { useCallback, useMemo } from "react"
import {
  ILookmlModelExplore,
  ILookmlModelExploreField
} from "@looker/sdk/dist/sdk/models"
import groupBy from "lodash/groupBy"
import values from "lodash/values"
import flatten from "lodash/flatten"
import toPairs from "lodash/toPairs"
import orderBy from "lodash/orderBy"
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableDataCell,
  ListItem,
  List,
  Heading
} from "looker-lens"
import { SQLSnippet } from "./SQLSnippet"
import styled from "styled-components"
import humanize from "humanize-string"
import { SettingsContextConsumer } from "./Settings"
import { Tags } from "../components-generalized/Tags"

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
      {field.enumerations!.map(e => (
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

const GroupTable: React.FC<{
  group: string
  fields: ILookmlModelExploreField[]
  hiddenColumns: string[]
  setDetailField: (field: ILookmlModelExploreField) => void
  index: number
}> = ({ group, fields, hiddenColumns, setDetailField, index }) => {
  fields = useMemo(() => orderBy(fields, f => f.label_short), [fields])
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
          <Heading mb="small" mt={index === 0 ? "none" : "small"}>
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
              <GroupTableCell>{field.description}</GroupTableCell>
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

export const ExploreFieldGrid: React.FC<ExploreFieldGridProps> = props => {
  const fields = props.explore.fields
  const groups = useMemo(
    () =>
      orderBy(
        toPairs(
          groupBy(
            flatten(values(fields)).filter(f => !f.hidden),
            f => f.view_label
          )
        ),
        ([group]) => group
      ),
    [fields]
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
                  fields={fields}
                  group={group}
                  setDetailField={props.setDetailField}
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
