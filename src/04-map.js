import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 20, left: 20, right: 20, bottom: 20 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let projection = d3.geoOrthographic()

let nyc = [-74, 40]
let london = [0, 51]
let tehran = [51, 35]

let path = d3.geoPath().projection(projection)

d3.json(require('./data/world.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {

}
