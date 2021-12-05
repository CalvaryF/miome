import { GetCubicRoots } from "../../utils/roots";

function bowl2(
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
      if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
        let slopebot = clipBez(
          belcenpt,
          x1 + arcwidth * 5 - strokewidth,
          y1,
          x1 + arcwidth * 5 - strokewidth,
          y1 + ctrlheight,
          x2 + arcwidth * 5 - strokewidth,
          y2 - ctrlheight,
          x2 + arcwidth * 5 - strokewidth,
          y2,
          path,
          false
        );

        let radiansbot = Math.atan(slopebot);
        let newarcwidthbot = arcwidth / (Math.sin(radiansbot) + 1);

        let newxposbot = newarcwidthbot * Math.cos(radiansbot);

        path.moveTo(middlex, center);
        path.lineTo(belcenptx + arcwidth * 2, center);

        path.arc(
          belcenptx + arcwidth * 5 - strokewidth - newxposbot,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );
      } else {
        path.moveTo(middlex, center);
        path.lineTo(belcenptx + arcwidth * 3, center);
      }
    } else {
      if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
        let slopetop = clipBez(
          abvcenpt,
          x1 + arcwidth * 5 - strokewidth,
          y1,
          x1 + arcwidth * 5 - strokewidth,
          y1 + ctrlheight,
          x2 + arcwidth * 5 - strokewidth,
          y2 - ctrlheight,
          x2 + arcwidth * 5 - strokewidth,
          y2,
          path,
          true
        );
        //console.log(slopetop);

        let radians = Math.atan(slopetop);
        let newarcwidth = arcwidth / (Math.sin(-radians) + 1);
        let newxpos = newarcwidth * Math.cos(radians);

        path.arc(
          abvcenptx + arcwidth * 5 - strokewidth - newxpos,
          center - newarcwidth,
          newarcwidth,
          radians,
          Math.PI / 2
        );
        //this
        path.moveTo(middlex, center);
        path.lineTo(abvcenptx + arcwidth * 5 - strokewidth - newxpos, center);
      } else {
        path.moveTo(middlex, center);
        path.lineTo(abvcenptx + arcwidth * 5 - strokewidth - arcwidth, center);
      }
    }
  } else {
    path.moveTo(middlex, center);
    path.lineTo(belcenptx + arcwidth * 4 - strokewidth, center);
  }

  if (!top) {
    //bottom arc
    path.moveTo(x2 + arcwidth * 5 - strokewidth, y2 + arcwidth);
    path.arc(
      x2 + arcwidth * 4 - strokewidth,
      y2 + arcwidth + strokewidth / 2,
      arcwidth,
      0,
      Math.PI / 2
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //bottom bowl top arc
      if (ytopoff <= arcwidth && ybotoff >= -arcwidth) {
        path.moveTo(x2 + arcwidth * 4 - strokewidth, center - strokewidth / 2);
      } else {
        path.moveTo(x2 + arcwidth * 4 - strokewidth, center - strokewidth / 2);
      }

      path.arc(
        x2 + arcwidth * 4 - strokewidth,
        center + arcwidth,
        arcwidth,
        (Math.PI * 3) / 2,
        0
      );
      if (ytopoff <= arcwidth && ybotoff >= -arcwidth) {
        path.moveTo(
          x2 + arcwidth * 5 - strokewidth,
          center + arcwidth - strokewidth / 2
        );
        path.lineTo(x2 + arcwidth * 5 - strokewidth, y2 + arcwidth);
      } else {
        path.moveTo(
          x2 + arcwidth * 5 - strokewidth,
          center + arcwidth - strokewidth / 2
        );
        path.lineTo(x2 + arcwidth * 5 - strokewidth, y2 + arcwidth);
      }
    }

    //bottom line -----------------
    path.moveTo(x2, y2 + arcwidth * 2 + strokewidth / 2);
    path.lineTo(
      x2 + arcwidth * 4 - strokewidth,
      y2 + arcwidth * 2 + strokewidth / 2
    );

    //bottom stem
    if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
      path.moveTo(x2 + arcwidth * 5 - strokewidth, y2);
      path.lineTo(x2 + arcwidth * 5 - strokewidth, y2 + arcwidth);
    }
  } else {
    //top arc
    path.moveTo(
      x1 + arcwidth * 4 - strokewidth,
      y1 - arcwidth * 2 - strokewidth / 2
    );

    path.arc(
      x1 + arcwidth * 4 - strokewidth,
      y1 - arcwidth - strokewidth / 2,
      arcwidth,
      (Math.PI * 3) / 2,
      0
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //top bowl bottom arc
      path.moveTo(
        x1 + arcwidth * 5 - strokewidth,
        y1 - arcwidth - strokewidth / 2
      );
      path.arc(
        x1 + arcwidth * 4 - strokewidth,
        center - arcwidth,
        arcwidth,
        0,
        Math.PI / 2
      );
    }

    //top line -----------------
    path.moveTo(x1, y1 - arcwidth * 2 - strokewidth / 2);
    path.lineTo(
      x1 + arcwidth * 4 - strokewidth,
      y1 - arcwidth * 2 - strokewidth / 2
    );

    if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
      //top stem ------------------
      path.moveTo(
        x1 + arcwidth * 5 - strokewidth,
        y1 - arcwidth - strokewidth / 2
      );
      path.lineTo(x1 + arcwidth * 5 - strokewidth, y1);
    }
  }
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
      if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
        let slopebot = clipBez(
          belcenpt,
          x1 + arcwidth * 4 - strokewidth,
          y1,
          x1 + arcwidth * 4 - strokewidth,
          y1 + ctrlheight,
          x2 + arcwidth * 4 - strokewidth,
          y2 - ctrlheight,
          x2 + arcwidth * 4 - strokewidth,
          y2,
          path,
          false
        );

        let radiansbot = Math.atan(slopebot);
        let newarcwidthbot = arcwidth / (Math.sin(radiansbot) + 1);

        let newxposbot = newarcwidthbot * Math.cos(radiansbot);

        path.moveTo(middlex, center);
        path.lineTo(belcenptx + arcwidth * 2, center);

        path.arc(
          belcenptx + arcwidth * 4 - strokewidth - newxposbot,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );
      } else {
        path.moveTo(middlex, center);
        path.lineTo(x2 + arcwidth * 3 - (strokewidth * 3) / 2, center);
      }
    } else {
      if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
        let slopetop = clipBez(
          abvcenpt,
          x1 + arcwidth * 4 - strokewidth,
          y1,
          x1 + arcwidth * 4 - strokewidth,
          y1 + ctrlheight,
          x2 + arcwidth * 4 - strokewidth,
          y2 - ctrlheight,
          x2 + arcwidth * 4 - strokewidth,
          y2,
          path,
          true
        );
        //console.log(slopetop);

        let radians = Math.atan(slopetop);
        let newarcwidth = arcwidth / (Math.sin(-radians) + 1);
        let newxpos = newarcwidth * Math.cos(radians);

        path.arc(
          abvcenptx + arcwidth * 4 - strokewidth - newxpos,
          center - newarcwidth,
          newarcwidth,
          radians,
          Math.PI / 2
        );
        //this
        path.moveTo(middlex, center);
        path.lineTo(abvcenptx + arcwidth * 4 - strokewidth - newxpos, center);
      } else {
        path.moveTo(middlex, center);
        path.lineTo(abvcenptx + arcwidth * 4 - strokewidth - arcwidth, center);
      }
    }
  } else {
    path.moveTo(middlex, center);
    path.lineTo(belcenptx + arcwidth * 3 - strokewidth, center);
  }

  if (!top) {
    //bottom arc
    path.moveTo(x2 + arcwidth * 4 - strokewidth, y2 + arcwidth);
    path.arc(
      x2 + arcwidth * 3 - strokewidth,
      y2 + arcwidth - strokewidth / 2,
      arcwidth,
      0,
      Math.PI / 2
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //bottom bowl top arc
      if (ytopoff <= arcwidth && ybotoff >= -arcwidth) {
        path.moveTo(x2 + arcwidth * 3 - strokewidth, center - strokewidth / 2);
      } else {
        path.moveTo(x2 + arcwidth * 3 - strokewidth, center - strokewidth / 2);
      }

      path.arc(
        x2 + arcwidth * 3 - strokewidth,
        center + arcwidth,
        arcwidth,
        (Math.PI * 3) / 2,
        0
      );
      if (ytopoff <= arcwidth && ybotoff >= -arcwidth) {
        path.moveTo(
          x2 + arcwidth * 4 - strokewidth,
          center + arcwidth - strokewidth / 2
        );
        path.lineTo(x2 + arcwidth * 4 - strokewidth, y2 + arcwidth);
      } else {
        path.moveTo(
          x2 + arcwidth * 4 - strokewidth,
          center + arcwidth - strokewidth / 2
        );
        path.lineTo(x2 + arcwidth * 4 - strokewidth, y2 + arcwidth);
      }
    }

    //bottom line -----------------
    path.moveTo(x2, y2 + arcwidth * 2 - strokewidth / 2);
    path.lineTo(
      x2 + arcwidth * 3 - strokewidth,
      y2 + arcwidth * 2 - strokewidth / 2
    );

    //bottom stem
    if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
      path.moveTo(x2 + arcwidth * 4 - strokewidth, y2);
      path.lineTo(x2 + arcwidth * 4 - strokewidth, y2 + arcwidth);
    }
  } else {
    //top arc
    path.moveTo(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth * 2 + strokewidth / 2
    );

    path.arc(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      (Math.PI * 3) / 2,
      0
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //top bowl bottom arc
      path.moveTo(
        x1 + arcwidth * 4 - strokewidth,
        y1 - arcwidth + strokewidth / 2
      );
      path.arc(
        x1 + arcwidth * 3 - strokewidth,
        center - arcwidth,
        arcwidth,
        0,
        Math.PI / 2
      );
    }

    //top line -----------------
    path.moveTo(x1, y1 - arcwidth * 2 + strokewidth / 2);
    path.lineTo(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth * 2 + strokewidth / 2
    );

    if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
      //top stem ------------------
      path.moveTo(
        x1 + arcwidth * 4 - strokewidth,
        y1 - arcwidth + strokewidth / 2
      );
      path.lineTo(x1 + arcwidth * 4 - strokewidth, y1);
    }
  }
}

