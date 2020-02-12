# Data Dictionary Extension

- Before `yarn install` you may need to copy your `.npmrc` from helltool
  so you can install from Nexus.

This is a template for a React and TypeScript extension.

# Usage

- Install dependencies with Yarn: `yarn install`
- To run a development server: `yarn start`

  In manifest for a LookML project on your local helltool instance:

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
