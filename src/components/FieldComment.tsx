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

import React, { SyntheticEvent } from "react"
import {
  ButtonOutline,
  Button,
  FlexItem,
  FieldTextArea,
  useConfirm,
  Space
} from "@looker/components"

import { IUser, ILookmlModelExploreField } from "@looker/sdk"
import { FieldComments, UserData, CommentPermissions } from "./interfaces"
import { NOT_EDITING_COMMENT } from "../utils/constants"
import { FieldCommentDisplay } from "./FieldCommentDisplay"

export const FieldComment: React.FC<{
  comment: FieldComments
  editingComment: string
  setEditingComment: (editingCommentPk: string) => void
  commentContent: string
  setCommentContent: (newCommentContent: string) => void
  editComment: (newCommentStr: string, field: string) => void
  deleteComment: (newCommentStr: string, field: string) => void
  field: ILookmlModelExploreField
  authorData: UserData
  me: IUser
  addingNew: boolean
  permissions: CommentPermissions
}> = ({
  comment,
  editingComment,
  setEditingComment,
  setCommentContent,
  editComment,
  deleteComment,
  field,
  commentContent,
  authorData,
  me,
  addingNew,
  permissions
}) => {
  const showDetails = () => {
    if (permissions.manager || (comment.author === me.id && !addingNew)) {
      return "show"
    }
    return "hide"
  }

  const toggleEdit = () => {
    editingComment === NOT_EDITING_COMMENT
      ? setEditingComment(comment.pk)
      : setEditingComment(NOT_EDITING_COMMENT)
  }

  const endEdit = () => {
    setEditingComment(NOT_EDITING_COMMENT)
  }

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement
    setCommentContent(target.value)
  }

  const addToComments = () => {
    const newComment = {
      author: comment.author,
      edited: true,
      timestamp: comment.timestamp,
      content: commentContent,
      pk: comment.pk
    }
    editComment(JSON.stringify(newComment), field.name)
    toggleEdit()
  }

  function deleteFromComments(close: any) {
    comment.deleted = true
    deleteComment(JSON.stringify(comment), field.name)
    close()
  }

  const [confirmationDialog, openDialog] = useConfirm({
    confirmLabel: "Delete",
    buttonColor: "critical",
    title: `Delete Comment?`,
    message:
      "Deleting this comment will permanently remove it. You cannot undo this later.",
    onConfirm: deleteFromComments
  })

  return (
    <FlexItem>
      {confirmationDialog}
      {editingComment && comment.pk === editingComment ? (
        <FlexItem>
          <FieldTextArea
            autoFocus
            onChange={handleChange}
            defaultValue={comment.content}
          />
          <Space pt="small" gap="xsmall" reverse>
            <Button size="medium" onClick={addToComments}>
              Save
            </Button>
            <ButtonOutline size="medium" color="neutral" onClick={endEdit}>
              Cancel
            </ButtonOutline>
          </Space>
        </FlexItem>
      ) : (
        <FieldCommentDisplay
          authorData={authorData}
          comment={comment}
          showDetails={showDetails}
          toggleEdit={toggleEdit}
          openDialog={openDialog}
        />
      )}
    </FlexItem>
  )
}
