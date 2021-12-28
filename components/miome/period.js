import { wiggle, carm } from "./miome_utils";
import * as d3 from "d3";

function period(
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
  let arcwidth = fontsize / 4;
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

  // letter
  if (!update) {
    svg
      .append("circle")
      .attr("id", id)
      .attr("cx", xpos + xbotoff + fontsize / 8)
      .attr("cy", ypos - ybotoff - fontsize / 8)
      .attr("r", fontsize / 8)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokewidth)
      .attr("stroke-linecap", "butt");

    if (cons) {
    }
  } else {
    d3.select(`#${id}`)
      .transition()
      .duration(0)
      .attr("d", path)
      .attr("stroke-width", strokewidth);
  }
}
export { period };