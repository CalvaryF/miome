import { wiggle, bezPoint } from "./miome_utils";

import * as d3 from "d3";

function one(
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
  cons,
  color
) {
  if (weight > 2) weight = 2;
  const strokewidth = (fontsize / 4) * weight;
  const width = fontsize;
  const path = d3.path();
  let arcwidth = fontsize / 2 - strokewidth / 2;
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

  //bottom arc
  path.arc(
    xpos + xtopoff,
    ypos - segmentheight * 2 - ytopoff,
    arcwidth,
    0,
    Math.PI / 2
  );

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff + width / 2 - strokewidth / 2, ypos - ybotoff);
  path.lineTo(
    xpos + xbotoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ybotoff
  );

  //top segment -----------------
  path.moveTo(
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight * 2 - ytopoff
  );
  path.lineTo(
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ytopoff
  );

  //left wiggle
  wiggle(
    path,
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  //bottom line -----------------
  path.moveTo(
    xpos + xbotoff - strokewidth / 2,
    ypos - strokewidth / 2 - ybotoff
  );
  path.lineTo(
    xpos + xbotoff + width - strokewidth / 2,
    ypos - strokewidth / 2 - ybotoff
  );

  // letter
  if (!update) {
    svg
      .append("path")
      .attr("id", id)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", color)
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

export { one };
