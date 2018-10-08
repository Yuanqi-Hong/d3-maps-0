import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 70, left: 0, right: 0, bottom: 0 }
let height = 600 - margin.top - margin.bottom
let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

let projection = d3
  .geoOrthographic()
  .rotate([74.006, -40.7128])
  .scale(270)
let graticule = d3.geoGraticule()

let nyc = [-74.006, 40.7128]
let london = [-0.1181, 51.5099]

let path = d3.geoPath().projection(projection)

d3.json(require('./data/world.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {
  // console.log(json.objects.countries)

  // converting it to geojson
  let countries = topojson.feature(json, json.objects.countries)

  // console.log(countries)

  svg
    .selectAll('.country')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', 'gray')

  // console.log(graticule())

  svg
    .append('path')
    .datum(graticule())
    .attr('d', path)
    .attr('stroke', 'lightgray')
    .attr('fill', 'none')
    .lower()

  let trip = {
    type: 'LineString',
    coordinates: [nyc, london]
  }

  svg
    .append('path')
    .datum(trip)
    .attr('d', path)
    .attr('stroke', 'red')
    .attr('stroke-width', 2)

  svg
    .append('circle')
    .attr('r', 3)
    .attr('transform', `translate(${projection(nyc)})`)

  svg
    .append('circle')
    .attr('r', 3)
    .attr('transform', `translate(${projection(london)})`)
}
