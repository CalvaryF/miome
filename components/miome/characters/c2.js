import { wiggle, carm } from "./miome_utils";
import * as d3 from "d3";

function c(
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
  let arcwidth = fontsize / 4 - strokewidth / 2;
  const width = fontsize;
  const path = d3.path();
  let xpos = x + strokewidth / 2;
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

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff, ypos - segmentheight - ybotoff);
  path.lineTo(xpos + xbotoff, ypos - segmentheight + strokewidth / 2 - ybotoff);

  //left wiggle
  wiggle(
    path,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  //   carm(
  //     path,
  //     xpos + xtopoff,
  //     ypos - segmentheight - ytopoff,
  //     xpos + xbotoff,
  //     ypos - segmentheight - ybotoff,
  //     ctrlHeight,
  //     arcwidth,
  //     true,
  //     ybotoff,
  //     ytopoff,
  //     strokewidth,
  //     true
  //   );

  path.moveTo(
    xpos + arcwidth * 4 + xbotoff,
    ypos - segmentheight + strokewidth / 2 - ybotoff
  );

  //bottom arc
  path.arc(
    xpos + arcwidth * 2 + xbotoff,
    ypos - segmentheight + strokewidth / 2 - ybotoff,
    arcwidth * 2,
    0,
    Math.PI
  );

  path.moveTo(xpos + xtopoff, ypos - segmentheight - ytopoff);

  //bottom arc
  path.arc(
    xpos + arcwidth * 2 + xtopoff,
    ypos - segmentheight - strokewidth / 2 - ytopoff,
    arcwidth * 2,
    Math.PI,
    (Math.PI * 3) / 2
  );

  //   carm(
  //     path,
  //     xpos + xtopoff,
  //     ypos - segmentheight - ytopoff,
  //     xpos + xbotoff,
  //     ypos - segmentheight - ybotoff,
  //     ctrlHeight,
  //     arcwidth,
  //     false,
  //     ybotoff,
  //     ytopoff,
  //     strokewidth,
  //     true
  //   );

  //console.log(path);

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
      //construction lines
      svg
        .append("path")
        .attr(
          "d",
          `M${xpos - fontsize * 0.2}, ${ypos}L${
            xpos + width + fontsize * 0.2
          }, ${ypos} M${xpos - fontsize * 0.2}, ${ypos - fontsize / 2}L${
            xpos + width + fontsize * 0.2
          }, ${ypos - fontsize / 2} M${xpos - fontsize * 0.2}, ${
            ypos - fontsize
          }L${xpos + width + fontsize * 0.2}, ${ypos - fontsize}`
        )
        .attr("fill", "none")
        .attr("stroke", "#ffffff88")
        .attr("stroke-width", 1)
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
export { c };
