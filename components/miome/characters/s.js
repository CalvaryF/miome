import { wiggle, carm } from "../miome_utils";
import * as d3 from "d3";

function s(
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
  let arcwidth = fontsize / 4;
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

  if (ybotoff != 0 || ytopoff != 0) {
    //left wiggle
    wiggle(
      path,
      xpos + xtopoff,
      ypos - (segmentheight * 3) / 2 - ytopoff + strokewidth / 2,
      xpos + fontsize - strokewidth + xbotoff,
      ypos - segmentheight / 2 - ybotoff - strokewidth / 2,
      ctrlHeight
    );
  } else {
    // path.moveTo(
    //   xpos + xtopoff - strokewidth / 2,
    //   ypos - (segmentheight * 3) / 2 - ytopoff
    // );

    path.arc(
      xpos + xbotoff + arcwidth * 3 - strokewidth,
      ypos - segmentheight - ybotoff + arcwidth - strokewidth / 2,
      arcwidth,
      Math.PI / 2,
      0,

      true
    );
    // path.moveTo(
    //   xpos + xbotoff + arcwidth * 4 - strokewidth,
    //   ypos - segmentheight - ybotoff + arcwidth - strokewidth / 2
    // );
    path.arc(
      xpos + xtopoff + arcwidth,
      ypos - segmentheight - ytopoff - arcwidth + strokewidth / 2,
      arcwidth,
      Math.PI,
      (Math.PI * 3) / 2
    );

    //no
    // path.lineTo(
    //   xpos + xbotoff + arcwidth * 3,
    //   ypos - segmentheight - ybotoff + arcwidth + strokewidth / 2
    // );
  }

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff, ypos - segmentheight - ybotoff);
  path.lineTo(
    xpos + xbotoff,
    ypos - segmentheight / 2 - ybotoff - strokewidth / 2
  );

  //top segment -----------------
  path.moveTo(
    xpos + arcwidth * 4 + xtopoff - strokewidth,
    ypos - (segmentheight * 3) / 2 - ytopoff + strokewidth / 2
  );
  path.lineTo(
    xpos + arcwidth * 4 + xtopoff - strokewidth,
    ypos - segmentheight - ytopoff
  );

  carm(
    path,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff,
    ctrlHeight,
    arcwidth,
    true,
    ybotoff,
    ytopoff,
    strokewidth,
    true
  );

  carm(
    path,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff,
    ctrlHeight,
    arcwidth,
    false,
    ybotoff,
    ytopoff,
    strokewidth,
    true
  );

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
export { s };
