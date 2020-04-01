import React from "react";
import {
  Flex,
  FlexItem,
  Heading,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody
} from "@looker/components";
import styled from "styled-components";

import {ILookmlModel, ILookmlModelExplore, ILookmlModelExploreField} from "@looker/sdk";
import {ColumnDescriptor} from "./interfaces";
import { DetailDrawer } from "./DetailDrawer";


const FieldSet = styled.div`
  margin-bottom: 20px
`

export const Fields: React.FC<{
  columns: ColumnDescriptor[],
  explore: ILookmlModelExplore,
  label: String,
  model: ILookmlModel,
  fields: ILookmlModelExploreField[],
  search: string,
  shownColumns: string[],
}> = ({ columns, explore, label, fields, model, search, shownColumns }) => {
  return (
    <FieldSet>
      <Flex>
        <FlexItem>
        <Heading as="h2" fontWeight="semiBold">
          { label }
        </Heading>
      </FlexItem>
      </Flex>
      <Flex>
        <Table width="100%">
          <TableHead>
            <TableRow>
              { columns.map(column => {
                if (shownColumns.includes(column.rowValueDescriptor)) {
                  return (
                    <TableHeaderCell color="palette.charcoal900" pl="small" pr="medium">
                      { column.label }
                    </TableHeaderCell>
                  )
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody fontSize="small">
            {fields.map((field) => {
              if (!search ||
                  (field.label_short && field.label_short.toLowerCase().includes(search.toLowerCase())) ||
                  (field.description && field.description.toLowerCase().includes(search.toLowerCase()))) {
                return (
                  <DetailDrawer
                    field={field}
                    columns={columns}
                    explore={explore}
                    model={model}
                    shownColumns={shownColumns}
                  />
                )
              }
            })}
          </TableBody>
        </Table>
      </Flex>
    </FieldSet>
  );
};
