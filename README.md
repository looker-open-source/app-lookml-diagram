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

   ```sh
   yarn
   ```

   > You may need to update your Node version or use a [Node version manager](https://github.com/nvm-sh/nvm) to change your Node version.

4. Start the development server

   ```sh
   yarn develop
   ```

   The extension is now running and serving the JavaScript at http://localhost:8080/bundle.js.

5. Log in to Looker and create a new project.

   This is found either under:

   - **Develop** => **Manage LookML Projects** => **New LookML Project** (top menu bar).
   - **Develop** => **Projects** => **New LookML Project** (side bar).

   Select "Blank Project" as your "Starting Point" which will create a new project with no files.

6. Setup the manifest.

   Either drag the `manifest.lkml` file (found in the root of this repo) into Looker project, or create a `manifest.lkml` and copy the content. Change the `id`, `label`, or `url` as needed.

```lookml
project_name: "app-lookml-diagram"

application: lookml-diagram {
  label: "LookML Diagram"
  file: "dist/bundle.js"
  entitlements: {
    new_window_external_urls: ["https://docs.looker.com/data-modeling/extension-framework/lookml-diagram"]
    local_storage: yes
    navigation: yes
    new_window: yes
    core_api_methods: ["new_window_external_urls", "run_inline_query", "lookml_model_explore", "all_lookml_models", "all_users", "me", "search_groups", "git_branch", "all_git_branches", "update_git_branch"]
  }
}
```

7. Create a `model` LookML file in the project. By convention the name is the same as the project.

   - All content except the connection maybe removed.
   - Add a connection in this model.

8. Connect the project to Git by following the instructions on the screen.

9. Commit the changes and deploy your them to production through the Project UI.

10. Reload the page and click the `Browse` dropdown menu or `Applications` in the sidebar. You should see the extension in the list.
    - The extension will load the JavaScript from the `url` you provided in the `application` definition.

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
