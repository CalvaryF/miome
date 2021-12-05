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
  cons
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
      cons
    );
    if (string[i] == "m" || string[i] == "w") {
      offset += fontsize / 3;
    } else if (string[i] == "i") {
      offset -= fontsize / 2;
    }
  }
}

export default function Word({ width, height, fontsize, space, children }) {
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
      .attr("tabindex", 1);

    S.selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => svg.node()),
        (exit) => exit.remove()
      );

    const interval = setInterval(() => {
      d3.select(DivRef.current).select("svg").selectAll("path").remove();
      if (index > 35) {
        direction = 1;
      } else if (index < -35) {
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
        index * 0.02,
        -index * 0.01,
        fontsize,
        0.2,
        2,
        "a",
        space,
        true
      );
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [children, fontsize, space]);

  return (
    <div ref={DivRef}>
      <span></span>
    </div>
  );
}
