import { arc } from "d3-shape";
import { GetCubicRoots } from "../../utils/roots";
//not done
function reversebowl(
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
  strokewidth,
  middlefactor
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

        path.moveTo(middlex + middlefactor, center);
        path.lineTo(belcenptx + arcwidth * 2, center);

        path.arc(
          belcenptx + arcwidth * 4 - strokewidth - newxposbot,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );
      } else {
        path.moveTo(middlex + middlefactor, center);
        path.lineTo(x2 + arcwidth * 3 - (strokewidth * 3) / 2, center);
      }
    } else {
      if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
        let slopetop = clipBez(
          abvcenpt,
          x1,
          y1,
          x1,
          y1 + ctrlheight,
          x2,
          y2 - ctrlheight,
          x2,
          y2,
          path,
          true
        );
        //console.log(slopetop);

        let radians = Math.atan(slopetop);
        let newarcwidth = arcwidth / (Math.sin(radians) + 1);
        let newxpos = newarcwidth * Math.cos(radians);

        path.moveTo(
          abvcenptx + newarcwidth * 2 - newxpos,
          center - newarcwidth + newarcwidth
        );
        path.arc(
          abvcenptx + newxpos,
          center - newarcwidth,
          newarcwidth,
          //bottom
          Math.PI / 2,
          //left
          Math.PI + radians
        );

        //this
        path.moveTo(abvcenptx + newarcwidth * 2 - newxpos, center);
        path.lineTo(middlex + arcwidth * 4 - strokewidth / 2, center);
      } else {
        path.moveTo(middlex + arcwidth + middlefactor, center);
        path.lineTo(middlex + arcwidth * 4 - strokewidth / 2, center);
      }
    }
  } else {
    path.moveTo(middlex + arcwidth + middlefactor, center);
    path.lineTo(middlex + arcwidth * 4 - strokewidth / 2, center);
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

    path.moveTo(x1, y1 - arcwidth * 1 + strokewidth / 2);
    path.arc(
      x1 + arcwidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      Math.PI,
      (Math.PI * 3) / 2
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      path.moveTo(x1, y1 - arcwidth + strokewidth / 2);
      path.lineTo(x1, abvcenpt);
      //top bowl bottom arc
      path.moveTo(x1 + arcwidth, center);
      path.arc(
        x1 + arcwidth,
        center - arcwidth,
        arcwidth,
        Math.PI / 2,
        Math.PI
      );
    }

    //top line -----------------
    path.moveTo(x1 + arcwidth, y1 - arcwidth * 2 + strokewidth / 2);
    path.lineTo(
      x1 + arcwidth * 4 - strokewidth / 2,
      y1 - arcwidth * 2 + strokewidth / 2
    );

    if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
      //top stem ------------------
      path.moveTo(x1, y1 - arcwidth + strokewidth / 2);
      path.lineTo(x1, y1);
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
  strokewidth,
  middlefactor
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

        path.moveTo(middlex + middlefactor, center);
        path.lineTo(belcenptx + arcwidth, center);

        path.arc(
          belcenptx + arcwidth * 4 - strokewidth - newxposbot,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );
      } else {
        path.moveTo(middlex + middlefactor, center);
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
        path.moveTo(middlex + middlefactor, center);
        path.lineTo(abvcenptx + arcwidth * 4 - strokewidth - newxpos, center);
      } else {
        path.moveTo(middlex + middlefactor, center);
        path.lineTo(abvcenptx + arcwidth * 4 - strokewidth - arcwidth, center);
      }
    }
  } else {
    path.moveTo(middlex + middlefactor, center);
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
function doublebowl(
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
  strokewidth,
  middlefactor
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

        clipBez(
          belcenpt,
          x1,
          y1,
          x1,
          y1 + ctrlheight,
          x2,
          y2 - ctrlheight,
          x2,
          y2,
          path,
          false
        );

        let radiansbot = Math.atan(slopebot);
        let newarcwidthbot = arcwidth / (Math.sin(radiansbot) + 1);
        let newxposbot = newarcwidthbot * Math.cos(radiansbot);

        let leftnewarcwidthbot = arcwidth / (Math.sin(-radiansbot) + 1);
        let leftnewxposbot = leftnewarcwidthbot * Math.cos(radiansbot);

        //  path.moveTo(belcenptx + leftnewxposbot, center);
        path.arc(
          belcenptx + leftnewxposbot,
          center + leftnewarcwidthbot,
          leftnewarcwidthbot,
          //bottom
          Math.PI + radiansbot,
          (Math.PI * 3) / 2
          //left
        );

        path.arc(
          belcenptx + arcwidth * 4 - strokewidth - newxposbot,
          center + newarcwidthbot,
          newarcwidthbot,
          (Math.PI * 3) / 2,
          radiansbot
        );

        path.moveTo(x2, y2);
        path.lineTo(x2, y2 + arcwidth);
      } else {
        path.moveTo(middlex + arcwidth, center);
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

        clipBez(
          abvcenpt,
          x1,
          y1,
          x1,
          y1 + ctrlheight,
          x2,
          y2 - ctrlheight,
          x2,
          y2,
          path,
          true
        );
        //console.log(slopetop);

        let radians = Math.atan(slopetop);
        let newarcwidth = arcwidth / (Math.sin(-radians) + 1);
        let newxpos = newarcwidth * Math.cos(radians);

        let leftnewarcwidth = arcwidth / (Math.sin(radians) + 1);
        let leftnewxpos = leftnewarcwidth * Math.cos(radians);

        path.moveTo(abvcenptx + leftnewxpos, center);
        path.arc(
          abvcenptx + leftnewxpos,
          center - leftnewarcwidth,
          leftnewarcwidth,
          //bottom
          Math.PI / 2,
          //left
          Math.PI + radians
        );

        path.moveTo(
          abvcenptx + arcwidth * 4 + newarcwidth - strokewidth - newxpos,
          center - newarcwidth
        );

        path.arc(
          abvcenptx + arcwidth * 4 - strokewidth - newxpos,
          center - newarcwidth,
          newarcwidth,
          radians,
          Math.PI / 2
        );

        // //working on this now
        path.moveTo(x1, y1);
        path.lineTo(x1, y1 - arcwidth);
        //this

        path.moveTo(abvcenptx + arcwidth * 4 - strokewidth - newxpos, center);
        path.lineTo(abvcenptx + leftnewxpos, center);
      } else {
        path.moveTo(abvcenptx + arcwidth, center);
        path.lineTo(abvcenptx + arcwidth * 4 - strokewidth - arcwidth, center);
      }
    }
  } else {
    path.moveTo(middlex + arcwidth + middlefactor, center);
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

    path.moveTo(x2 + arcwidth, y2 + arcwidth * 2);
    path.arc(
      x2 + arcwidth,
      y2 + arcwidth - strokewidth / 2,
      arcwidth,
      Math.PI / 2,
      Math.PI
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //left segment
      path.moveTo(x2, y2 + arcwidth + strokewidth / 2);
      path.lineTo(x2, center + arcwidth);

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
      path.moveTo(x2, center + arcwidth);
      path.arc(
        x2 + arcwidth,
        center + arcwidth,
        arcwidth,
        Math.PI,
        (Math.PI * 3) / 2
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
    path.moveTo(
      x2 + arcwidth + strokewidth / 2,
      y2 + arcwidth * 2 - strokewidth / 2
    );
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
    path.moveTo(x1, y1 - arcwidth * 1 + strokewidth / 2);
    path.arc(
      x1 + arcwidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      Math.PI,
      (Math.PI * 3) / 2
    );

    path.moveTo(x1, y1 - arcwidth * 1 + strokewidth / 2);
    path.arc(
      x1 + arcwidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      Math.PI,
      (Math.PI * 3) / 2
    );
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
      //left segment
      path.moveTo(x1, y1 - arcwidth + strokewidth / 2);
      path.lineTo(x1, center - arcwidth);

      path.moveTo(x1 + arcwidth, center);
      path.arc(
        x1 + arcwidth,
        center - arcwidth,
        arcwidth,
        Math.PI / 2,
        Math.PI
      );
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
    path.moveTo(x1 + arcwidth, y1 - arcwidth * 2 + strokewidth / 2);
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

function closebrack(
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
  strokewidth,
  middlefactor
) {
  //const center = (y1 - y2) / 2;
  x1 += arcwidth - strokewidth / 2;
  x2 += arcwidth - strokewidth / 2;

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
  let leftnewarcwidth = 0;
  let leftnewarcwidthbot = 0;
  let leftnewxpos = 0;
  let leftnewxposbot = 0;
  if (ybotoff != 0 || ytopoff != 0) {
    if (true) {
      if (ytopoff >= arcwidth * 2 || ybotoff <= -arcwidth * 2) {
        let slopebot = clipBez(
          belcenpt,
          x1,
          y1,
          x1,
          y1 + ctrlheight,
          x2,
          y2 - ctrlheight,
          x2,
          y2,
          path,
          false
        );

        let radiansbot = Math.atan(slopebot);

        leftnewarcwidthbot = arcwidth / (Math.sin(-radiansbot) + 1);
        leftnewxposbot = leftnewarcwidthbot * Math.cos(radiansbot);

        //  path.moveTo(belcenptx + leftnewxposbot, center);
        path.arc(
          belcenptx + leftnewxposbot,
          center + leftnewarcwidthbot,
          leftnewarcwidthbot,
          //bottom
          Math.PI + radiansbot,
          (Math.PI * 3) / 2
          //left
        );

        path.moveTo(x2, y2);
        path.lineTo(x2, y2 + arcwidth);
      }
    }
    if (ytopoff > arcwidth * 2 || ybotoff < -arcwidth * 2) {
      let slopetop = clipBez(
        abvcenpt,
        x1,
        y1,
        x1,
        y1 + ctrlheight,
        x2,
        y2 - ctrlheight,
        x2,
        y2,
        path,
        true
      );

      let radians = Math.atan(slopetop);

      leftnewarcwidth = arcwidth / (Math.sin(radians) + 1);
      leftnewxpos = leftnewarcwidth * Math.cos(radians);

      path.moveTo(abvcenptx + leftnewxpos, center);
      path.arc(
        abvcenptx + leftnewxpos,
        center - leftnewarcwidth,
        leftnewarcwidth,
        //bottom
        Math.PI / 2,
        //left
        Math.PI + radians
      );

      path.moveTo(x1, y1);
      path.lineTo(x1, y1 - arcwidth);
    }
  }

  if (
    ytopoff > arcwidth * 2 ||
    ybotoff < -arcwidth * 2 ||
    ytopoff > arcwidth * 2 ||
    ybotoff < -arcwidth * 2
  ) {
    path.moveTo(belcenptx + leftnewxposbot, center);
    path.lineTo(abvcenptx + leftnewxpos, center);
  }

  if (!top) {
    path.moveTo(x2, y2 + arcwidth);
    path.arc(
      x2 - arcwidth,
      y2 + arcwidth - strokewidth / 2,
      arcwidth,
      0,
      Math.PI / 2
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //left segment
      path.moveTo(x2, y2 + arcwidth + strokewidth / 2);
      path.lineTo(x2, center + arcwidth);

      //bottom bowl top arc
      if (ytopoff <= arcwidth && ybotoff >= -arcwidth) {
        path.moveTo(x2 + arcwidth * 3 - strokewidth, center - strokewidth / 2);
      } else {
        path.moveTo(x2 + arcwidth * 3 - strokewidth, center - strokewidth / 2);
      }

      path.moveTo(x2, center + arcwidth);
      path.arc(
        x2 + arcwidth,
        center + arcwidth,
        arcwidth,
        Math.PI,
        (Math.PI * 3) / 2
      );
      if (ybotoff != 0 || ytopoff != 0) {
        path.moveTo(x2 + arcwidth, center);
        path.lineTo(x2 + arcwidth * 1.2, center);
      }
    }
  } else {
    path.moveTo(x1 - arcwidth, y1 - arcwidth * 2 + strokewidth / 2);
    path.arc(
      x1 - arcwidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      (Math.PI * 3) / 2,
      0
    );

    path.moveTo(x1 - arcwidth, y1 - arcwidth * 2 + strokewidth / 2);
    path.arc(
      x1 - arcwidth,
      y1 - arcwidth + strokewidth / 2,
      arcwidth,
      (Math.PI * 3) / 2,
      0
    );
    //top arc
    path.moveTo(
      x1 + arcwidth * 3 - strokewidth,
      y1 - arcwidth * 2 + strokewidth / 2
    );

    if (ytopoff <= arcwidth * 2 && ybotoff >= -arcwidth * 2) {
      //left segment
      path.moveTo(x1, y1 - arcwidth + strokewidth / 2);
      path.lineTo(x1, center - arcwidth);

      path.moveTo(x1 + arcwidth, center);
      path.arc(
        x1 + arcwidth,
        center - arcwidth,
        arcwidth,
        Math.PI / 2,
        Math.PI
      );
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

function longarc(path, x1, y1, x2, y2, ctrlheight) {
  path.moveTo(x1, y1);
  path.bezierCurveTo(x1, y1 + ctrlheight, x2, y2, x2, y2);
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

export {
  bowl,
  lerp,
  clipBez,
  wiggle,
  bezPoint,
  karm,
  carm,
  longarc,
  doublebowl,
  reversebowl,
  closebrack,
};
