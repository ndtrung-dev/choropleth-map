# choropleth-map

This is a project to fulfiled <code>Data Visualization</code> Course provided by freeCodeCamp.

Goals: Build an app that is functionally similar to this https://choropleth-map.freecodecamp.rocks using the following database [1](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json) and [2](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/education.json).

In this project, the tech stack was used ReactJS, d3.js and CSS. Vite was used to built instead of the conventional ones, CRA.<br>
Check out the live demo [here](https://ndtrung-dev.github.io/choropleth-map).

## Requirements:

### User story:
>
> 1. My choropleth should have a title with a corresponding <code>id="title"</code>.
>
> 1. My choropleth should have a description element with a corresponding <code>id="description"</code>.
>
> 1. My choropleth should have counties with a corresponding <code>class="county"</code></code> that represent the data.
>
> 1. There should be at least 4 different fill colors used for the counties.
>
> 1. My counties should each have <code>data-fips</code> and <code>data-education</code> properties containing their corresponding fips and education values.
>
> 1. My choropleth should have a county for each provided data point.
>
> 1. The counties should have <code>data-fips</code> and <code>data-education</code> values that match the sample data.
>
> 1. My choropleth should have a legend with a corresponding <code>id="legend"</code>.
>
> 1. There should be at least 4 different fill colors used for the legend.
>
> 1. I can mouse over an area and see a tooltip with a corresponding <code>id="tooltip"</code> which displays more information about the area.
>
> 1. My tooltip should have a <code>data-education</code> property that corresponds to the <code>data-education</code> of the active area.

### Testing tools

<em>FCC Testing CDN</em> (https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js) is provided by freeCodeCamp

## Result

All checkpoint passed!

Source code uploaded to [github](https://github.com/ndtrung-dev/choropleth-map).

[Live demo](https://ndtrung-dev.github.io/choropleth-map) is uploaded to github using <code>gh-pages</code>. <em>FCC Testing CDN</em> was embedded. Select <code>D3: Choropleth</code> option from dropdown menu to verify the result.
