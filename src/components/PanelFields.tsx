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

import React, { useState, SyntheticEvent } from "react"
import { Fields } from "./Fields"
import {
  Box,
  ButtonOutline,
  Flex,
  FlexItem,
  Heading,
  InputSearch,
  Paragraph,
  Spinner,
  theme
} from "@looker/components"
import { ViewOptions } from "./ViewOptions"
import styled from "styled-components"
import groupBy from "lodash/groupBy"
import values from "lodash/values"
import flatten from "lodash/flatten"
import toPairs from "lodash/toPairs"
import orderBy from "lodash/orderBy"
import { ExternalLink } from "./ExternalLink"
import { exploreURL } from "../utils/urls"
import { ColumnDescriptor, CommentPermissions } from "./interfaces"
import {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField,
  IUser
} from "@looker/sdk"
import { QuickSearch } from "./QuickSearch"
import humanize from "humanize-string"
import { DIMENSION, MEASURE } from "./CategorizedLabel"

export const Main = styled(Box as any)`
  position: relative;
  width: 100%;
  min-height: 93vh;
`

const FullPage = styled(Box as any)`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 93vh;
  flex-direction: column;
`

const IntroText = styled(Paragraph as any)`
  text-align: center;
  margin-top: 5em;
  max-width: 40%;
  color: ${theme.colors.text1};
`

export const ExploreSearch = styled(InputSearch as any)`
  margin-top: 0;
`

export const defaultShowColumns = [
  "label_short",
  "description",
  "name",
  "type",
  "sql"
]

export const PanelFields: React.FC<{
  columns: ColumnDescriptor[]
  currentExplore: ILookmlModelExplore | null
  currentModel: ILookmlModel | null
  loadingExplore: string
  model: ILookmlModel
  comments: string
  addComment: (newCommentStr: string, field: string) => void
  editComment: (newCommentStr: string, field: string) => void
  deleteComment: (newCommentStr: string, field: string) => void
  authors: IUser[]
  me: IUser
  permissions: CommentPermissions
}> = ({
  columns,
  currentExplore,
  currentModel,
  loadingExplore,
  model,
  comments,
  addComment,
  editComment,
  deleteComment,
  authors,
  me,
  permissions
}) => {
  const [search, setSearch] = useState("")
  const [shownColumns, setShownColumns] = useState([
    ...columns
      .filter(d => {
        return d.default
      })
      .map(d => d.rowValueDescriptor)
  ])
  const [hasDescription, setHasDescription] = useState([])
  const [hasTags, setHasTags] = useState([])
  const [hasComments, setHasComments] = useState([])
  const [fieldTypes, setFieldTypes] = useState([])
  const [selectedFields, setSelectedFields] = useState([])

  const typeMaker = (field: ILookmlModelExploreField) => {
    return humanize(field.type.split("_")[0])
  }

  if (loadingExplore) {
    return (
      <Main p="xxlarge">
        <Flex alignItems="center" height="100%" justifyContent="center">
          <Spinner />
        </Flex>
      </Main>
    )
  }

  if (
    currentModel &&
    currentExplore &&
    currentModel.name === currentExplore.model_name
  ) {
    const fields = flatten(values(currentExplore.fields))
      .map(f => typeMaker(f))
      .filter((value, index, self) => self.indexOf(value) === index)

    const revivedComments = JSON.parse(comments)
    const encExplores = Object.keys(revivedComments)
    const commentObj = encExplores.includes(currentExplore.name)
      ? revivedComments[currentExplore.name]
      : (revivedComments[currentExplore.name] = {})

    const allFilters = hasDescription.concat(
      hasTags,
      hasComments,
      fieldTypes,
      selectedFields
    )
    const groups = orderBy(
      toPairs(
        groupBy(
          flatten(values(currentExplore.fields)).filter(f => {
            const commentFlag = !!(
              commentObj[f.name] && commentObj[f.name].length > 0
            )
            return (
              !f.hidden &&
              (allFilters.length === 0 ||
                ((hasDescription.length === 0 ||
                  (hasDescription.includes("yes") && f.description) ||
                  (hasDescription.includes("no") && !f.description)) &&
                  (hasTags.length === 0 ||
                    (hasTags.includes("yes") && f.tags.length > 0) ||
                    (hasTags.includes("no") && f.tags.length === 0)) &&
                  (hasComments.length === 0 ||
                    (hasComments.includes("yes") && commentFlag) ||
                    (hasComments.includes("no") && !commentFlag)) &&
                  (fieldTypes.length === 0 ||
                    (fieldTypes.includes("dimensions") &&
                      f.category === DIMENSION) ||
                    (fieldTypes.includes("measures") &&
                      f.category === MEASURE)) &&
                  (selectedFields.length === 0 ||
                    selectedFields.includes(typeMaker(f)))))
            )
          }),
          f => f.view_label
        )
      ),
      ([group]) => group
    )

    return (
      <Main pt="large">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          mt="large"
          mb="xxlarge"
          pl="xxlarge"
          pr="xxlarge"
        >
          <FlexItem>
            <Heading as="h1" fontWeight="semiBold">
              {currentModel.label}
            </Heading>
            <Heading as="h4" variant="secondary">
              Select a field for more information.
            </Heading>
          </FlexItem>
          <FlexItem>
            <ExternalLink target="_blank" href={exploreURL(currentExplore)}>
              <ButtonOutline mr="small">Explore</ButtonOutline>
            </ExternalLink>
            <ViewOptions
              columns={columns.filter(d => {
                return d.rowValueDescriptor !== "comment"
              })}
              shownColumns={shownColumns}
              setShownColumns={setShownColumns}
            />
          </FlexItem>
        </Flex>
        <Flex mt="xlarge" pl="xxlarge" pr="xxlarge">
          <FlexItem width="350px">
            <ExploreSearch
              hideSearchIcon
              placeholder="Filter fields in this Explore"
              mt="medium"
              onChange={(e: SyntheticEvent) => {
                const target = e.target as HTMLInputElement
                setSearch(target.value)}}
              value={search}
            />
          </FlexItem>
        </Flex>

        <QuickSearch
          selectedFields={selectedFields}
          fields={fields}
          fieldTypes={fieldTypes}
          hasDescription={hasDescription}
          hasTags={hasTags}
          hasComments={hasComments}
          setSelectedFields={setSelectedFields}
          setFieldTypes={setFieldTypes}
          setHasDescription={setHasDescription}
          setHasTags={setHasTags}
          setHasComments={setHasComments}
          showComments={!permissions.disabled}
        />

        <Box>
          {groups.map(group => {
            if (group[1].length > 0) {
              return (
                <Fields
                  columns={columns}
                  explore={currentExplore}
                  fields={group[1]}
                  key={group[0]}
                  label={group[0]}
                  model={model}
                  search={search}
                  shownColumns={shownColumns}
                  comments={comments}
                  addComment={addComment}
                  editComment={editComment}
                  deleteComment={deleteComment}
                  authors={authors}
                  me={me}
                  permissions={permissions}
                />
              )
            }
          })}
        </Box>
      </Main>
    )
  } else {
    return (
      <FullPage>
        <div style={{ width: "30%" }}>
          <img
            src={
              "https://marketplace-api.looker.com/app-assets/data_dictionary_2x.png"
            }
            alt="Empty Image"
          />
        </div>
        <IntroText>
          Click on one of the Explores to the left to begin searching through
          your data. You’ll see labels, descriptions, SQL definitions, and more
          for each field.
        </IntroText>
      </FullPage>
    )
  }
}
