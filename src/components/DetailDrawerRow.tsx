import React from "react";
import {
  Code,
  TableRow,
  TableDataCell,
} from "@looker/components";

import { ILookmlModelExploreField } from "@looker/sdk";
import { ColumnDescriptor } from "./interfaces";

export const DetailDrawerRow: React.FC<{
  column: ColumnDescriptor,
  field: ILookmlModelExploreField,
}> = ({ column, field }) => {
  return (
    <TableRow key={column.rowValueDescriptor}>
      <TableDataCell
        color="palette.charcoal700"
        p="medium"
        pl="small"
        pr="small"
      >
        { column.label }
      </TableDataCell>
      <TableDataCell
        className="break"
        color="palette.charcoal700"
        p="medium"
        pl="small"
        pr="small"
      >
        <Code
          color="palette.charcoal700"
          fontSize="small"
          className="break"
        >
          {/* Sorry, I promise the value is there.
  // @ts-ignore */}
          {column.formatter(field[column.rowValueDescriptor])}
        </Code>
      </TableDataCell>
    </TableRow>
  )
};
