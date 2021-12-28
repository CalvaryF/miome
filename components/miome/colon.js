import { wiggle, bezPoint } from "./miome_utils";

import * as d3 from "d3";

function colon(
  svg,
  x,
  ypos,
  xoff,
  yoff,
  fontsize,
  weight,
  wig,
  id,
  update,
  cons
) {
  if (weight > 2) weight = 2;
  const strokewidth = (fontsize / 4) * weight;
  const width = fontsize;
  const path = d3.path();
  let xpos = x + strokewidth / 2;
  let segmentheight = fontsize / 2;
  let ytopoff, ybotoff, xtopoff, xbotoff;
  if (yoff >= 0) {
    ytopoff = fontsize * 4 * yoff;
    ybotoff = 0;
    xtopoff = fontsize * xoff * Math.abs(yoff) * 4;
    xbotoff = 0;
  } else {
    ytopoff = 0;
    ybotoff = fontsize * 4 * yoff;
    xtopoff = 0;
    xbotoff = fontsize * xoff * Math.abs(yoff) * 4;
  }
  let ctrlHeight = (-ybotoff + ytopoff) / wig;

  //   //left wiggle
  //   wiggle(
  //     path,
  //     xpos + xtopoff,
  //     ypos - segmentheight - ytopoff,
  //     xpos + xbotoff,
  //     ypos - segmentheight - ybotoff,
  //     ctrlHeight
  //   );

  //middle thing
  let topline = ypos - segmentheight - ytopoff / 2 - ybotoff / 2 - fontsize / 4;
  let bottomline =
    ypos - segmentheight - ytopoff / 2 - ybotoff / 2 + fontsize / 4;

  let middletop;
  middletop = bezPoint(
    topline,
    //
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff + ctrlHeight,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff - ctrlHeight,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff
  );

  let middlebot;
  middlebot = bezPoint(
    bottomline,
    //
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff + ctrlHeight,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff - ctrlHeight,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff
  );

  let bottomcir;
  if (-ybotoff > fontsize / 2 || ytopoff > fontsize / 2) {
    bottomcir = middlebot;
  } else {
    bottomcir = xpos + xbotoff;
  }

  // letter

  if (!update) {
    svg
      .append("circle")
      .attr("id", id)
      .attr("cx", bottomcir + fontsize / 8)
      .attr("cy", bottomline)
      .attr("r", fontsize / 8)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokewidth)
      .attr("stroke-linecap", "butt");
    svg
      .append("circle")
      .attr("id", id)
      .attr("cx", middletop + fontsize / 8)
      .attr("cy", topline)
      .attr("r", fontsize / 8)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokewidth)
      .attr("stroke-linecap", "butt");
    svg
      .append("path")
      .attr("id", id)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokewidth)
      .attr("stroke-linecap", "butt");

    if (cons) {
      svg
        .append("path")
        .attr("id", "id" + "w")
        .attr(
          "d",
          `M${x}, ${ypos}L${x}, ${ypos - segmentheight * 2} M${
            x + fontsize
          }, ${ypos}L${x + fontsize}, ${
            ypos - segmentheight * 2
          } M${x}, ${ypos}L${x + fontsize}, ${ypos}  M${x}, ${
            ypos - fontsize
          }L${x + fontsize}, ${ypos - fontsize} M${x}, ${ypos - fontsize / 2}L${
            x + fontsize
          }, ${ypos - fontsize / 2}`
        )
        .attr("fill", "none")
        .attr("stroke", "#0088ff")
        .attr("stroke-width", 2)
        .attr("stroke-linecap", "butt");
    }
  } else {
    d3.select(`#${id}`)
      .transition()
      .duration(0)
      .attr("d", path)
      .attr("stroke-width", strokewidth);
  }
}

export { colon };
