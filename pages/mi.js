import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Canv from "../components/Canv";
import Word from "../components/miome/words";

import * as d3 from "d3";
let index = 0;
let direction = false;

const Bg = styled.div`
  background-color: #222;
  height: 100vh;
  width: 100vw;
  padding: 20px;
`;

const SBox = styled.div`
  width: ${({ w }) => w + "px"};
  height: ${({ h }) => h + "px"};
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export default function Home() {
  const [content, setContent] = useState(50);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(600);
  const [In, setIn] = useState("8");

  return (
    <Bg>
      <SBox w={width} h={height}>
        <input onChange={(e) => setIn(e.target.value)}></input>
        <Word
          fontsize={80}
          space={20}
          weight={0.2}
          width={width}
          height={height}
        >
          {In}
        </Word>
      </SBox>
    </Bg>
  );
}
