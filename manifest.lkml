project_name: "app-lookml-diagram"

application: lookml-diagram {
  label: "LookML Diagram"
  url: "@{BUNDLE_URL}"
  new_window_external_urls: ["https://docs.looker.com/data-modeling/extension-framework/lookml-diagram"]
  entitlements: {
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

constant: BUNDLE_URL {
  value: "https://marketplace-api.looker.com/app-assets/lookml_diagram.js"
  export: override_optional
}
