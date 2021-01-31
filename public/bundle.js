(function () {
  'use strict';

  const { cos, sin, PI } = Math;

  class Vec2 {
    constructor(x = 0, y = 0) {
      this._x = x;
      this._y = y;
    }

    setByAngLen(angle = 0, length = 1) {
      this._x = length * cos(angle);
      this._y = length * sin(angle);
      return this
    }

    get x() {
      return this._x
    }
    get y() {
      return this._y
    }

    get angle() {
      return Math.atan2(this._y, this._x)
    }

    set angle(_angle) {
      this.setByAngLen(_angle, this.magnitude);
    }

    rotate(angle) {
      const { _x, _y } = this;
      const { cos, sin } = Math;
      const rad = angle;
      this.setVec(_x * cos(rad) - _y * sin(rad), _x * sin(rad) + _y * cos(rad));
    }

    setVec (x, y) {
      this._x = x,
      this._y = y;
    }

    get coordinates () {
      return [ this.x, this.y ]
    }


    get magnitude() {
      const { x, y } = this;
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y,2))
    }

    set magnitude(length) {
      this.setVec(length * (this._x / this.magnitude), length * (this._y / this.magnitude));
    }

    direction (length = 1) {
      return [
        length * (this._x / this.magnitude),
        length * (this._y / this.magnitude)
      ]
    }

    translate(x,y) {
      this._x += x;
      this._y += y;
    }

    add(vec) {
      const [ x, y ] = this.coordinates;
      const [ x1, y1 ] = vec.coordinates;
      return new Vec2( x + x1, y + y1)
    }

    subtract(vec) {
      const [ x, y ] = this.coordinates;
      const [ x1, y1 ] = vec.coordinates;
      return new Vec2(x - x1, y - y1)
    }
  }

  function mapToRange(num, inputMin, inputMax, rangeMin, rangeMax) {
    const distFromMin = num - inputMin;
    const scale = (rangeMax - rangeMin) / (inputMax - inputMin);
    return rangeMin + (scale * distFromMin)
  }

  const [width, height] = [500, 500];

  const angleIndicator = document.getElementById('angle-text');
  const fieldCanvas = document.getElementById('field');
  fieldCanvas.height = height;
  fieldCanvas.width = width;
  const fieldCtx = fieldCanvas.getContext('2d');

  const graphCanvas = document.getElementById('graph');
  graphCanvas.height = height;
  graphCanvas.width = width;
  const graphCtx = graphCanvas.getContext('2d');


  const RADIUS = 15;

  let mousePosition = new Vec2(0,0);
  let craftPosition = new Vec2(width / 2, height / 2);

  let mousePresent = false;

  fieldCanvas.addEventListener('mousemove', e => {
    const { offsetX, offsetY } = e;
    mousePosition.setVec(offsetX, offsetY);
  });
  fieldCanvas.addEventListener('mouseenter', e => {
    mousePresent = true;
  });

  fieldCanvas.addEventListener('mouseleave', e => {
    mousePresent = false;
  });

  function drawToMouse(origin) {
    fieldCtx.beginPath();
    fieldCtx.moveTo(origin.x,origin.y);
    fieldCtx.lineTo(mousePosition.x,mousePosition.y);
    fieldCtx.closePath();
    fieldCtx.stroke();
  }

  function drawCircle() {
    fieldCtx.beginPath();
    fieldCtx.arc(250, 250, RADIUS, 0, 2 * Math.PI);
    fieldCtx.moveTo(250,250);
    fieldCtx.lineTo(250 + RADIUS, 250);
    fieldCtx.closePath();
    fieldCtx.stroke();
  }

  function draw() {
    fieldCtx.clearRect(0,0,width, height);
    const prevImage = graphCtx.getImageData(0,0,width, height);
    graphCtx.clearRect(0,0,width, height);
    graphCtx.putImageData(prevImage,0,1);
    drawCircle();
    if (mousePresent){
      drawToMouse(craftPosition);
      let craftToMouse = mousePosition.subtract(craftPosition);
      const { magnitude, angle } = craftToMouse;
      graphCtx.beginPath();
      graphCtx.arc(mapToRange(angle, -Math.PI, Math.PI, 0, 500), 0, 5, 0, Math.PI * 2);
      graphCtx.fill();
      graphCtx.closePath();
      graphCtx.stroke();
      angleIndicator.innerText = `${angle / Math.PI * 180} degrees`;
      fieldCtx.arc(craftPosition.x, craftPosition.y, magnitude, 0, angle, angle > 0 ? false : true );
      fieldCtx.stroke();
    }
    requestAnimationFrame(draw);
  }

  draw();

}());
