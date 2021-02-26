import { Diagram } from "../components/Diagram"
import * as d3 from 'd3';
import React from 'react';
import {view_explore} from "../test_data/order_items_explore"
import {view_dimensions} from "../test_data/order_items_dimensions"

test('no data', () => {
  expect([]).toEqual([]);
});

