import { Vec2, mapToRange } from './math'

const [width, height] = [500, 500]

const angleIndicator = document.getElementById('angle-text')
const fieldCanvas = document.getElementById('field')
fieldCanvas.height = height
fieldCanvas.width = width
const fieldCtx = fieldCanvas.getContext('2d')

const graphCanvas = document.getElementById('graph')
graphCanvas.height = height
graphCanvas.width = width
const graphCtx = graphCanvas.getContext('2d')


const RADIUS = 15

let mousePosition = new Vec2(0,0)
let craftPosition = new Vec2(width / 2, height / 2)

let mousePresent = false

fieldCanvas.addEventListener('mousemove', e => {
  const { offsetX, offsetY } = e
  mousePosition.setVec(offsetX, offsetY)
})
fieldCanvas.addEventListener('mouseenter', e => {
  mousePresent = true
})

fieldCanvas.addEventListener('mouseleave', e => {
  mousePresent = false
})

function drawToMouse(origin) {
  fieldCtx.beginPath()
  fieldCtx.moveTo(origin.x,origin.y)
  fieldCtx.lineTo(mousePosition.x,mousePosition.y)
  fieldCtx.closePath()
  fieldCtx.stroke()
}

function drawCircle() {
  fieldCtx.beginPath()
  fieldCtx.arc(250, 250, RADIUS, 0, 2 * Math.PI)
  fieldCtx.moveTo(250,250)
  fieldCtx.lineTo(250 + RADIUS, 250)
  fieldCtx.closePath()
  fieldCtx.stroke()
}

function draw() {
  fieldCtx.clearRect(0,0,width, height)
  const prevImage = graphCtx.getImageData(0,0,width, height)
  graphCtx.clearRect(0,0,width, height)
  graphCtx.putImageData(prevImage,0,1)
  drawCircle()
  if (mousePresent){
    drawToMouse(craftPosition)
    let craftToMouse = mousePosition.subtract(craftPosition)
    const { magnitude, angle } = craftToMouse
    graphCtx.beginPath()
    graphCtx.arc(mapToRange(angle, -Math.PI, Math.PI, 0, 500), 0, 5, 0, Math.PI * 2)
    graphCtx.fill()
    graphCtx.closePath()
    graphCtx.stroke()
    angleIndicator.innerText = `${angle / Math.PI * 180} degrees`
    fieldCtx.arc(craftPosition.x, craftPosition.y, magnitude, 0, angle, angle > 0 ? false : true )
    fieldCtx.stroke()
  }
  requestAnimationFrame(draw)
}

draw()