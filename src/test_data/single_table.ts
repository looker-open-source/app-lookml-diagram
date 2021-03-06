// https://app.dev.looker.com/extensions/mp-viz::dev_ext/models/2020-election-betting/explores/results
export const single_table_input: any = {
  "exploreFields": {
     "dimensions": [
        {
           "align": "right",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Biden",
           "label_from_parameter": null,
           "label_short": "Biden",
           "map_layer": null,
           "name": "results.biden",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "number",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Biden",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.biden",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=5",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.Biden ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "left",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": false,
           "label": "Results County",
           "label_from_parameter": null,
           "label_short": "County",
           "map_layer": null,
           "name": "results.county",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "string",
           "user_attribute_filter_types": [
              "string",
              "advanced_filter_string"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "County",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.county",
           "suggest_explore": "results",
           "suggestable": true,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=10",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.County ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "left",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": false,
           "label": "Results Estimated Votes In",
           "label_from_parameter": null,
           "label_short": "Estimated Votes In",
           "map_layer": null,
           "name": "results.estimated_votes_in",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "string",
           "user_attribute_filter_types": [
              "string",
              "advanced_filter_string"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Estimated Votes In",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.estimated_votes_in",
           "suggest_explore": "results",
           "suggestable": true,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=15",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.Estimated_Votes_in ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "right",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Jorgensen",
           "label_from_parameter": null,
           "label_short": "Jorgensen",
           "map_layer": null,
           "name": "results.jorgensen",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "number",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Jorgensen",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.jorgensen",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=20",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.Jorgensen ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "left",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": false,
           "label": "Results Pk",
           "label_from_parameter": null,
           "label_short": "Pk",
           "map_layer": null,
           "name": "results.pk",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "string",
           "user_attribute_filter_types": [
              "string",
              "advanced_filter_string"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Pk",
           "measure": false,
           "parameter": false,
           "primary_key": true,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.pk",
           "suggest_explore": "results",
           "suggestable": true,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=30",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "CONCAT(${county}, \" County,\", ${state}) ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "left",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": false,
           "label": "Results State",
           "label_from_parameter": null,
           "label_short": "State",
           "map_layer": null,
           "name": "results.state",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "string",
           "user_attribute_filter_types": [
              "string",
              "advanced_filter_string"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "State",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.state",
           "suggest_explore": "results",
           "suggestable": true,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=25",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.State ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "right",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Total",
           "label_from_parameter": null,
           "label_short": "Total",
           "map_layer": null,
           "name": "results.total",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "number",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Total",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.total",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=36",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.Total ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "right",
           "can_filter": true,
           "category": "dimension",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Trump",
           "label_from_parameter": null,
           "label_short": "Trump",
           "map_layer": null,
           "name": "results.trump",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "number",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Trump",
           "measure": false,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.trump",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=41",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${TABLE}.Trump ",
           "sql_case": null,
           "filters": null
        }
     ],
     "measures": [
        {
           "align": "right",
           "can_filter": true,
           "category": "measure",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Biden Votes",
           "label_from_parameter": null,
           "label_short": "Biden Votes",
           "map_layer": null,
           "name": "results.biden_votes",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "sum",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": "0",
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Biden Votes",
           "measure": true,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.biden_votes",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=51",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${biden} * ${total} ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "right",
           "can_filter": true,
           "category": "measure",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Count",
           "label_from_parameter": null,
           "label_short": "Count",
           "map_layer": null,
           "name": "results.count",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "count",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Count",
           "measure": true,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.count",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=46",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "results.count",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "right",
           "can_filter": true,
           "category": "measure",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Mov",
           "label_from_parameter": null,
           "label_short": "Mov",
           "map_layer": null,
           "name": "results.mov",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "number",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": null,
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Mov",
           "measure": true,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.mov",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=63",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${biden_votes} - ${trump_votes} ",
           "sql_case": null,
           "filters": null
        },
        {
           "align": "right",
           "can_filter": true,
           "category": "measure",
           "default_filter_value": null,
           "description": null,
           "enumerations": null,
           "field_group_label": null,
           "fill_style": null,
           "fiscal_month_offset": 0,
           "has_allowed_values": false,
           "hidden": false,
           "is_filter": false,
           "is_numeric": true,
           "label": "Results Trump Votes",
           "label_from_parameter": null,
           "label_short": "Trump Votes",
           "map_layer": null,
           "name": "results.trump_votes",
           "strict_value_format": false,
           "requires_refresh_on_sort": false,
           "sortable": true,
           "suggestions": null,
           "tags": [],
           "type": "sum",
           "user_attribute_filter_types": [
              "number",
              "advanced_filter_number"
           ],
           "value_format": "0",
           "view": "results",
           "view_label": "Results",
           "dynamic": false,
           "week_start_day": "monday",
           "dimension_group": null,
           "error": null,
           "field_group_variant": "Trump Votes",
           "measure": true,
           "parameter": false,
           "primary_key": false,
           "project_name": "2020-election-betting",
           "scope": "results",
           "suggest_dimension": "results.trump_votes",
           "suggest_explore": "results",
           "suggestable": false,
           "is_fiscal": false,
           "is_timeframe": false,
           "is_turtle": false,
           "can_turtle": false,
           "turtle_dimension": null,
           "can_time_filter": false,
           "time_interval": null,
           "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=57",
           "permanent": null,
           "source_file": "views/results.view.lkml",
           "source_file_path": "2020-election-betting/views/results.view.lkml",
           "sql": "${trump} * ${total} ",
           "sql_case": null,
           "filters": null
        }
     ],
     "filters": [],
     "parameters": []
  },
  "joins": [],
  "explore": {
     "id": "2020-election-betting::results",
     "name": "results",
     "description": null,
     "scopes": [
        "results"
     ],
     "can_total": true,
     "can_save": true,
     "can_explain": false,
     "can_pivot_in_db": true,
     "can_subtotal": true,
     "has_timezone_support": true,
     "supports_cost_estimate": true,
     "connection_name": "brick-layer",
     "null_sort_treatment": "low",
     "files": null,
     "source_file": "2020-election-betting.model.lkml",
     "model_name": "2020-election-betting",
     "view_name": "results",
     "hidden": false,
     "sql_table_name": "`spencer-white-tckt87992.2020electionbetting.results`\n     AS results",
     "access_filters": [],
     "aliases": [],
     "always_filter": [],
     "conditionally_filter": [],
     "index_fields": [],
     "sets": [
        {
           "name": "results",
           "value": [
              "results.biden",
              "results.county",
              "results.estimated_votes_in",
              "results.jorgensen",
              "results.state",
              "results.pk",
              "results.total",
              "results.trump",
              "results.count",
              "results.biden_votes",
              "results.trump_votes",
              "results.mov"
           ]
        },
        {
           "name": "ALL_FIELDS",
           "value": [
              "results.biden",
              "results.county",
              "results.estimated_votes_in",
              "results.jorgensen",
              "results.state",
              "results.pk",
              "results.total",
              "results.trump",
              "results.count",
              "results.biden_votes",
              "results.trump_votes",
              "results.mov"
           ]
        }
     ],
     "tags": [],
     "errors": null,
     "fields": {
        "dimensions": [
           {
              "align": "right",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Biden",
              "label_from_parameter": null,
              "label_short": "Biden",
              "map_layer": null,
              "name": "results.biden",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "number",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Biden",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.biden",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=5",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.Biden ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "left",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": false,
              "label": "Results County",
              "label_from_parameter": null,
              "label_short": "County",
              "map_layer": null,
              "name": "results.county",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "string",
              "user_attribute_filter_types": [
                 "string",
                 "advanced_filter_string"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "County",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.county",
              "suggest_explore": "results",
              "suggestable": true,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=10",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.County ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "left",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": false,
              "label": "Results Estimated Votes In",
              "label_from_parameter": null,
              "label_short": "Estimated Votes In",
              "map_layer": null,
              "name": "results.estimated_votes_in",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "string",
              "user_attribute_filter_types": [
                 "string",
                 "advanced_filter_string"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Estimated Votes In",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.estimated_votes_in",
              "suggest_explore": "results",
              "suggestable": true,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=15",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.Estimated_Votes_in ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "right",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Jorgensen",
              "label_from_parameter": null,
              "label_short": "Jorgensen",
              "map_layer": null,
              "name": "results.jorgensen",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "number",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Jorgensen",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.jorgensen",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=20",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.Jorgensen ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "left",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": false,
              "label": "Results Pk",
              "label_from_parameter": null,
              "label_short": "Pk",
              "map_layer": null,
              "name": "results.pk",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "string",
              "user_attribute_filter_types": [
                 "string",
                 "advanced_filter_string"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Pk",
              "measure": false,
              "parameter": false,
              "primary_key": true,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.pk",
              "suggest_explore": "results",
              "suggestable": true,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=30",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "CONCAT(${county}, \" County,\", ${state}) ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "left",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": false,
              "label": "Results State",
              "label_from_parameter": null,
              "label_short": "State",
              "map_layer": null,
              "name": "results.state",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "string",
              "user_attribute_filter_types": [
                 "string",
                 "advanced_filter_string"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "State",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.state",
              "suggest_explore": "results",
              "suggestable": true,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=25",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.State ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "right",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Total",
              "label_from_parameter": null,
              "label_short": "Total",
              "map_layer": null,
              "name": "results.total",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "number",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Total",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.total",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=36",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.Total ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "right",
              "can_filter": true,
              "category": "dimension",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Trump",
              "label_from_parameter": null,
              "label_short": "Trump",
              "map_layer": null,
              "name": "results.trump",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "number",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Trump",
              "measure": false,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.trump",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=41",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${TABLE}.Trump ",
              "sql_case": null,
              "filters": null
           }
        ],
        "measures": [
           {
              "align": "right",
              "can_filter": true,
              "category": "measure",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Biden Votes",
              "label_from_parameter": null,
              "label_short": "Biden Votes",
              "map_layer": null,
              "name": "results.biden_votes",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "sum",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": "0",
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Biden Votes",
              "measure": true,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.biden_votes",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=51",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${biden} * ${total} ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "right",
              "can_filter": true,
              "category": "measure",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Count",
              "label_from_parameter": null,
              "label_short": "Count",
              "map_layer": null,
              "name": "results.count",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "count",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Count",
              "measure": true,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.count",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=46",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "results.count",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "right",
              "can_filter": true,
              "category": "measure",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Mov",
              "label_from_parameter": null,
              "label_short": "Mov",
              "map_layer": null,
              "name": "results.mov",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "number",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": null,
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Mov",
              "measure": true,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.mov",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=63",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${biden_votes} - ${trump_votes} ",
              "sql_case": null,
              "filters": null
           },
           {
              "align": "right",
              "can_filter": true,
              "category": "measure",
              "default_filter_value": null,
              "description": null,
              "enumerations": null,
              "field_group_label": null,
              "fill_style": null,
              "fiscal_month_offset": 0,
              "has_allowed_values": false,
              "hidden": false,
              "is_filter": false,
              "is_numeric": true,
              "label": "Results Trump Votes",
              "label_from_parameter": null,
              "label_short": "Trump Votes",
              "map_layer": null,
              "name": "results.trump_votes",
              "strict_value_format": false,
              "requires_refresh_on_sort": false,
              "sortable": true,
              "suggestions": null,
              "tags": [],
              "type": "sum",
              "user_attribute_filter_types": [
                 "number",
                 "advanced_filter_number"
              ],
              "value_format": "0",
              "view": "results",
              "view_label": "Results",
              "dynamic": false,
              "week_start_day": "monday",
              "dimension_group": null,
              "error": null,
              "field_group_variant": "Trump Votes",
              "measure": true,
              "parameter": false,
              "primary_key": false,
              "project_name": "2020-election-betting",
              "scope": "results",
              "suggest_dimension": "results.trump_votes",
              "suggest_explore": "results",
              "suggestable": false,
              "is_fiscal": false,
              "is_timeframe": false,
              "is_turtle": false,
              "can_turtle": false,
              "turtle_dimension": null,
              "can_time_filter": false,
              "time_interval": null,
              "lookml_link": "/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=57",
              "permanent": null,
              "source_file": "views/results.view.lkml",
              "source_file_path": "2020-election-betting/views/results.view.lkml",
              "sql": "${trump} * ${total} ",
              "sql_case": null,
              "filters": null
           }
        ],
        "filters": [],
        "parameters": []
     },
     "joins": [],
     "group_label": "Census Data Block",
     "supported_measure_types": [
        {
           "dimension_type": "number",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "distance",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "string",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "unquoted",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "yesno",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "location",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "location_bin_level",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "zipcode",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "time",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "turtle_look",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_date",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_day_of_year",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_day_of_month",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_day_of_week",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "date_day_of_week_index",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_hour",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_hour_of_day",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_minute",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_month",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_month_num",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_month_number",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_fiscal_month_num",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_fiscal_month_number",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_month_name",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "date_mweek",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_quarter",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_fiscal_quarter",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_quarter_of_year",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "date_fiscal_quarter_of_year",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "date_raw",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "datetime",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_time",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_second",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_microsecond",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_time_of_day",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        },
        {
           "dimension_type": "date_week",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_week_of_year",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "date_hour2",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_hour3",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_hour4",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_hour6",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_hour8",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_hour12",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute2",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute3",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute4",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute5",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute6",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute10",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute12",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute15",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute20",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_minute30",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond2",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond4",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond5",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond8",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond10",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond20",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond25",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond40",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond50",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond100",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond125",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond200",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond250",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_millisecond500",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_year",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "date_fiscal_year",
           "measure_types": [
              "count_distinct"
           ]
        },
        {
           "dimension_type": "duration",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_year",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_quarter",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_month",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_week",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_day",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_hour",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_minute",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "duration_second",
           "measure_types": [
              "count_distinct",
              "sum",
              "average",
              "min",
              "max",
              "median"
           ]
        },
        {
           "dimension_type": "tier",
           "measure_types": [
              "count_distinct",
              "list"
           ]
        }
     ],
     "label": "Results",
     "project_name": "2020-election-betting",
     "title": "Results",
     "can_develop": true,
     "can_see_lookml": true,
     "lookml_link": "/projects/2020-election-betting/files/2020-election-betting.model.lkml?line=67",
     "access_filter_fields": null,
     "turtle_looks": [],
     "frequent": [
        "results.count",
        "results.state",
        "results.trump_votes",
        "results.biden_votes",
        "bin",
        "results.pk",
        "results.county",
        "results.total",
        "provided_average",
        "provided_max",
        "provided_min",
        "results.state_join",
        "count",
        "average",
        "max",
        "min",
        "results.trump_pct",
        "results.biden_pct",
        "provided_count",
        "results.jorgensen"
     ]
  },
  "hiddenToggle": true,
  "displayFieldType": "all"
}

export const single_table_output: any = {"joinData":[],"yOrderLookup":{"0":["results"]},"tableData":{"results":[{"category":"view","view":"results","name":"results","base":true,"diagramX":0,"diagramY":190,"fieldTypeIndex":0,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Biden","label_from_parameter":null,"label_short":"Biden","map_layer":null,"name":"results.biden","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"number","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Biden","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.biden","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=5","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.Biden ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":0,"diagramDegree":0,"verticalIndex":1},{"align":"left","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":false,"label":"Results County","label_from_parameter":null,"label_short":"County","map_layer":null,"name":"results.county","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"string","user_attribute_filter_types":["string","advanced_filter_string"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"County","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.county","suggest_explore":"results","suggestable":true,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=10","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.County ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":1,"diagramDegree":0,"verticalIndex":1},{"align":"left","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":false,"label":"Results Estimated Votes In","label_from_parameter":null,"label_short":"Estimated Votes In","map_layer":null,"name":"results.estimated_votes_in","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"string","user_attribute_filter_types":["string","advanced_filter_string"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Estimated Votes In","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.estimated_votes_in","suggest_explore":"results","suggestable":true,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=15","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.Estimated_Votes_in ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":2,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Jorgensen","label_from_parameter":null,"label_short":"Jorgensen","map_layer":null,"name":"results.jorgensen","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"number","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Jorgensen","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.jorgensen","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=20","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.Jorgensen ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":3,"diagramDegree":0,"verticalIndex":1},{"align":"left","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":false,"label":"Results Pk","label_from_parameter":null,"label_short":"Pk","map_layer":null,"name":"results.pk","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"string","user_attribute_filter_types":["string","advanced_filter_string"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Pk","measure":false,"parameter":false,"primary_key":true,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.pk","suggest_explore":"results","suggestable":true,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=30","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"CONCAT(${county}, \" County,\", ${state}) ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":4,"diagramDegree":0,"verticalIndex":1},{"align":"left","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":false,"label":"Results State","label_from_parameter":null,"label_short":"State","map_layer":null,"name":"results.state","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"string","user_attribute_filter_types":["string","advanced_filter_string"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"State","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.state","suggest_explore":"results","suggestable":true,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=25","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.State ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":5,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Total","label_from_parameter":null,"label_short":"Total","map_layer":null,"name":"results.total","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"number","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Total","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.total","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=36","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.Total ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":6,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"dimension","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Trump","label_from_parameter":null,"label_short":"Trump","map_layer":null,"name":"results.trump","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"number","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Trump","measure":false,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.trump","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=41","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${TABLE}.Trump ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":7,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"measure","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Biden Votes","label_from_parameter":null,"label_short":"Biden Votes","map_layer":null,"name":"results.biden_votes","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"sum","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":"0","view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Biden Votes","measure":true,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.biden_votes","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=51","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${biden} * ${total} ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":0,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"measure","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Count","label_from_parameter":null,"label_short":"Count","map_layer":null,"name":"results.count","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"count","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Count","measure":true,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.count","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=46","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"results.count","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":1,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"measure","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Mov","label_from_parameter":null,"label_short":"Mov","map_layer":null,"name":"results.mov","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"number","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":null,"view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Mov","measure":true,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.mov","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=63","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${biden_votes} - ${trump_votes} ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":2,"diagramDegree":0,"verticalIndex":1},{"align":"right","can_filter":true,"category":"measure","default_filter_value":null,"description":null,"enumerations":null,"field_group_label":null,"fill_style":null,"fiscal_month_offset":0,"has_allowed_values":false,"hidden":false,"is_filter":false,"is_numeric":true,"label":"Results Trump Votes","label_from_parameter":null,"label_short":"Trump Votes","map_layer":null,"name":"results.trump_votes","strict_value_format":false,"requires_refresh_on_sort":false,"sortable":true,"suggestions":null,"tags":[],"type":"sum","user_attribute_filter_types":["number","advanced_filter_number"],"value_format":"0","view":"results","view_label":"Results","dynamic":false,"week_start_day":"monday","dimension_group":null,"error":null,"field_group_variant":"Trump Votes","measure":true,"parameter":false,"primary_key":false,"project_name":"2020-election-betting","scope":"results","suggest_dimension":"results.trump_votes","suggest_explore":"results","suggestable":false,"is_fiscal":false,"is_timeframe":false,"is_turtle":false,"can_turtle":false,"turtle_dimension":null,"can_time_filter":false,"time_interval":null,"lookml_link":"/projects/2020-election-betting/files/views%2Fresults.view.lkml?line=57","permanent":null,"source_file":"views/results.view.lkml","source_file_path":"2020-election-betting/views/results.view.lkml","sql":"${trump} * ${total} ","sql_case":null,"filters":null,"diagramX":0,"diagramY":190,"fieldTypeIndex":3,"diagramDegree":0,"verticalIndex":1}]}}
