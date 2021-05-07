# LookML Diagram Extension
Looker’s LookML Diagram extension provides an entity-relationship-diagram for the objects within your LookML model. With the LookML Diagram developers can:

- Visualize relationships between LookML objects within an explore
- Drill into metadata for explores, fields, and joins
- Simplify the diagram with the option to hide hidden fields or only show fields in joins
- Refresh the diagram to see the latest LookML

<img src="https://github.com/looker-open-source/app-lookml-diagram/blob/main/docs/lookml_diagram.gif?raw=true" alt="drawing" height="400"/>

## Getting Started for Development

1. Clone or download a copy of this repo to your development machine
2. Navigate (`cd`) to the template directory on your system
3. Install the dependencies with [Yarn](https://yarnpkg.com/).

    ```
    yarn
    ```

    > You may need to update your Node version or use a [Node version manager](https://github.com/nvm-sh/nvm) to change your Node version.
4.  Start the development server
    ```
    yarn start
    ```

    Great! Your extension is now running and serving the JavaScript at http://localhost:8080/bundle.js.

    > __Note well:__ The webpack development server also supports https. To use, add the parameter --https to the start command
    `"start": "webpack-dev-server --hot --disable-host-check --https"`
    Should you decide to use https, you should visit the bundle URL you are running as there will likely be a certificate warning. The development server runs with a self-signed SSL certificate, so you will need to accept this to allow your browser to connect to it.

    The default yarn start command runs with hot module replacement working. Some changes will cause a full reload of the extension iframe. When this happens the extension framework connection will break. You should see an error. You will need to do a full page reload of the outer page.

    To run without hot module replacement run `yarn start-no-hot`

5. Now log in to Looker and create a new project.

   This is found under __Develop__ => __Manage LookML Projects__ => __New LookML Project__.

   You'll want to select "Blank Project" as your "Starting Point". You'll now have a new project with no files.
6. In your copy of the extension tablet you have `manifest.lkml` file.

    You can either drag & upload this file into your Looker project, or create a `manifest.lkml` with the same content. Change the `id`, `label`, or `url` as needed.
```
application: lookml-diagram-dev {
  label: "LookML Diagram (dev)"
  url: "https://localhost:8080/bundle.js"
  entitlements: {
    new_window_external_urls: ["https://docs.looker.com/data-modeling/extension-framework/lookml-diagram"]
    local_storage: yes
    navigation: yes
    new_window: yes
    core_api_methods: ["new_window_external_urls", "run_inline_query", "lookml_model_explore", "all_lookml_models", "all_users", "me", "search_groups", "git_branch", "all_git_branches", "update_git_branch"]
  }
}
```

7. Create a `model` LookML file in your project. The name doesn't matter. The model and connection won't be used, and in the future this step may be eliminated.
    - Add a connection in this model. It can be any connection, it doesn't matter which.
    - [Configure the model you created](https://docs.looker.com/data-modeling/getting-started/create-projects#configuring_a_model) so that it has access to some connection.

8. Connect your new project to Git. You can do this multiple ways:
    - Create a new repository on GitHub or a similar service, and follow the instructions to [connect your project to Git](https://docs.looker.com/data-modeling/getting-started/setting-up-git-connection)
    - A simpler but less powerful approach is to set up git with the "Bare" repository option which does not require connecting to an external Git Service.

9.  Commit your changes and deploy your them to production through the Project UI.
10. Reload the page and click the `Browse` dropdown menu. You should see your extension in the list.
    - The extension will load the JavaScript from the `url` you provided in the `application` definition/
    - Reloading the extension page will bring in any new code changes from the extension template. (Webpack's hot reloading is not currently supported.)

## Styling the Lookml Diagram
The diagram is found in `./components/Diagram.tsx`. CSS classes are styled onto the surrounding SVG. These classes are defined as composable effects, added to individual elements by d3 on creation or during an event. Because the styles are applied using CSS classes, the number of d3 renders is cut down, and we can centralize the code describing them. 

The CSS styles make use of the diagram element structure to apply as intended. Generally, this structure is:
```
svg#diagram-svg
  g.diagram-area
    rect.clickable-background
    g.join-[join_name]
      path.join-path
      path.join-path-hover
      marker
        path
    g.table-[table_name]
      rect.table-background
      g.table-row-[field-name]
        path
        rect
        path.pk-icon
        text
      g.table-row-view
      g.table-row-base-view
      g.table-row-dimension
      g.table-row-measure
      g.table-row-selected
```
Learning this structure (and maintaining it during development) by using the Chrome DevTools "Element Inspector" on the Diagram is highly recommended. The styles applied by these classes have been further reduced to a set of hyperparameters found in `./utils/constants.ts`. These constants affect things like color, text decoration, padding, and spacing; values applied by CSS attributes, or used as starting values for diagram generation. Changing some make require modification to other variables in response: for example when changing TABLE_WIDTH, MAX_TEXT_LENGTH should be considered. 

Not everything that could be considered a "style" falls under the CSS sphere of influence. The join path logic can be found in `./d3-utils/joins.ts`, this file includes logic like line interpolation, tangle management, and arrowheads. The table logic can be found in `./d3-utils/tables.ts` and contains icon paths as well as functions which identify varies kinds of `table-row`. These functions should be modified for behavior such as selective row styling.

## Component Structure
![Please refer to `/docs/component_structure.png`](https://github.com/looker-open-source/app-lookml-diagram/blob/main/docs/component_structure.png?raw=true)

## Notes

- Webpack's hot reloading is not currently supported.
- Webpack's module splitting is not currently supported.
- The template uses Looker's component library and styled components. Neither of these libraries are required so you may remove and replace them with a component library of your own choice,

## Related Projects

- [Looker React extension template](https://github.com/looker-open-source/extension-template-react)
- [Looker React/Redux extension template ](https://github.com/looker-open-source/extension-template-redux)
- [Looker extension SDK](https://www.npmjs.com/package/@looker/extension-sdk)
- [Looker extension SDK for React](https://www.npmjs.com/package/@looker/extension-sdk-react)
- [Looker SDK](https://www.npmjs.com/package/@looker/sdk)
- [Looker Components](https://components.looker.com/)
- [Styled components](https://www.styled-components.com/docs)
