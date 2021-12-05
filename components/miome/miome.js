import * as d3 from "d3";
import { GetCubicRoots } from "../../utils/roots";

function Miome(width, height) {
  const fontsize = 60;
  const weight = 0.2;
  const wig = 2;
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("tabindex", 1);

  //create background rectangle
  svg
    .append("rect")
    .attr("fill", "#0055ff")
    .attr("width", width)
    .attr("height", height);

  m(svg, 200, 350, -0.5, 0.8, fontsize, weight, wig);
  i(svg, 300, 350, 0.7, -0.5, fontsize, weight, wig);
  o(svg, 365, 350, -0.5, 0.8, fontsize, weight, wig);
  m(svg, 450, 350, -0.4, -0.3, fontsize, weight, wig);
  b(svg, 650, 350, 0.5, 0.5, fontsize, weight, wig);

  return svg;
}

function bowl(
  path,
  x1,
  y1,
  x2,
  y2,
  ctrlheight,
  arcwidth,
  top,
  ybotoff,
  ytopoff,
  strokewidth
) {
  //const center = (y1 - y2) / 2;

  let center = y1 + ytopoff / 2 - ybotoff / 2;
  console.log(center);
  //center = 400;

  let middlex = bezPoint(
    center,
    //
    x1,
    y1,
    x1,
    y1 + ctrlheight,
    x2,
    y2 - ctrlheight,
    x2,
    y2
  );
  let belcenpt, abvcenpt;

  belcenpt = center + arcwidth;
  abvcenpt = center - arcwidth;

  let belcenptx = bezPoint(
    belcenpt,
    //
    x1,
    y1,
    x1,
    y1 + ctrlheight,
    x2,
    y2 - ctrlheight,
    x2,
    y2
  );

  let abvcenptx = bezPoint(
    abvcenpt,
    //
    x1,
    y1,
    x1,
    y1 + ctrlheight,
    x2,
    y2 - ctrlheight,
    x2,
    y2
  );

  if (ybotoff != 0 || ytopoff != 0) {
    if (!top) {
      if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
        let slopebot = clipBez(
          belcenpt,
          x1 + arcwidth * 4,
          y1,
          x1 + arcwidth * 4,
          y1 + ctrlheight,
          x2 + arcwidth * 4,
          y2 - ctrlheight,
          x2 + arcwidth * 4,
          y2,
          path,
          false
        );

        let radiansbot = Math.atan(slopebot);
        let newarcwidthbot = arcwidth / (Math.sin(radiansbot) + 1);

        let newxposbot = newarcwidthbot * Math.cos(radiansbot);

        path.moveTo(middlex + strokewidth * 3, center);
        path.lineTo(belcenptx + arcwidth * 2, center);

        path.arc(
          belcenptx + arcwidth * 4 - newxposbot,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );
      } else {
        path.moveTo(middlex + strokewidth * 3, center);
        path.lineTo(belcenptx + arcwidth * 2 + strokewidth, center);
      }
    } else {
      if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
        let slopetop = clipBez(
          abvcenpt,
          x1 + arcwidth * 4,
          y1,
          x1 + arcwidth * 4,
          y1 + ctrlheight,
          x2 + arcwidth * 4,
          y2 - ctrlheight,
          x2 + arcwidth * 4,
          y2,
          path,
          true
        );
        console.log(slopetop);

        let radians = Math.atan(slopetop);
        let newarcwidth = arcwidth / (Math.sin(-radians) + 1);
        let newxpos = newarcwidth * Math.cos(radians);

        path.arc(
          abvcenptx + arcwidth * 4 - newxpos,
          center - newarcwidth,
          newarcwidth,
          radians,
          Math.PI / 2
        );

        path.moveTo(middlex + strokewidth * 3, center);
        path.lineTo(abvcenptx + arcwidth * 4 - newxpos, center);
      } else {
        path.moveTo(middlex + strokewidth * 3, center);
        path.lineTo(abvcenptx + arcwidth * 4 - arcwidth, center);
      }
    }
  } else {
    path.moveTo(middlex + strokewidth * 3, center);
    path.lineTo(belcenptx + arcwidth * 3 + strokewidth, center);
  }

  if (!top) {
    //bottom arc
    path.moveTo(x2 + arcwidth * 4, y2 + arcwidth);
    path.arc(
      x2 + arcwidth * 3,
      y2 + arcwidth + strokewidth / 2,
      arcwidth,
      0,
      Math.PI / 2
    );

    if (ytopoff < arcwidth * 2 && ybotoff > -arcwidth * 2) {
      //bottom bowl top arc
      if (ytopoff < arcwidth && ybotoff > -arcwidth) {
        path.moveTo(x2 + arcwidth * 3, center - strokewidth / 2);
      } else {
        path.moveTo(x2 + arcwidth * 3, center - strokewidth / 2);
      }

      path.arc(
        x2 + arcwidth * 3,
        center + arcwidth,
        arcwidth,
        (Math.PI * 3) / 2,
        0
      );
      if (ytopoff < arcwidth && ybotoff > -arcwidth) {
        path.moveTo(x2 + arcwidth * 4, center + arcwidth - strokewidth / 2);
        path.lineTo(x2 + arcwidth * 4, y2 + arcwidth);
      } else {
        path.moveTo(x2 + arcwidth * 4, center + arcwidth - strokewidth / 2);
        path.lineTo(x2 + arcwidth * 4, y2 + arcwidth);
      }
    }

    //bottom line -----------------
    path.moveTo(x2, y2 + arcwidth * 2 + strokewidth / 2);
    path.lineTo(x2 + arcwidth * 3, y2 + arcwidth * 2 + strokewidth / 2);

    //bottom stem
    if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
      path.moveTo(x2 + arcwidth * 4, y2);
      path.lineTo(x2 + arcwidth * 4, y2 + arcwidth);
    }
  } else {
    //top arc
    path.moveTo(x1 + arcwidth * 3, y1 - arcwidth * 2 - strokewidth / 2);

    path.arc(
      x1 + arcwidth * 3,
      y1 - arcwidth - strokewidth / 2,
      arcwidth,
      (Math.PI * 3) / 2,
      0
    );

    if (ytopoff < arcwidth * 2 && ybotoff > -arcwidth * 2) {
      //top bowl bottom arc
      path.moveTo(x1 + arcwidth * 4, y1 - arcwidth - strokewidth / 2);
      path.arc(x1 + arcwidth * 3, center - arcwidth, arcwidth, 0, Math.PI / 2);
    }

    //top line -----------------
    path.moveTo(x1, y1 - arcwidth * 2 - strokewidth / 2);
    path.lineTo(x1 + arcwidth * 3, y1 - arcwidth * 2 - strokewidth / 2);

    if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
      //top stem ------------------
      path.moveTo(x1 + arcwidth * 4, y1 - arcwidth - strokewidth / 2);
      path.lineTo(x1 + arcwidth * 4, y1);
    }
  }
}

