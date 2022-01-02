import { wiggle, carm, bezPoint, clipBez } from "../miome_utils";
import * as d3 from "d3";
import { arc } from "d3";

function at(
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

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff, ypos - segmentheight - ybotoff);
  path.lineTo(
    xpos + xbotoff,
    ypos - segmentheight / 2 - ybotoff - strokewidth / 2
  );

  //top segment -----------------
  path.moveTo(
    xpos + xtopoff,
    ypos - (segmentheight * 3) / 2 - ytopoff + strokewidth / 2
  );
  path.lineTo(xpos + xtopoff, ypos - segmentheight - ytopoff);

  //top segment -----------------
  path.moveTo(
    xpos + width - strokewidth + xtopoff,
    ypos - (segmentheight * 3) / 2 - ytopoff + strokewidth / 2
  );
  path.lineTo(
    xpos + width - strokewidth + xtopoff,
    ypos - segmentheight - ytopoff
  );

  //left wiggle
  wiggle(
    path,
    xpos + xtopoff,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  let center = ypos - segmentheight - ytopoff + ytopoff / 2 - ybotoff / 2;

  const middlex = bezPoint(
    center,
    xpos + xtopoff + width,
    ypos - segmentheight - ytopoff,
    xpos + xtopoff + width,
    ypos - segmentheight - ytopoff + ctrlHeight,
    xpos + xbotoff + width,
    ypos - segmentheight - ybotoff - ctrlHeight,
    xpos + xbotoff + width,
    ypos - segmentheight - ybotoff
  );

  //right wiggle
  wiggle(
    path,
    xpos + xtopoff + width - strokewidth,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff + width - strokewidth,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  //bottom segment -----------------
  path.moveTo(
    xpos + xbotoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ybotoff
  );
  path.lineTo(
    xpos + xbotoff + width / 2 - strokewidth / 2,
    ypos - segmentheight / 2 - ybotoff - strokewidth / 2
  );

  path.lineTo(
    xpos + xbotoff + width - strokewidth,
    ypos - segmentheight / 2 - ybotoff - strokewidth / 2
  );

  path.lineTo(
    xpos + xbotoff + width - strokewidth,
    ypos - segmentheight - ybotoff
  );
  // path.lineTo(
  //   xpos + xbotoff + width / 2 - strokewidth,
  //   ypos - segmentheight - ybotoff
  // );

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

  // carm(
  //   path,
  //   xpos + xtopoff,
  //   ypos - segmentheight - ytopoff,
  //   xpos + xbotoff,
  //   ypos - segmentheight - ybotoff,
  //   ctrlHeight,
  //   arcwidth,
  //   false,
  //   ybotoff,
  //   ytopoff,
  //   strokewidth,
  //   true
  // );
  path.moveTo(xpos + xbotoff + arcwidth, ypos - ybotoff);
  path.arc(
    xpos + xbotoff + arcwidth,
    ypos - ybotoff - arcwidth - strokewidth / 2,
    arcwidth,
    Math.PI / 2,
    Math.PI
  );
  path.moveTo(xpos + xbotoff + arcwidth, ypos - ybotoff - strokewidth / 2);
  path.lineTo(xpos + xbotoff + width, ypos - ybotoff - strokewidth / 2);

  wiggle(
    path,
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ytopoff,
    xpos + xbotoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ybotoff,
    ctrlHeight
  );

  // //bottom segment -----------------
  // path.moveTo(
  //   xpos + xbotoff + width / 2 - strokewidth / 2,
  //   ypos - ybotoff - segmentheight
  // );
  // path.lineTo(
  //   xpos + xbotoff + width / 2 - strokewidth / 2,
  //   ypos - segmentheight / 2 - ybotoff
  // );

  //top segment -----------------
  path.moveTo(
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight * 1.5 - ytopoff
  );
  path.lineTo(
    xpos + xtopoff + width / 2 - strokewidth / 2,
    ypos - segmentheight - ytopoff
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
      //construction lines
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
export { at };
