import "./App.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const URL_EDUCATION =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const URL_COUNTRY =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const SVG_WIDTH = 900;
const SVG_HEIGHT = 600;
const SVG_PADDING = 60;
const SVG_LEGEND_WIDTH = 200;
const RANGE = 9;

function App() {
  Promise.all([d3.json(URL_COUNTRY), d3.json(URL_EDUCATION)])
    .then((data) => sketch(data[0], data[1]))
    .catch((err) => console.error(err));

  function sketch(countryData, educationData) {
    console.log(educationData);

    const svg = d3
      .select("#chart-wrapper")
      .append("svg")
      .attr("id", "chart")
      .attr("height", SVG_HEIGHT)
      .style("display", "block")
      .style("margin", "auto")
      .attr("width", SVG_WIDTH);

    const path = d3.geoPath();

    //scale
    const colorScale = d3
      .scaleThreshold()
      .domain(
        d3.range(
          d3.min(educationData, (d) => d.bachelorsOrHigher),
          d3.max(educationData, (d) => d.bachelorsOrHigher),
          (d3.max(educationData, (d) => d.bachelorsOrHigher) -
            d3.min(educationData, (d) => d.bachelorsOrHigher)) /
            RANGE
        )
      )
      .range(d3.schemeReds[RANGE]);
    const legendScale = d3
      .scaleLinear()
      .domain([
        d3.min(educationData, (d) => d.bachelorsOrHigher),
        d3.max(educationData, (d) => d.bachelorsOrHigher),
      ])
      .range([0, SVG_LEGEND_WIDTH]);

    //add legend
    const g = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", `translate(${SVG_WIDTH * 0.65},${SVG_PADDING / 3})`);
    g.selectAll("rect")
      .data(
        colorScale.range().map((d) => {
          d = colorScale.invertExtent(d);
          if (d[0] == null) d[0] = legendScale.domain()[0];
          if (d[1] == null) d[1] = legendScale.domain()[1];
          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", "0.4rem")
      .attr("width", SVG_LEGEND_WIDTH / RANGE)
      .attr("x", (_, i) => (i * SVG_LEGEND_WIDTH) / RANGE)
      .style("fill", (d) => colorScale(d[0]));
    g.append("g")
      .call(
        d3
          .axisBottom(legendScale)
          .tickFormat(d3.format(",.0f"))
          .ticks(RANGE + 1)
          .tickValues(colorScale.domain())
      )
      .style("font-size", " 0.4rem")
      .attr("transform", `translate(${SVG_LEGEND_WIDTH / RANGE},0)`)
      .select(".domain")
      .remove();

    const tooltip = d3
      .select("#chart-wrapper")
      .append("div")
      .attr("id", "tooltip")
      .style("display", "none")
      .style("padding", "0.2rem 0.8rem");

    const tooltipContent = (county, state, rate) => `
      <span style="font-size:1rem">${county}</span>
      <span style="font-size: 0.8rem">[${state}]</span>
      <span style="font-size:1rem">${rate}%</span>
    `;

    svg
      .append("path")
      .datum(
        topojson.mesh(
          countryData,
          countryData.objects.states,
          (a, b) => a !== b
        )
      )
      .attr("class", "states")
      .style("stroke", "#a55")
      .style("stroke-width", 1.2)
      .attr("d", path);

    // render county
    svg
      .append("g")
      .selectAll("path")
      .data(
        topojson.feature(countryData, countryData.objects.counties).features
      )
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "county")
      .attr("data-fips", (d) => d.id)
      .attr(
        "data-state",
        (d) =>
          educationData[educationData.findIndex((item) => item.fips == d.id)]
            .state
      )
      .attr(
        "data-county",
        (d) =>
          educationData[educationData.findIndex((item) => item.fips == d.id)][
            "area_name"
          ]
      )
      .attr(
        "data-education",
        (d) =>
          educationData[educationData.findIndex((item) => item.fips == d.id)]
            .bachelorsOrHigher
      )
      .style("fill", (d) =>
        colorScale(
          educationData[educationData.findIndex((item) => item.fips == d.id)]
            .bachelorsOrHigher
        )
      )
      .style("stroke", "#99666622")
      .style("stroke-width", 3)
      .on("mouseover", (e) => {
        e.preventDefault();
        d3.select(e.target).style("opacity", 1).style("stroke", "#944");
      })
      .on("mousemove", (e) => {
        e.preventDefault();
        tooltip
          .style("display", "block")
          .attr("data-education", e.target.dataset.education)
          .html(
            tooltipContent(
              e.target.dataset.county,
              e.target.dataset.state,
              e.target.dataset.education
            )
          )
          .style("top", e.pageY - 20 + "px")
          .style("left", e.pageX + 10 + "px")
          .style("position", "absolute");
      })
      .on("mouseleave", (e) => {
        e.preventDefault();
        d3.selectAll(".county").style("stroke", "#99666622");
        tooltip.style("display", "none").html("");
      });
  }

  return (
    <div className="screen">
      <div className="main">
        <div id="chart-wrapper">
          <h1 id="title">United States Educational Attainments</h1>
          <h3 id="description">
            Percentage of adults age 25 and older with a bachelor's degree or
            higher (2010-2014)
          </h3>
          <a
            href="https://www.ers.usda.gov/data-products/county-level-data-sets/county-level-data-sets-download-data/"
            target="_blank"
            className="ref"
            title="Source: USDA Economic Research Service"
          >
            Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