function karm(
  path,
  ypos,
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
      if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
        let slopebot = clipBez(
          belcenpt,
          x1 + arcwidth * 2 - strokewidth,
          y1,
          x1 + arcwidth * 2 - strokewidth,
          y1 + ctrlheight,
          x2 + arcwidth * 2 - strokewidth,
          y2 - ctrlheight,
          x2 + arcwidth * 2 - strokewidth,
          y2,
          path,
          false
        );

        let radiansbot = Math.atan(slopebot);
        let newarcwidthbot = arcwidth / (Math.sin(radiansbot) + 1);

        let newxposbot = newarcwidthbot * Math.cos(radiansbot);

        path.moveTo(middlex, center);
        path.lineTo(middlex, center);

        path.arc(
          belcenptx + arcwidth * 2 - newxposbot - strokewidth,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );

        path.moveTo(x2 + arcwidth * 2 - strokewidth, y2);
        path.lineTo(x2 + arcwidth * 2 - strokewidth, y2 + arcwidth);
      } else {
        //this
        path.moveTo(middlex, center);
        path.lineTo(x2 + arcwidth - strokewidth, center);
      }
    } else {
      if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
        let slopetop = clipBez(
          abvcenpt,
          x1 + arcwidth * 2 - strokewidth,
          y1,
          x1 + arcwidth * 2 - strokewidth,
          y1 + ctrlheight,
          x2 + arcwidth * 2 - strokewidth,
          y2 - ctrlheight,
          x2 + arcwidth * 2 - strokewidth,
          y2,
          path,
          true
        );
        //console.log(slopetop);

        let radians = Math.atan(slopetop);
        let newarcwidth = arcwidth / (Math.sin(-radians) + 1);
        let newxpos = newarcwidth * Math.cos(radians);

        path.arc(
          abvcenptx + arcwidth * 2 - newxpos - strokewidth,
          center - newarcwidth,
          newarcwidth,
          radians,
          Math.PI / 2
        );
        //middle
        path.moveTo(middlex, center);
        path.lineTo(abvcenptx + arcwidth * 2 - newxpos - strokewidth, center);

        //top segment
        path.moveTo(x1 + arcwidth * 2 - strokewidth, y1);
        path.lineTo(x1 + arcwidth * 2 - strokewidth, y1 - arcwidth);
      } else {
        //middle
        path.moveTo(middlex, center);
        path.lineTo(x1 + arcwidth - strokewidth, center);
      }
    }
  } else {
    path.moveTo(middlex, center);
    path.lineTo(belcenptx + arcwidth - strokewidth, center);
  }

  if (!top) {
    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //bottom bowl top arc
      if (ytopoff <= arcwidth && ybotoff >= -arcwidth) {
        path.moveTo(x2 + arcwidth - strokewidth / 2, center);
      } else {
        path.moveTo(x2 + arcwidth - strokewidth / 2, center);
      }

      path.arc(
        x2 + arcwidth - strokewidth,
        center + arcwidth,
        arcwidth,
        (Math.PI * 3) / 2,
        0
      );
      path.moveTo(x2 + arcwidth * 2 - strokewidth, center + arcwidth);
      path.lineTo(x2 + arcwidth * 2 - strokewidth, ypos);
    }
  } else {
    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //top bowl bottom arc
      path.moveTo(x1 + arcwidth * 2 - strokewidth, y1 - arcwidth);
      path.arc(
        x1 + arcwidth - strokewidth,
        center - arcwidth,
        arcwidth,
        0,
        Math.PI / 2
      );
    }
  }
}

