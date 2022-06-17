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

import React from 'react'
import { shallow } from 'enzyme'
import JoinIcon from '../../components/DiagramFrame/MetadataPanel/JoinIcon'

describe('left outer <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="left_outer" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('inner <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="inner" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('full outer <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="full_outer" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('cross <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="cross" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})
