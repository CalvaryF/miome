import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import d3, { select } from "d3";
import styled from "styled-components";

const Main = styled.div`
  // margin-left: 8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Card = styled.div`
  width: ${(props) => props.w + "px"};
  height: ${(props) => props.h + "px"};
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export default function Canv({ content, w, h }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const div = select(containerRef.current);

    div
      .selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => content),
        (exit) => exit.remove()
      );
    //div.append(() => content).join((exit) => exit.remove());
  }, [content]);
  return (
    <Main>
      <Card w={w} h={h} ref={containerRef}></Card>
    </Main>
  );
}
