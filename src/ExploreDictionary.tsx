import * as React from "react"
import ExploreDictionaryView from "./ExploreDictionaryView"
import PlainPageLoading from "./PlainPageLoading"
import { ExtensionContext } from "./framework/ExtensionWrapper"
import {
  ILookmlModel,
  ILookmlModelNavExplore,
  ILookmlModelExplore
} from "@looker/sdk"
import { LookerSDK } from "./framework/ExtensionWrapper"

interface ExploreDictionaryState {
  loading: boolean
  explore?: ILookmlModelExplore
}

interface ExploreDictionaryProps {
  model: ILookmlModel
  explore: ILookmlModelNavExplore
}

const exploreCache = {}
const loadCachedExplore = async (
  sdk: LookerSDK,
  modelName: string,
  exploreName: string
) => {
  const key = `${modelName}|${exploreName}`
  if (exploreCache[key]) {
    return exploreCache[key]
  } else {
    const val = await sdk.ok(sdk.lookml_model_explore(modelName, exploreName))
    exploreCache[key] = val
    return val
  }
}

export class ExploreDictionary extends React.Component<
  ExploreDictionaryProps,
  ExploreDictionaryState
> {
  static contextType = ExtensionContext

  constructor(props: ExploreDictionaryProps) {
    super(props)

    this.state = { loading: true }
  }

  async loadExplore() {
    this.setState({ loading: true })
    this.setState({
      explore: await loadCachedExplore(
        this.context.coreSDK,
        this.props.model.name,
        this.props.explore.name
      ),
      loading: false
    })
  }

  componentDidMount() {
    this.loadExplore()
  }

  componentDidUpdate(prevProps: ExploreDictionaryProps) {
    if (
      this.props.model.name !== prevProps.model.name ||
      this.props.explore.name !== prevProps.explore.name
    ) {
      this.loadExplore()
    }
  }

  render() {
    if (this.state.loading) {
      return <PlainPageLoading />
    } else {
      return (
        <ExploreDictionaryView
          explore={this.state.explore}
          model={this.props.model}
        />
      )
    }
  }
}
