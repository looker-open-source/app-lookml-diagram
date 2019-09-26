import * as React from "react"
import ExploreList from "./ExploreList"
import PlainPageLoading from "./PlainPageLoading"
import { sdk } from "./sdk"
import { ILookmlModel, ILookmlModelNavExplore } from "@looker/sdk"
import { ExploreDictionary } from "./ExploreDictionary"

interface DataDictionaryState {
  loading: boolean
  models: ILookmlModel[]
  currentExplore?: { explore: ILookmlModelNavExplore; model: ILookmlModel }
}

export class DataDictionary extends React.Component<{}, DataDictionaryState> {
  constructor(props: {}) {
    super(props)

    this.state = { loading: true, models: [] }
  }

  async loadModels() {
    this.setState({
      models: await sdk.ok(sdk.all_lookml_models()),
      loading: false
    })
  }

  componentDidMount() {
    this.loadModels()
  }

  render() {
    if (this.state.loading) {
      return <PlainPageLoading />
    } else {
      return (
        <>
          <ExploreList
            models={this.state.models}
            onExploreSelected={(model, explore) =>
              this.setState({ currentExplore: { explore, model } })
            }
          />
          {this.state.currentExplore ? (
            <ExploreDictionary {...this.state.currentExplore} />
          ) : (
            <h3>Nothing Selected</h3>
          )}
        </>
      )
    }
  }
}