function carm(
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

  //center = 400;

  let belcenpt, abvcenpt;

  belcenpt = center + arcwidth;
  abvcenpt = center - arcwidth;

  if (!top) {
    //bottom arc
    path.moveTo(
      x2 + arcwidth * 4 - strokewidth,
      y2 + arcwidth - strokewidth / 2
    );
    path.arc(
      x2 + arcwidth * 3 - strokewidth,
      y2 + arcwidth - strokewidth / 2,
      arcwidth,
      0,
      Math.PI / 2
    );
    path.moveTo(x2 + arcwidth, y2 + arcwidth * 2 - strokewidth / 2);
    path.arc(
      x2 + arcwidth,
      y2 + arcwidth - strokewidth / 2,
      arcwidth,
      Math.PI / 2,
      Math.PI
    );

    //bottom line -----------------
    path.moveTo(x2 + arcwidth, y2 + arcwidth * 2 - strokewidth / 2);
    path.lineTo(
      x2 + arcwidth * 3 - strokewidth,
      y2 + arcwidth * 2 - strokewidth / 2
    );
  } else {
    //top arc
    path.moveTo(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth * 2 + strokewidth / 2
    );

    path.arc(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      (Math.PI * 3) / 2,
      0
    );
    path.moveTo(x1, y1 - arcwidth + strokewidth / 2);
    path.arc(
      x1 + arcwidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      Math.PI,
      (Math.PI * 3) / 2
    );

    //top line -----------------
    path.moveTo(x1 + arcwidth, y1 - arcwidth * 2 + strokewidth / 2);
    path.lineTo(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth * 2 + strokewidth / 2
    );
  }
}

function bezPoint(ypoint, x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2) {
  //uncomment this stuff if you need to vary the location of the stem
  let ycoord = [y1, cpy1, cpy2, y2];
  ycoord.forEach((_, index) => {
    ycoord[index] -= ypoint;
  });
  let t = GetCubicRoots(ycoord[0], ycoord[1], ycoord[2], ycoord[3]);
  if (t.length == 0) t = [0];
  let i;
  i =
    (1 - t) * (1 - t) * (1 - t) * x1 +
    3 * (1 - t) * (1 - t) * t * cpx1 +
    3 * (1 - t) * t * t * cpx2 +
    t * t * t * x2;
  //console.log("i " + i);
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
  if (t.length == 0) t = [0];
  //console.log(t);

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

export { bowl, lerp, clipBez, wiggle, bezPoint, karm, carm };