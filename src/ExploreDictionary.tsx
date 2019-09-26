import * as React from "react"
import ExploreDictionaryView from "./ExploreDictionaryView"
import PlainPageLoading from "./PlainPageLoading"
import { sdk } from "./sdk"
import {
  ILookmlModel,
  ILookmlModelNavExplore,
  ILookmlModelExplore
} from "@looker/sdk"

interface ExploreDictionaryState {
  loading: boolean
  explore?: ILookmlModelExplore
}

interface ExploreDictionaryProps {
  model: ILookmlModel
  explore: ILookmlModelNavExplore
}

export class ExploreDictionary extends React.Component<
  ExploreDictionaryProps,
  ExploreDictionaryState
> {
  constructor(props: ExploreDictionaryProps) {
    super(props)

    this.state = { loading: true }
  }

  async loadExplore() {
    this.setState({
      explore: await sdk.ok(
        sdk.lookml_model_explore(this.props.model.name, this.props.explore.name)
      ),
      loading: false
    })
  }

  componentDidMount() {
    this.loadExplore()
  }

  render() {
    if (this.state.loading) {
      return <PlainPageLoading />
    } else {
      return <ExploreDictionaryView explore={this.state.explore} />
    }
  }
}
