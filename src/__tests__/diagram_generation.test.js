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
import {database_simple_view_explore, database_simple_view_output} from "./test_data/diagrams_basic"
import {model_few_views_explore, model_few_views_output} from "./test_data/diagrams_polls"
import {github_commit_explore, github_commit_dimensions} from "./test_data/github_commit"
import {github_pr_explore, github_pr_dimensions} from "./test_data/github_pr"
import {diagrams_gov_explore, diagrams_gov_dimensions} from "./test_data/diagrams_gov"
import {generateExploreDiagram} from "../utils/LookmlDiagrammer"

test('lookml_diagrams::database_simple_view', () => {
  const inputExplore = JSON.parse(database_simple_view_explore)
  const generated = JSON.stringify(generateExploreDiagram(
    inputExplore,
    true,
    "all"
  ))
  const testCase = database_simple_view_output
  expect(generated).toEqual(testCase);
});

test('lookml_diagrams::model_few_views', () => {
  const inputExplore = JSON.parse(decodeURI(model_few_views_explore))
  const generated = generateExploreDiagram(
    inputExplore,
    true,
    "all"
  )
  const testCase = JSON.parse(decodeURI(model_few_views_output))
  expect(generated).toEqual(testCase)
});

test('github_block::commit', () => {
  const inputExplore = JSON.parse(decodeURI(github_commit_explore))
  const generated = generateExploreDiagram(
    inputExplore,
    true,
    "all"
  )
  const testCase = JSON.parse(decodeURI(github_commit_dimensions))
  expect(generated).toEqual(testCase)
});

test('github_block::pull_request', () => {
  const inputExplore = JSON.parse(decodeURI(github_pr_explore))
  const generated = generateExploreDiagram(
    inputExplore,
    false,
    "joined"
  )
  const testCase = JSON.parse(decodeURI(github_pr_dimensions))
  expect(generated).toEqual(testCase)
});

test('diagrams::us_government', () => {
  const inputExplore = JSON.parse(decodeURI(diagrams_gov_explore))
  const generated = generateExploreDiagram(
    inputExplore,
    true,
    "all"
  )
  const testCase = JSON.parse(decodeURI(diagrams_gov_dimensions))
  expect(generated).toEqual(testCase)
});
