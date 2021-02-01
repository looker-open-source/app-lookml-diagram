project_name: "app-lookml-diagram"

application: lookml-diagram-df {
  label: "LookML Diagram"
  url: "https://marketplace-api.looker.com/staging/app-assets/lookml_diagram_df.js"
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    core_api_methods: ["run_inline_query", "lookml_model_explore", "all_lookml_models", "all_users", "me", "search_groups"]
  }
}

constant: CONNECTION_NAME {
  value: "choose-connection"
  export: override_required
}
