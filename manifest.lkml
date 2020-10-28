project_name: "app-data-dictionary"

application: data-dictionary {
  label: "Looker Data Dictionary"
  file: "dist/bundle.js"
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
