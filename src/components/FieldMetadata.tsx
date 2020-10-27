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

import React, {useEffect} from "react";
import {
  theme,
  ButtonTransparent,
  Flex,
  FlexItem,
  Heading,
  DialogContent,
  Paragraph,
  Table,
  TableBody,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Text,
} from "@looker/components";

import {ILookmlModel, ILookmlModelExplore, ILookmlModelExploreField, IUser } from "@looker/sdk";
import { ColumnDescriptor, FieldComments, CommentPermissions } from "./interfaces";
import { ExternalLink } from "./ExternalLink";
import { exploreFieldURL } from "../utils/urls";
import { canGetDistribution, canGetTopValues } from "../utils/queries";
import { QueryChart } from './QueryChart'
import { DetailDrawerRow } from "./DetailDrawerRow";
import { FieldCommentList } from "./FieldCommentList";

export const FieldMetadata: React.FC<{
  columns: ColumnDescriptor[],
  explore: ILookmlModelExplore,
  model: ILookmlModel,
  field: ILookmlModelExploreField,
  tab: number,
  detailsPane: (tabIndex: number) => void,
  commentsPane: (tabIndex: number) => void,
  sortedComments: FieldComments[],
  addComment: (newCommentStr: string, field: string) => void,
  editComment: (newCommentStr: string, field: string) => void,
  deleteComment: (newCommentStr: string, field: string) => void,
  fieldCommentLength: number,
  commentAuthors: IUser[],
  me: IUser,
  permissions: CommentPermissions,
  canViewComments: boolean,
}> = ({ columns, 
        explore, 
        field, 
        model, 
        tab, 
        detailsPane,
        commentsPane, 
        sortedComments, 
        addComment,
        editComment,
        deleteComment,
        fieldCommentLength,
        commentAuthors,
        me,
        permissions,
        canViewComments,
    }) => {
      return (<DialogContent>
        <FlexItem>
        <Heading as="h3" fontWeight="semiBold" pb="small">
            {field.label_short}
        </Heading>
        <Tabs index={tab} onChange={tab ? detailsPane : commentsPane} >
        <TabList distribute>
          <Tab>Details</Tab>
          {canViewComments ? <Tab>Comments{ fieldCommentLength > 0 && ` (${fieldCommentLength})` }</Tab> : <></>}
        </TabList>
        <TabPanels>
          <TabPanel>
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
                      if (column.rowValueDescriptor !== 'comment' && column.rowValueDescriptor !== 'description') {
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
              <QueryChart
              disabledText={'Distributions can only be shown for numeric dimensions on a view with a count measure.'}
              enabled={canGetDistribution({model, explore, field})}
              type={{
                  type: "Distribution",
                  model,
                  explore,
                  field
              }}
              />
              <QueryChart
              disabledText={'Values can only be shown for dimensions on a view with a count measure.'}
              enabled={canGetTopValues({ model, explore, field })}
              type={{
                  type: "Values",
                  model,
                  explore,
                  field
              }}
              />
              <FlexItem
              borderTop={`1px solid ${
                  theme.colors.ui3
                  }`}
              pt="small"
              mb="xlarge"
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
          </TabPanel>
          {canViewComments ? <TabPanel>
            <FieldCommentList 
              sortedComments={sortedComments}
              addComment={addComment}
              editComment={editComment}
              deleteComment={deleteComment}
              explore={explore}
              field={field}
              commentAuthors={commentAuthors}
              me={me}
              permissions={permissions}
            />
          </TabPanel> : <></>}
        </TabPanels>
        </Tabs>
      </FlexItem></DialogContent>
      );
};
