import { wiggle, bezPoint } from "../miome_utils";
import * as d3 from "d3";

function tilde(
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
  let arcwidth = fontsize / 3 - strokewidth / 4;
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

  //   //right arc
  //   path.arc(
  //     xpos + arcwidth * 3 + xtopoff,
  //     ypos - segmentheight * 2 + arcwidth + strokewidth / 2 - ytopoff,
  //     arcwidth,
  //     Math.PI,
  //     0
  //   );

  //middle thing
  let center = ypos - segmentheight - ytopoff / 2 - ybotoff / 2;

  let middlex;
  middlex = bezPoint(
    center,
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

  //left arc
  path.arc(middlex + arcwidth, center, arcwidth, Math.PI, 0);
  path.moveTo(middlex + arcwidth * 4, center);
  path.arc(middlex + arcwidth * 3, center, arcwidth, 0, Math.PI);

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
            x + fontsize + fontsize / 3
          }, ${ypos}L${x + fontsize + fontsize / 3}, ${
            ypos - segmentheight * 2
          } M${x}, ${ypos}L${x + fontsize + fontsize / 3}, ${ypos}  M${x}, ${
            ypos - fontsize
          }L${x + fontsize + fontsize / 3}, ${ypos - fontsize} M${x}, ${
            ypos - fontsize / 2
          }L${x + fontsize + fontsize / 3}, ${ypos - fontsize / 2}`
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

export { tilde };
