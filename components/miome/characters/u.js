import { wiggle } from "../miome_utils";
import * as d3 from "d3";

function u(
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
  color,
  absolute_offset
) {
  if (weight > 2) weight = 2;
  const strokewidth = (fontsize / 4) * weight;
  const path = d3.path();
  let xpos = x + strokewidth / 2;
  let arcwidth = fontsize / 2 - strokewidth / 2;
  let segmentheight = fontsize / 2;
  let ytopoff, ybotoff, xtopoff, xbotoff;
  if (yoff == 0) xoff = 0;
  if (absolute_offset) {
    if (yoff >= 0) {
      ytopoff = yoff;
      ybotoff = 0;
      xtopoff = xoff;
      xbotoff = 0;
    } else {
      ytopoff = 0;
      ybotoff = yoff;
      xtopoff = 0;
      xbotoff = xoff;
    }
  } else {
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
  }
  let ctrlHeight = (-ybotoff + ytopoff) / wig;

  //left arc
  path.arc(
    xpos + arcwidth + xbotoff,
    ypos - segmentheight + arcwidth - segmentheight + strokewidth / 2 - ybotoff,
    arcwidth,
    0,
    Math.PI
  );

  //descender
  path.moveTo(xpos + arcwidth * 2 + xbotoff, ypos - segmentheight - ybotoff);
  path.lineTo(xpos + arcwidth * 2 + xbotoff, ypos - ybotoff);

  //top segment
  path.moveTo(xpos + xtopoff, ypos - segmentheight - ytopoff);
  path.lineTo(xpos + xtopoff, ypos - segmentheight * 2 - ytopoff);

  //top segment
  path.moveTo(xpos + xtopoff + arcwidth * 2, ypos - segmentheight - ytopoff);
  path.lineTo(
    xpos + xtopoff + arcwidth * 2,
    ypos - segmentheight * 2 - ytopoff
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
  //middle wiggle
  wiggle(
    path,
    xpos + xtopoff + arcwidth * 2,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff + arcwidth * 2,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );
  //right wiggle

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

export { u };
