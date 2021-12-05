import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Canv from "../components/Canv";
import { Miome } from "../components/miome/miome";
export default function Home() {
  const [content, setContent] = useState(50);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(600);
  useEffect(() => {
    setContent(Miome(width, height).node());
  }, []);
  return (
    <div>
      <Canv w={width} h={height} content={content}></Canv>
    </div>
  );
}
