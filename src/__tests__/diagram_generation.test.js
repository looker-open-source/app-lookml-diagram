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
import {diagrams_universe_explore, diagrams_universe_dimensions} from "./test_data/diagrams_universe"
import {bigquery_block_explore, bigquery_block_dimensions} from "./test_data/bigquery_block"
import {generateExploreDiagram} from "../utils/LookmlDiagrammer"

const cases = [
  [
    database_simple_view_explore,
    database_simple_view_output,
    true,
    "all"
  ],
  [
    model_few_views_explore,
    model_few_views_output,
    true,
    "all"
  ],
  [
    github_commit_explore,
    github_commit_dimensions,
    true,
    "all"
  ],
  [
    github_pr_explore,
    github_pr_dimensions,
    false,
    "joined"
  ],
  [
    diagrams_gov_explore,
    diagrams_gov_dimensions,
    true,
    "all"
  ],
  [
    diagrams_universe_explore,
    diagrams_universe_dimensions,
    false,
    "all"
  ],
  [
    bigquery_block_explore,
    bigquery_block_dimensions,
    true,
    "all"
  ]
]

describe('Diagram generation', () => {
  test.each(cases)(
    'it can generate the expected diagram',
    (input, output, hiddenFields, fieldType) => {
      const inputExplore = JSON.parse(decodeURI(input))
      const generated = generateExploreDiagram(
        inputExplore,
        hiddenFields,
        fieldType
      )
      const testCase = JSON.parse(decodeURI(output))
      expect(generated).toEqual(testCase)
    }
  )
})
