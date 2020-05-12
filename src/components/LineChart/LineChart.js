import React from 'react'
import {XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, DiscreteColorLegend } from 'react-vis';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];

const ITEMS = [
  'Options',
  'Buttons',
  'Select boxes',
  'Date inputs',
  'Password inputs',
  'Forms',
  'Other'
];


const LineChart = (props) => {
  return (
    <>
    <DiscreteColorLegend
      colors={[
        '#19CDD7',
        '#DDB27C',
      ]}
      items={[
        'apples',
        'bananas',
      ]}
    orientation="vertical"
    />
    <XYPlot
      width={300}
      height={300}>
        <HorizontalGridLines />
        <LineSeries
          data={[
            {x: 1, y: 10},
            {x: 2, y: 5},
            {x: 3, y: 15}
          ]}/>
        <XAxis />
        <YAxis />
    </XYPlot>
    </>
  )
}

export default LineChart
