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

constant: CONNECTION_NAME {
  value: "choose-connection"
  export: override_required
}
