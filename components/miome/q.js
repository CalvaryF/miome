import { wiggle } from "./miome_utils";
import * as d3 from "d3";

function q(
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
  bgcol
) {
  if (weight > 2) weight = 2;
  const strokewidth = (fontsize / 4) * weight;
  const path = d3.path();
  let xpos = x + strokewidth / 2;
  let arcwidth = fontsize / 2 - strokewidth / 2;
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
  let ctrlHeight2 = (-xbotoff + xtopoff) / wig;

  //top arc
  path.arc(
    xpos + arcwidth + xtopoff,
    ypos - segmentheight - ytopoff,
    arcwidth,
    Math.PI,
    0
  );

  //bottom segments -----------------

  //left wiggle
  wiggle(
    path,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );
  //right wiggle
  wiggle(
    path,
    xpos + xtopoff + arcwidth * 2,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff + arcwidth * 2,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  //bottom arc
  path.arc(
    xpos + arcwidth + xbotoff,
    ypos - segmentheight - ybotoff,
    arcwidth,
    0,
    Math.PI
  );

  path.moveTo(xpos + arcwidth + xbotoff, ypos - arcwidth - ybotoff);
  path.bezierCurveTo(
    xpos + xbotoff + arcwidth + fontsize / 2,
    ypos - ybotoff - arcwidth,
    xpos + xbotoff + arcwidth * 2.5 - fontsize / 2,
    ypos - ybotoff - strokewidth / 2,
    xpos + xbotoff + arcwidth * 2.5,
    ypos - ybotoff - strokewidth / 2
  );

  // letter
  if (!update) {
    svg
      .append("path")
      .attr("id", id)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", bgcol)
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

export { q };