function b(svg, x, ypos, xoff, yoff, fontsize, weight, wig) {
  const strokewidth = (fontsize / 4) * weight;
  let arcwidth = fontsize / 4 - strokewidth / 2;
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

  //bottom segment -----------------
  path.moveTo(xpos + xbotoff, ypos - ybotoff);
  path.lineTo(xpos + xbotoff, ypos - segmentheight - ybotoff);

  //top segment -----------------
  path.moveTo(xpos + xtopoff, ypos - segmentheight * 2 - ytopoff);
  path.lineTo(xpos + xtopoff, ypos - segmentheight - ytopoff);

  if (ybotoff != 0 || ytopoff != 0) {
    //left wiggle
    wiggle(
      path,
      xpos + xtopoff,
      ypos - segmentheight - ytopoff,
      xpos + xbotoff,
      ypos - segmentheight - ybotoff,
      ctrlHeight
    );
  }

  bowl(
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
    strokewidth
  );

  bowl(
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
    strokewidth
  );

  if (ybotoff != 0 || ytopoff != 0) {
    //top arc stem
    // path.moveTo(
    //   xpos + arcwidth * 4 + xtopoff,
    //   ypos - segmentheight * 2 + arcwidth - ytopoff + strokewidth / 2
    // );
    // path.lineTo(
    //   xpos + arcwidth * 4 + xtopoff,
    //   ypos - segmentheight * 2 + arcwidth * 2 - ytopoff + strokewidth
    // );
    // //bottom arc stem
    // path.moveTo(
    //   xpos + xbotoff + arcwidth * 4,
    //   ypos - strokewidth / 2 - ybotoff - arcwidth
    // );
    // path.lineTo(
    //   xpos + xbotoff + arcwidth * 4,
    //   ypos - strokewidth / 2 - ybotoff - arcwidth * 2 - strokewidth / 2
    // );
  }

  // letter
  svg
    .append("path")
    .attr("id", "baz")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", strokewidth)
    .attr("stroke-linecap", "butt");

  //construction lines
  svg
    .append("path")
    .attr(
      "d",
      `M${xpos - fontsize * 0.2}, ${ypos}L${
        xpos + width + fontsize * 0.2
      }, ${ypos} M${xpos - fontsize * 0.2}, ${ypos - fontsize / 2}L${
        xpos + width + fontsize * 0.2
      }, ${ypos - fontsize / 2} M${xpos - fontsize * 0.2}, ${ypos - fontsize}L${
        xpos + width + fontsize * 0.2
      }, ${ypos - fontsize}`
    )
    .attr("fill", "none")
    .attr("stroke", "#ffffff88")
    .attr("stroke-width", 1)
    .attr("stroke-linecap", "butt");
}

