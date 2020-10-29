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

import React from "react"
import {
  ButtonOutline,
  Button,
  Flex,
  FlexItem,
  FieldTextArea,
  Space,
  Text
} from "@looker/components"

import {
  IUser,
  ILookmlModelExploreField,
  ILookmlModelExplore
} from "@looker/sdk"
import { UserData, FieldComments, CommentPermissions } from "./interfaces"
import { FieldComment } from "./FieldComment"
import { NOT_EDITING_COMMENT } from "../utils/constants"

export const FieldCommentList: React.FC<{
  sortedComments: FieldComments[]
  addComment: (newCommentStr: string, field: string) => void
  editComment: (newCommentStr: string, field: string) => void
  deleteComment: (newCommentStr: string, field: string) => void
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
  commentAuthors: IUser[]
  me: IUser
  permissions: CommentPermissions
}> = ({
  sortedComments,
  addComment,
  editComment,
  deleteComment,
  explore,
  field,
  commentAuthors,
  me,
  permissions
}) => {
  const [addingNew, setAddingNew] = React.useState(false)
  const [editingComment, setEditingComment] = React.useState("")
  const [commentContent, setCommentContent] = React.useState("")

  const toggleNew = () => {
    setAddingNew(!addingNew)
  }
  const handleChange = (e: any) => {
    setCommentContent(e.target.value)
  }
  const addToComments = () => {
    const generated_timestamp = Date.now()
    const comment = {
      author: me.id,
      timestamp: generated_timestamp,
      edited: false,
      content: commentContent,
      pk: `${generated_timestamp}::${me.id}`
    }
    addComment(JSON.stringify(comment), field.name)
    setAddingNew(false)
  }
  const getCommentAuthorData = (author_id: number) => {
    const commentAuthor =
      commentAuthors &&
      commentAuthors.filter(d => {
        return d.id === author_id
      })
    let authorData: UserData
    if (me.id === author_id) {
      authorData = {
        first_name: me.first_name,
        last_name: me.last_name,
        display_name: me.display_name,
        avatar_url: me.avatar_url
      }
    } else if (commentAuthor.length === 0) {
      authorData = {
        first_name: "Deleted",
        last_name: "User",
        display_name: "Deleted User",
        avatar_url: ""
      }
    } else {
      authorData = {
        avatar_url: commentAuthor[0].avatar_url,
        first_name: commentAuthor[0].first_name,
        last_name: commentAuthor[0].last_name,
        display_name: commentAuthor[0].display_name
      }
    }
    return authorData
  }

  return (
    <Flex flexDirection="column">
      {sortedComments.map((comment: FieldComments) => {
        return (
          <FlexItem pb="small">
            <FieldComment
              comment={comment}
              editingComment={editingComment}
              setEditingComment={setEditingComment}
              setCommentContent={setCommentContent}
              editComment={editComment}
              deleteComment={deleteComment}
              commentContent={commentContent}
              field={field}
              authorData={getCommentAuthorData(comment.author)}
              me={me}
              addingNew={addingNew}
              permissions={permissions}
            />
          </FlexItem>
        )
      })}
      {addingNew ? (
        <FlexItem pb="small">
          <FieldTextArea
            autoFocus
            onChange={handleChange}
            aria-label="NewCommentTextArea"
          />
          <Space pt="small" gap="xsmall" reverse>
            <Button size="medium" onClick={addToComments}>
              Comment
            </Button>
            <ButtonOutline size="medium" color="neutral" onClick={toggleNew}>
              Cancel
            </ButtonOutline>
          </Space>
        </FlexItem>
      ) : editingComment === NOT_EDITING_COMMENT && !permissions.reader ? (
        <Button fullWidth onClick={toggleNew}>
          Add Comment
        </Button>
      ) : null}
      <Text pt="small" fontSize="xsmall" variant="secondary">
        These comments are unique to fields in the Data Dictionary and are not
        saved to any LookML description.
      </Text>
    </Flex>
  )
}
