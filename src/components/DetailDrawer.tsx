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
  theme,
  ButtonTransparent,
  DrawerManager,
  Flex,
  FlexItem,
  Heading,
  ModalContent,
  Paragraph,
  Table,
  TableRow,
  TableDataCell,
  TableBody
} from "@looker/components";
import styled from "styled-components";

import {ILookmlModel, ILookmlModelExplore, ILookmlModelExploreField} from "@looker/sdk";
import {ColumnDescriptor} from "./interfaces";
import { ExternalLink } from "./ExternalLink";
import { exploreFieldURL } from "../utils/urls";
import { canGetDistribution, canGetTopValues } from "../utils/queries";
import { QueryChart } from './QueryChart'
import { DetailDrawerRow } from "./DetailDrawerRow";


// Page Header
const TableRowCustom = styled(TableRow)`
  transition: background-color 0.3s ease;
  &.active,
  &:hover {
    background-color: ${theme.colors.palette.charcoal100};
  }

  td {
    word-break: break-word;
  }
  cursor: pointer;
`;

export const DetailDrawer: React.FC<{
  columns: ColumnDescriptor[],
  explore: ILookmlModelExplore,
  model: ILookmlModel,
  field: ILookmlModelExploreField,
  shownColumns: string[],
}> = ({ columns, explore, field, model, shownColumns }) => {
  return (
    <DrawerManager
      content={
        <ModalContent>
          <Heading as="h3" fontWeight="semiBold">
            {field.label_short}
          </Heading>
          <Flex flexDirection="column">
            { field.description &&
              <FlexItem pb="xlarge">
                <Paragraph>{field.description}</Paragraph>
              </FlexItem>
            }
            <FlexItem>
              <Heading
                as="h4"
                fontSize="small"
                fontWeight="semiBold"
                mb="small"
                style={{marginTop: '2em'}}
              >
                About this Field
              </Heading>
            </FlexItem>
            <FlexItem pb="xlarge">
              <Table width="100%">
                <TableBody fontSize="small">
                  { columns.map(column => {
                    if (column.rowValueDescriptor !== 'description') {
                      return (
                        <DetailDrawerRow
                          key={column.rowValueDescriptor}
                          column={column}
                          field={field}
                        />
                      )
                    }
                  })}
                </TableBody>
              </Table>
            </FlexItem>

            {canGetDistribution({
              model,
              explore,
              field
            }) && (
              <QueryChart
                type={{
                  type: "Distribution",
                  model,
                  explore,
                  field
                }}
              />
            )}

            {canGetTopValues({
              model,
              explore,
              field
            }) && (
              <QueryChart
                type={{
                  type: "Values",
                  model,
                  explore,
                  field
                }}
              />
            )}

            <FlexItem
              borderTop={`1px solid ${
                theme.colors.palette.charcoal200
                }`}
              pb="xlarge"
              pt="xlarge"
            >
              <Flex alignItems="center" justifyContent="center">
                <ExternalLink target="_blank" href={field.lookml_link}>
                  <ButtonTransparent
                    mr="small"
                    ml="small"
                    iconBefore="LogoRings"
                  >
                    Go to LookML
                  </ButtonTransparent>
                </ExternalLink>


                <ExternalLink target="_blank" href={exploreFieldURL(explore, field)}>
                  <ButtonTransparent
                    mr="small"
                    ml="small"
                    iconBefore="Explore"
                  >
                    Explore with Field
                  </ButtonTransparent>
                </ExternalLink>


              </Flex>
            </FlexItem>
          </Flex>
        </ModalContent>
      }
    >
      {onClick => (
        <TableRowCustom onClick={onClick}>
          { columns.map(column => {
            if (shownColumns.includes(column.rowValueDescriptor)) {
              return (
                <TableDataCell
                  color="palette.charcoal700"
                  p="medium"
                  pl="small"
                  key={column.rowValueDescriptor}
                  maxWidth={column.maxWidth}
                  minWidth={column.minWidth}
                >
                  {/*
                    // @ts-ignore */}
                  {column.formatter(field[column.rowValueDescriptor], true, field)}
                </TableDataCell>
              )
            }
          })}
        </TableRowCustom>
      )}
    </DrawerManager>
  );
};
