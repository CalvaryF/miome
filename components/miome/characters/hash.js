import { wiggle, bezPoint } from "../miome_utils";

import * as d3 from "d3";

function hash(
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

  //   //left wiggle
  //   wiggle(
  //     path,
  //     xpos + xtopoff,
  //     ypos - segmentheight - ytopoff,
  //     xpos + xbotoff,
  //     ypos - segmentheight - ybotoff,
  //     ctrlHeight
  //   );

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff + width / 3, ypos - ybotoff);
  path.lineTo(xpos + xbotoff + width / 3, ypos - segmentheight - ybotoff);

  //top segment -----------------
  path.moveTo(xpos + xtopoff + width / 3, ypos - segmentheight * 2 - ytopoff);
  path.lineTo(xpos + xtopoff + width / 3, ypos - segmentheight - ytopoff);

  //bottom segment -----------------
  path.moveTo(xpos + (width * 2) / 3 + xbotoff - strokewidth, ypos - ybotoff);
  path.lineTo(
    xpos + (width * 2) / 3 + xbotoff - strokewidth,
    ypos - segmentheight - ybotoff
  );

  //top segment -----------------
  path.moveTo(
    xpos + (width * 2) / 3 + xtopoff - strokewidth,
    ypos - segmentheight * 2 - ytopoff
  );
  path.lineTo(
    xpos + (width * 2) / 3 + xtopoff - strokewidth,
    ypos - segmentheight - ytopoff
  );

  //left wiggle
  wiggle(
    path,
    xpos + xtopoff + width / 3,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff + width / 3,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  //right wiggle
  wiggle(
    path,
    xpos + (width * 2) / 3 + xtopoff - strokewidth,
    ypos - segmentheight - ytopoff,
    xpos + (width * 2) / 3 + xbotoff - strokewidth,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  //middle thing
  let topline = ypos - segmentheight - ytopoff / 2 - ybotoff / 2 - fontsize / 6;
  let bottomline =
    ypos - segmentheight - ytopoff / 2 - ybotoff / 2 + fontsize / 6;

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

  path.moveTo(middletop, topline);
  path.lineTo(middletop + width - strokewidth, topline);
  //   path.moveTo(middlebot, bottomline);
  //   path.lineTo(middlebot + width - strokewidth, bottomline);
  //console.log(ybotoff);

  if (-ybotoff > fontsize / 3 || ytopoff > fontsize / 3) {
    path.moveTo(middlebot, bottomline);
    path.lineTo(middlebot + width - strokewidth, bottomline);
  } else {
    path.moveTo(xpos + xbotoff, bottomline);
    path.lineTo(xpos + xbotoff + width - strokewidth, bottomline);
  }

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

export { hash };
