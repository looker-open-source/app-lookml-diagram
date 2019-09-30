import * as React from "react"
import PlainPageLoading from "./PlainPageLoading"
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Box,
  Link
} from "looker-lens/dist"
import {
  getTopValues,
  QueryChartType,
  runChartQuery,
  ChartQueryResult
} from "./queries"
import { MetadataItem } from "./FieldDetail"
import styled from "styled-components"

interface QueryChartState {
  loading: boolean
  response?: ChartQueryResult
}

interface QueryChartProps {
  type: QueryChartType
}

const SpinnerBlock = styled(Spinner)`
  display: inline-block;
`

export class QueryChart extends React.Component<
  QueryChartProps,
  QueryChartState
> {
  constructor(props: QueryChartProps) {
    super(props)
    this.state = { loading: false }
    this.runQuery = this.runQuery.bind(this)
  }

  async runQuery() {
    this.setState({ loading: true })
    const response = await runChartQuery(this.props.type)
    this.setState({
      loading: false,
      response
    })
    console.log(response)
  }

  render() {
    if (this.state.loading) {
      return (
        <MetadataItem label={this.props.type.type} compact>
          <SpinnerBlock size={22} />
        </MetadataItem>
      )
    } else if (this.state.response) {
      return (
        <MetadataItem label={this.props.type.type}>
          <Box my="medium">
            <Table>
              <TableBody>
                {this.state.response.queryResponse.data.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableDataCell
                        key={j}
                        textAlign={this.state.response.queryResponse.align[j]}
                      >
                        {cell.l ? (
                          <Link href={cell.l} target="_blank">
                            {cell.v}
                          </Link>
                        ) : (
                          cell.v
                        )}
                      </TableDataCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </MetadataItem>
      )
    } else {
      return (
        <MetadataItem label={this.props.type.type} compact>
          <Button
            onClick={this.runQuery}
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