function bezPoint(ypoint, x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2) {
  //uncomment this stuff if you need to vary the location of the stem
  let ycoord = [y1, cpy1, cpy2, y2];
  ycoord.forEach((_, index) => {
    ycoord[index] -= ypoint;
  });
  let t = GetCubicRoots(ycoord[0], ycoord[1], ycoord[2], ycoord[3]);
  let i;
  i =
    (1 - t) * (1 - t) * (1 - t) * x1 +
    3 * (1 - t) * (1 - t) * t * cpx1 +
    3 * (1 - t) * t * t * cpx2 +
    t * t * t * x2;
  return i;
}

function wiggle(path, x1, y1, x2, y2, ctrlheight) {
  path.moveTo(x1, y1);
  path.bezierCurveTo(x1, y1 + ctrlheight, x2, y2 - ctrlheight, x2, y2);
}

function lerp([x1, y1], [x2, y2], t) {
  const s = 1 - t;
  return [x1 * s + x2 * t, y1 * s + y2 * t];
}

function clipBez(ypoint, x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2, path, seg) {
  let ycoord = [y1, cpy1, cpy2, y2];
  ycoord.forEach((_, index) => {
    ycoord[index] -= ypoint;
  });
  let t = GetCubicRoots(ycoord[0], ycoord[1], ycoord[2], ycoord[3]);
  console.log(t);

  let B0 = [
    [x1, y1],
    [cpx1, cpy1],
    [cpx2, cpy2],
    [x2, y2],
  ];
  let B1 = [
    lerp(B0[0], B0[1], t),
    lerp(B0[1], B0[2], t),
    lerp(B0[2], B0[3], t),
  ];
  let B2 = [lerp(B1[0], B1[1], t), lerp(B1[1], B1[2], t)];
  let B3 = [lerp(B2[0], B2[1], t)];

  if (seg) {
    path.moveTo(B0[0][0], B0[0][1]);
    path.bezierCurveTo(
      B1[0][0],
      B1[0][1],
      B2[0][0],
      B2[0][1],
      B3[0][0],
      B3[0][1]
    );
  } else {
    path.moveTo(B0[3][0], B0[3][1]);
    path.bezierCurveTo(
      B1[2][0],
      B1[2][1],
      B2[1][0],
      B2[1][1],
      B3[0][0],
      B3[0][1]
    );
  }
  let slope = -(B3[0][0] - B2[0][0]) / (B3[0][1] - B2[0][1]);
  return slope;
}

export { Miome };
