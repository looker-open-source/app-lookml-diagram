/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React from "react";
import {
  Code,
  TableRow,
  TableDataCell,
  theme,
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
        color="text"
        p="medium"
        pl="small"
        pr="small"
      >
        { column.label }
      </TableDataCell>
      <TableDataCell
        className="break"
        color="text3"
        p="medium"
        pl="small"
        pr="small"
      >
        <Code
          color="text3"
          fontSize="small"
          className="break"
        >
          {/*
          // @ts-ignore */}
          {column.formatter(field[column.rowValueDescriptor], false, field)}
        </Code>
      </TableDataCell>
    </TableRow>
  )
};
