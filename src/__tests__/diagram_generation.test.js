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
import {single_table_input, single_table_output} from "../test_data/single_table"
import {generateExploreDiagram} from "../utils/LookmlDiagrammer"
import {polls_all_fields} from "../test_data/polls_all_fields"
import {polls_all_fields_diagram} from "../test_data/polls_all_fields_diagram"
import campaign_default from "../test_data/campaign_default.json"
import campaign_default_diagram from "../test_data/campaign_default_diagram.json"
import covid_default from "../test_data/covid_default.json"
import covid_default_diagram from "../test_data/covid_default_diagram.json"
import ecmap_just_joins from "../test_data/ecmap_just_joins.json"
import ecmap_just_joins_diagram from "../test_data/ecmap_just_joins_diagram.json"

test('1 table 0 joins - results - default', () => {
  expect(JSON.stringify(generateExploreDiagram(
    single_table_input.explore,
    single_table_input.hiddenToggle,
    single_table_input.displayFieldType
  ))).toEqual(JSON.stringify(single_table_output));
});

test('7 tables 6 joins - polls - all fields', () => {
  expect(JSON.stringify(generateExploreDiagram(
    polls_all_fields.explore,
    polls_all_fields.hiddenToggle,
    polls_all_fields.displayFieldType
  ))).toEqual(JSON.stringify(polls_all_fields_diagram));
});

test('6 tables 5 joins - ecmap - just joins', () => {
  let diagram = generateExploreDiagram(
    ecmap_just_joins.explore,
    ecmap_just_joins.hiddenToggle,
    ecmap_just_joins.displayFieldType
  )
  expect(Object.keys(diagram.tableData).length).toEqual(Object.keys(ecmap_just_joins_diagram.tableData).length);
  expect(Object.keys(diagram.tableData)).toEqual(Object.keys(ecmap_just_joins_diagram.tableData));
  expect(JSON.stringify(diagram.joinData)).toEqual(JSON.stringify(ecmap_just_joins_diagram.joinData));
  expect(JSON.stringify(diagram.tableData["ecmap"])).toEqual(JSON.stringify(ecmap_just_joins_diagram.tableData["ecmap"]));
  expect(JSON.stringify(diagram.tableData["general_polls"])).toEqual(JSON.stringify(ecmap_just_joins_diagram.tableData["general_polls"]));
  expect(JSON.stringify(diagram.tableData["margins"])).toEqual(JSON.stringify(ecmap_just_joins_diagram.tableData["margins"]));
  expect(JSON.stringify(diagram.tableData["niskanen"].length)).toEqual(JSON.stringify(ecmap_just_joins_diagram.tableData["niskanen"].length));
});

test('26 tables 25 joins - campaign - default', () => {
  let diagram = generateExploreDiagram(
    campaign_default.explore,
    campaign_default.hiddenToggle,
    campaign_default.displayFieldType
  )
  expect(Object.keys(diagram.tableData).length).toEqual(Object.keys(campaign_default_diagram.tableData).length);
  expect(Object.keys(diagram.tableData)).toEqual(Object.keys(campaign_default_diagram.tableData));
  expect(JSON.stringify(diagram.joinData)).toEqual(JSON.stringify(campaign_default_diagram.joinData));
  expect(JSON.stringify(diagram.tableData["campaign"])).toEqual(JSON.stringify(campaign_default_diagram.tableData["campaign"]));
});

test('13 tables 12 joins - covid_combined - default', () => {
  let diagram = generateExploreDiagram(
    covid_default.explore,
    covid_default.hiddenToggle,
    covid_default.displayFieldType
  )
  expect(Object.keys(diagram.tableData).length).toEqual(Object.keys(covid_default_diagram.tableData).length);
  expect(Object.keys(diagram.tableData)).toEqual(Object.keys(covid_default_diagram.tableData));
  expect(JSON.stringify(diagram.joinData)).toEqual(JSON.stringify(covid_default_diagram.joinData));
  expect(JSON.stringify(diagram.tableData["covid_combined"])).toEqual(JSON.stringify(covid_default_diagram.tableData["covid_combined"]));
  expect(JSON.stringify(diagram.tableData["hospital_bed_summary"])).toEqual(JSON.stringify(covid_default_diagram.tableData["hospital_bed_summary"]));
  expect(JSON.stringify(diagram.tableData["fips_rank"])).toEqual(JSON.stringify(covid_default_diagram.tableData["fips_rank"]));
});
