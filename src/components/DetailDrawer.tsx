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
            <FlexItem pt="large" pb="xlarge">
              <Paragraph>{field.description}</Paragraph>
            </FlexItem>
            <FlexItem>
              <Heading
                as="h4"
                fontSize="small"
                fontWeight="semiBold"
                mb="small"
              >
                About this Field
              </Heading>
            </FlexItem>
            <FlexItem pb="xlarge">
              <Table width="100%">
                <TableBody fontSize="small">
                  { columns.map(column => {
                    return (
                      <DetailDrawerRow
                        key={column.rowValueDescriptor}
                        column={column}
                        field={field}
                      />
                    )
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
                >
                  {/* This is bad, sorry, I promise the value is there.
                    // @ts-ignore */}
                  {column.formatter(field[column.rowValueDescriptor])}
                </TableDataCell>
              )
            }
          })}
        </TableRowCustom>
      )}
    </DrawerManager>
  );
};
