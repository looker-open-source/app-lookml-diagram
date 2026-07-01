// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import * as d3 from 'd3'

export const useD3 = (renderChartFn: any, dependencies: any[]) => {
  const ref = React.useRef()

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current))
    return () => {
      // noop
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return ref
}
