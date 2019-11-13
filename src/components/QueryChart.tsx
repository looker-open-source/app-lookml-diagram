import React from "react"
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Box,
  Text
} from "looker-lens/dist"
import { QueryChartType, runChartQuery, SimpleResult } from "../utils/queries"
import styled from "styled-components"
import { BarChart, Bar } from "recharts"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { ExternalLink } from "../extract-to-framework/ExtensionLink"
import { getCached } from "../utils/fetchers"
import { MetadataItem } from "../components-generalized/MetadataList"

interface QueryChartState {
  loading: boolean
  response?: SimpleResult
}

interface QueryChartProps {
  type: QueryChartType
}

const SpinnerBlock = styled(Spinner)`
  display: inline-block;
`

interface ProgressTableRowProps {
  progress: number
}

const ProgressTableRow = styled(TableRow)`
  background-image: linear-gradient(
    to right,
    #f5f6f7 0%,
    #f5f6f7 ${(props: ProgressTableRowProps) => props.progress * 100 - 0.001}%,
    transparent ${(props: ProgressTableRowProps) => props.progress * 100}%
  );
`

const PaddedCell = styled(TableDataCell)`
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
        this.context.coreSDK,
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
            <Text fontSize="small" variant="subdued">
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
              <Box my="medium">
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
            <Box my="medium">
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
                  <Button variant="transparent" size="xsmall">
                    Explore More
                  </Button>
                </ExternalLink>
              </Box>
            )}
          </MetadataItem>
        )
      }
    } else {
      return (
        <MetadataItem label={this.props.type.type} compact>
          <Button
            onClick={this.runQuery.bind(this)}
            iconBefore="CacheRefresh"
            variant="outline"
            size="xsmall"
          >
            Calculate
          </Button>
        </MetadataItem>
      )
    }
  }
}
