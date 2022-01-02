import char from "./char";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { select } from "d3";
import * as d3 from "d3";
const W = styled.div`
  color: white;
`;

function word(
  string,
  svg,
  xpos,
  ypos,
  xoff,
  yoff,
  fontsize,
  weight,
  wig,
  id,
  space,
  cons,
  color
) {
  let offset = 0;

  for (let i = 0; i < string.length; i++) {
    // if (string[i] == "i") {
    //   offset -= fontsize / 4;
    // }
    char(
      string[i],
      svg,
      xpos + i * fontsize + i * space + offset,
      ypos,
      xoff,
      yoff,
      fontsize,
      weight,
      wig,
      id,
      false,
      cons,
      color
    );
    if (string[i] == "m" || string[i] == "w" || string[i] == "~") {
      offset += fontsize / 3;
    } else if (
      string[i] == "i" ||
      string[i] == "I" ||
      string[i] == "}" ||
      string[i] == "{" ||
      string[i] == "]" ||
      string[i] == "[" ||
      string[i] == "(" ||
      string[i] == ")" ||
      string[i] == " " ||
      string[i] == ";" ||
      string[i] == '"' ||
      string[i] == "`"
    ) {
      offset -= fontsize / 2;
    } else if (
      string[i] == "." ||
      string[i] == "|" ||
      string[i] == "!" ||
      string[i] == ":" ||
      string[i] == ","
    ) {
      offset -= fontsize / 1.4;
    }
  }
}

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
      .attr("tabindex", 1)
      .attr("style", `background-color:${bgcol}`);

    S.selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => svg.node()),
        (exit) => exit.remove()
      );

    const interval = setInterval(() => {
      d3.select(DivRef.current).select("svg").selectAll("path").remove();
      d3.select(DivRef.current).select("svg").selectAll("circle").remove();
      if (index > 25) {
        direction = 1;
      } else if (index < -25) {
        direction = -1;
      }

      if (direction > 0) {
        index -= 0.25;
      } else {
        index += 0.25;
      }

      word(
        children,
        svg,
        120,
        300,
        -index * 0.02,
        index * 0.01,
        fontsize,
        weight,
        2,
        "a",
        space,
        true,
        color
      );

      // word(
      //   children,
      //   svg,
      //   520,
      //   300,
      //   -index * 0.02,
      //   -index * 0.01,
      //   fontsize,
      //   weight,
      //   2,
      //   "a",
      //   space,
      //   false
      // );
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [children, fontsize, space, weight, bgcol, color]);

  return (
    <div ref={DivRef}>
      <span></span>
    </div>
  );
}
