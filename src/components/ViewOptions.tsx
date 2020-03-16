import React from "react";
import {
  ButtonOutline,
  FieldCheckbox,
  Popover,
  PopoverContent
} from "@looker/components";
import { iColumnDescriptor } from "./interfaces";

const checkChange = (setShownColumns: (newState: string[]) => void, shownColumns: string[], columnDesc: string) => {
  return (e: any) => {
    if (e.target.checked) {
      setShownColumns([...shownColumns, columnDesc])
    } else {
      setShownColumns(shownColumns.filter(x => x !== columnDesc))
    }
  }
}

export const ViewOptions: React.FC<{
  columns: iColumnDescriptor[],
  shownColumns: string[],
  setShownColumns: (newState: string[]) => void}
> = ({
  columns,
  shownColumns,
  setShownColumns
}) => {
  return (
    <Popover
      content={
        <PopoverContent p="xsmall" width="150px">
          { columns.map(column => {
            return (
              <FieldCheckbox
                name={column.name}
                label={column.label}
                labelFontSize="small"
                labelFontWeight="normal"
                alignLabel="right"
                onChange={checkChange(setShownColumns, shownColumns, column.rowValueDescriptor)}
                checked={shownColumns.includes(column.rowValueDescriptor)}
              />
            )
            })}
        </PopoverContent>
      }
    >
      {(onClick, ref, className) => (
        <ButtonOutline
          aria-haspopup="true"
          onClick={onClick}
          ref={ref}
          className={className}
        >
          View Options
        </ButtonOutline>
      )}
    </Popover>
  );
};
