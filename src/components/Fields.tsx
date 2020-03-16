import React from "react";
import {
  theme,
  ButtonOutline,
  ButtonTransparent,
  Chip,
  Code,
  DrawerManager,
  Flex,
  FlexItem,
  Heading,
  ModalContent,
  Paragraph,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableDataCell,
  TableBody
} from "@looker/components";
import styled from "styled-components";

import humanize from 'humanize-string'
import {ILookmlModel, ILookmlModelExplore, ILookmlModelExploreField} from "@looker/sdk";
import {iColumnDescriptor} from "./interfaces";
import { ExternalLink } from "../extract-to-framework/ExtensionLink";
import { exploreFieldURL } from "../utils/urls";
import { canGetDistribution, canGetTopValues } from "../utils/queries";
import { QueryChart } from './QueryChart'
import {SQLSnippet} from "./SQLSnippet";


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

const FieldSet = styled.div`
  margin-bottom: 20px
`

export const Fields: React.FC<{
  columns: iColumnDescriptor[],
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
              if (!search || (field.label_short && field.label_short.toLowerCase().includes(search.toLowerCase())) || (field.description && field.description.toLowerCase().includes(search.toLowerCase()))) {
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
                                <TableRow>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    LookML Name
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
                                      {field.name}
                                    </Code>
                                  </TableDataCell>
                                </TableRow>
                                <TableRow>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    Category
                                  </TableDataCell>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    {field.category}
                                  </TableDataCell>
                                </TableRow>
                                <TableRow>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    Type
                                  </TableDataCell>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    {humanize(field.type)}
                                  </TableDataCell>
                                </TableRow>
                                <TableRow>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    SQL
                                  </TableDataCell>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    <Code
                                      color="palette.charcoal700"
                                      fontSize="small"
                                    >
                                      <SQLSnippet src={field.sql}/>
                                    </Code>
                                  </TableDataCell>
                                </TableRow>
                                <TableRow>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    Tags
                                  </TableDataCell>
                                  <TableDataCell
                                    color="palette.charcoal700"
                                    p="medium"
                                    pl="small"
                                    pr="small"
                                  >
                                    <Flex>
                                      {field.tags.map(tag => (
                                        <Chip disabled>{tag}</Chip>
                                      ))}
                                    </Flex>
                                  </TableDataCell>
                                </TableRow>
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
                              >
                                {/* This is heinous, sorry, I promise the value is there.
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
              }
            })}
          </TableBody>
        </Table>
      </Flex>
    </FieldSet>
  );
};
