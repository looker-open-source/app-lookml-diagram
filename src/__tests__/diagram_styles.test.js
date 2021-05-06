import {getPkPath, isTableRowDimension, isTableRowMeasure, isTableRowBaseView, isTableRowView, isRounded} from "../d3-utils/table-helpers"

test('is pk', () => {
  expect(getPkPath({primary_key: true})).toEqual("M7 14a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2m5.65-4A5.99 5.99 0 007 6a6 6 0 00-6 6 6 6 0 006 6 5.99 5.99 0 005.65-4H17v4h4v-4h2v-4H12.65z")
})

test('is not pk', () => {
  expect(getPkPath({primary_key: false})).toEqual("")
})

test('is dimension', () => {
  expect(isTableRowDimension({category: "dimension"})).toEqual(true)
})

test('is measure', () => {
  expect(isTableRowMeasure({category: "measure"})).toEqual(true)
})

test('is baseview', () => {
  expect(isTableRowBaseView({category: "view", base: true})).toEqual(true)
})

test('is not baseview', () => {
  expect(isTableRowBaseView({category: "view", base: false})).toEqual(false)
})

test('is view', () => {
  expect(isTableRowView({category: "view", base: false})).toEqual(true)
})

test('is table top cap', () => {
  expect(isRounded(0, 100)).toEqual(true)
})

test('is not table top cap', () => {
  expect(isRounded(1, 100)).toEqual(false)
})

test('is table bottom cap', () => {
  expect(isRounded(99, 100)).toEqual(true)
})
