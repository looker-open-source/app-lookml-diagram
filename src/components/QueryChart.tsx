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
  Spinner,
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Box,
  Text,
  ButtonTransparent
} from "@looker/components"
import { QueryChartType, runChartQuery, SimpleResult } from "../utils/queries"
import styled from "styled-components"
import { BarChart, Bar } from "recharts"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { ExternalLink } from "./ExternalLink"
import { getCached } from "../utils/fetchers"
import { MetadataItem } from "./MetadataList"
import { QueryChartButton } from "./QueryChartButton"

interface QueryChartState {
  loading: boolean
  response?: SimpleResult
}

interface QueryChartProps {
  disabledText: string
  enabled: boolean
  type: QueryChartType
}

const SpinnerBlock = styled(Spinner as any)`
  display: inline-block;
`

interface ProgressTableRowProps {
  progress: number
}

const ProgressTableRow = styled(TableRow as any)`
  background-image: linear-gradient(
    to right,
    #f5f6f7 0%,
    #f5f6f7 ${(props: ProgressTableRowProps) => props.progress * 100 - 0.001}%,
    transparent ${(props: ProgressTableRowProps) => props.progress * 100}%
  );
`

const PaddedCell = styled(TableDataCell as any)`
  padding: 4px;
`

export class QueryChart extends React.Component<
  QueryChartProps,
  QueryChartState
> {
  static contextType = ExtensionContext

  constructor(props: QueryChartProps) {
    super(props)
    this.state = {
      loading: false,
      response: getCached(JSON.stringify(props.type))
    }
  }

  async runQuery() {
    this.setState({ loading: true })
    try {
      const response = await runChartQuery(
        this.context.core31SDK,
        this.props.type
      )
      this.setState({
        loading: false,
        response
      })
    } catch (e) {
      console.error(e)
      this.setState({
        loading: false,
        response: undefined
      })
    }
  }

  componentDidUpdate(prevProps: QueryChartProps) {
    if (JSON.stringify(this.props.type) !== JSON.stringify(prevProps.type)) {
      this.setState({
        response: getCached(JSON.stringify(this.props.type))
      })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <MetadataItem label={this.props.type.type} compact>
          <SpinnerBlock size={20} />
        </MetadataItem>
      )
    } else if (this.state.response) {
      if (this.state.response.data.length === 0) {
        return (
          <MetadataItem label={this.props.type.type} compact>
            <Text fontSize="small">
              No Data
            </Text>
          </MetadataItem>
        )
      } else {
        return (
          <MetadataItem
            label={this.props.type.type}
            aux={this.state.response.aux}
          >
            {this.state.response.histogram && (
              <Box>
                <BarChart
                  width={259}
                  height={40}
                  data={this.state.response.histogram.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Bar dataKey="value" fill="#0087e1" />
                </BarChart>
              </Box>
            )}
            <Box>
              <Table>
                <TableBody>
                  {this.state.response.data.map((row, i) => (
                    <ProgressTableRow
                      key={i}
                      progress={
                        row[1].n ? row[1].n / this.state.response.max[1] : 0
                      }
                    >
                      {row.map((cell, j) => (
                        <PaddedCell
                          key={j}
                          textAlign={this.state.response.align[j]}
                        >
                          {cell.l ? (
                            <ExternalLink target="_blank" href={cell.l}>
                              {cell.v}
                            </ExternalLink>
                          ) : (
                            cell.v
                          )}
                        </PaddedCell>
                      ))}
                    </ProgressTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            {this.state.response.moreLink && (
              <Box m="small" textAlign="center">
                <ExternalLink
                  target="_blank"
                  href={this.state.response.moreLink}
                >
                  <ButtonTransparent size="xsmall">
                    Explore More
                  </ButtonTransparent>
                </ExternalLink>
              </Box>
            )}
          </MetadataItem>
        )
      }
    } else {
      return (
        <QueryChartButton
          disabledText={this.props.disabledText}
          enabled={this.props.enabled}
          title={this.props.type.type}
          onClick={this.runQuery.bind(this)}
        />
      )
    }
  }
}
