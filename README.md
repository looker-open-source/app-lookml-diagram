# Data Dictionary Extension

## Usage

- Install dependencies with Yarn: `yarn install`
- To run a development server: `yarn start`

  In manifest for a LookML project on your Looker instance:

  ```
  application: data-dictionary-dev {
    label: "Data Dictionary (dev)"
    uri: "https://localhost:8080/bundle.js"
  }
  ```
  
  And you will also need to add a dummy model to the project.
  
  ```
    connection: "thelook"
  ```

- To do a build: `yarn build` (You should commit the built file.)
