import char from "./char";
import { a } from "./a_abs";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { select } from "d3";
import * as d3 from "d3";
const W = styled.div`
  color: white;
`;

export default function Word({
  width,
  height,
  fontsize,
  space,
  weight,
  children,
  bgcol,
  color,
}) {
  const DivRef = useRef(null);
  const SRef = useRef(null);
  useEffect(() => {
    let index = 0;
    let direction = 1;
    const S = select(DivRef.current);

    const svg = d3
      .create("svg")
      .attr("ref", SRef)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", `background-color:${bgcol}`);

    S.selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => svg.node()),
        (exit) => exit.remove()
      );

    var dragHandler = d3.drag().on("drag", dragged);
    // .on('start', dragstarted);

    var xpos = 50;
    var ypos = 50;

    var circle = svg
      .append("circle")
      .attr("id", "c1")
      .attr("cx", xpos)
      .attr("cy", ypos)
      .attr("r", 5);

    var circle2 = svg
      .append("circle")
      .attr("id", "c2")
      .attr("cx", xpos + 151)
      .attr("cy", ypos + 151)
      .attr("r", 5);

    dragHandler(circle);
    dragHandler(circle2);

    var x1 = d3.select("#c1").attr("cx");

    var y1 = d3.select("#c1").attr("cy");

    var x2 = d3.select("#c2").attr("cx");

    var y2 = d3.select("#c2").attr("cy");

    svg
      .append("rect")
      .attr("id", "box")
      .attr("x", x1)
      .attr("y", y1)
      .attr("height", Math.abs(y1 - y2))
      .attr("width", Math.abs(x1 - x2))
      .attr("fill", "#dfdfdf")
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "butt")
      .attr("rx", 10)
      .attr("ry", 10)
      .lower();
    var minsize = 150;
    var margin = 20;
    char(
      "b",
      svg,
      xpos + margin,
      ypos + minsize - margin,
      0,
      0,
      minsize - margin * 2,
      0.5,
      2,
      "a",
      false,
      false,
      "black",
      true
    );

    function dragged(event) {
      var current = d3.select(this);
      current.attr("cx", event.x).attr("cy", event.y);

      var c2x = parseInt(d3.select("#c2").attr("cx"));
      var c2y = parseInt(d3.select("#c2").attr("cy"));
      var c1x = parseInt(d3.select("#c1").attr("cx"));
      var c1y = parseInt(d3.select("#c1").attr("cy"));

      if (current.attr("id") == "c1") {
        if (
          Math.abs(current.attr("cx") - c2x) < minsize ||
          parseInt(current.attr("cx")) > c2x
        ) {
          current.attr("cx", c2x - minsize);
        }
        if (
          Math.abs(current.attr("cy") - c2y) < minsize ||
          parseInt(current.attr("cy")) > c2y
        ) {
          current.attr("cy", c2y - minsize);
        }
      } else {
        if (
          Math.abs(current.attr("cx") - c1x) < minsize ||
          parseInt(current.attr("cx")) < c1x
        ) {
          current.attr("cx", c1x + minsize);
        }
        if (
          Math.abs(current.attr("cy") - c1y) < minsize ||
          parseInt(current.attr("cy")) < c1y
        ) {
          current.attr("cy", c1y + minsize);
        }
      }

      x1 = d3.select("#c1").attr("cx");

      y1 = d3.select("#c1").attr("cy");

      x2 = d3.select("#c2").attr("cx");

      y2 = d3.select("#c2").attr("cy");

      svg
        .select("#box")
        .attr("x", x1)
        .attr("y", y1)
        .attr("height", Math.abs(y1 - y2))
        .attr("width", Math.abs(x1 - x2));

      var yoff = Math.abs(y1 - y2) - minsize;
      var xoff = Math.abs(x1 - x2) - minsize;
      xpos = parseInt(x1);
      ypos = parseInt(y1);
      char(
        "b",
        svg,
        xpos + margin,
        ypos + minsize - margin,
        xoff,
        -yoff,
        minsize - margin * 2,
        0.5,
        2,
        "a",
        true,
        false,
        "black",
        true
      );
    }
  }, [children, fontsize, space, weight, bgcol, color]);

  return (
    <div ref={DivRef}>
      <span></span>
    </div>
  );
}
