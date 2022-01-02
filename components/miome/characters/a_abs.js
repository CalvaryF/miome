import { wiggle, bezPoint } from "../miome_utils";
import * as d3 from "d3";

function a(
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
  let width = fontsize;
  let xpos = x + strokewidth / 2;
  let arcwidth = fontsize / 2 - strokewidth / 2;
  let segmentheight = fontsize / 2;
  let ytopoff, ybotoff, xtopoff, xbotoff;
  if (yoff == 0) xoff = 0;
  // if (xoff == 0) yoff = 0;
  if (yoff > 0) {
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

  let ctrlHeight = (-ybotoff + ytopoff) / wig;

  //top arc
  path.arc(
    xpos + arcwidth + xtopoff,
    ypos - segmentheight - ytopoff,
    arcwidth,
    (Math.PI * 3) / 2,
    0
  );

  //top segment -----------------
  path.moveTo(xpos + xtopoff, ypos - segmentheight * 2 - ytopoff);
  path.lineTo(xpos + xtopoff, ypos - segmentheight - ytopoff);

  //top line -----------------
  path.moveTo(
    xpos + xtopoff - strokewidth / 2,
    ypos - segmentheight * 2 + strokewidth / 2 - ytopoff
  );
  path.lineTo(
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight * 2 + strokewidth / 2 - ytopoff
  );

  //bottom segment -----------------
  path.moveTo(xpos + width + xbotoff - strokewidth, ypos - ybotoff);
  path.lineTo(
    xpos + width + xbotoff - strokewidth,
    ypos - segmentheight - ybotoff
  );

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff, ypos - ybotoff);
  path.lineTo(xpos + xbotoff, ypos - segmentheight - ybotoff);

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

  path.moveTo(middlex, center);
  path.lineTo(middlex + width - strokewidth, center);

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

export { a };
