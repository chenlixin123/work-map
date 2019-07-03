/**
 * konva 基础包
 * */
import Konva from 'konva'
export const createStage = (id) => {
  let width = window.innerWidth
  let height = window.innerHeight
  let stage = new Konva.Stage({container: id, width: width, height: height, draggable: true})
  return stage
}

/**
 * 创建画布基础层
 * */
export const createLayer = (stage) => {
  let layer = new Konva.Layer()
  stage.add(layer)
  return layer
}

/**
 * 创建画布基础组
 * */
export const createGroup = (layer) => {
  let group = new Konva.Group({x: 0, y: 0})
  layer.add(group)
  return group
}

/**
 * 创建一个车位
 * 一个车位包含一个组 一个矩形框， 一个文本域
 * */
export const createParking = (obj) => {
  let parkingGroup = new Konva.Group({x: obj.x, y: obj.y})
  let parkingRect = new Konva.Rect(obj.parking)
  parkingRect.perfectDrawEnabled(false)
  let parkingLabel = new Konva.Text(obj.label)
  parkingGroup.add(parkingRect)
  parkingGroup.add(parkingLabel)
  parkingGroup.value({x: obj.x, y: obj.y, value: parkingRect.value()})
  return parkingGroup
}
/**
 * 创建障碍物
 * */
export const createElement = (obj) => {
  let elementGroup = new Konva.Group({x: 0, y: 0})
  let elementRect = new Konva.Line(obj.element[0])
  elementGroup.add(elementRect)
  elementRect.draggable(false)
  elementRect.perfectDrawEnabled(false)
  let x = 0
  let y = 0
  let v = ''
  if (obj.element.length > 1) {
    let elementLabel = new Konva.Text(obj.element[1])
    elementLabel.draggable(false)
    elementGroup.add(elementLabel)
    x = elementLabel.x()
    y = elementLabel.y()
    v = elementLabel.text()
    elementGroup.value({x: x, y: y, value: v})
  }
  if (obj.element.length > 2) {
    var imageObj = new Image()
    imageObj.onload = function (e) {
      var image = new Konva.Image({
        x: obj.element[2].x,
        y: obj.element[2].y,
        image: imageObj,
        width: 32,
        height: 32
      })
      elementGroup.add(image)
    }
    imageObj.src = 'src/assets/inout.png'
  }
  return elementGroup
}
export const createStart = (x, y, layer) => {
  return Konva.Image.fromURL(require('../assets/start.png'), function (image) {
    image.x(x)
    image.y(y)
    layer.add(image)
    layer.draw()
  })
}
export const createBorder = (obj) => {
  let redLine = new Konva.Line(obj)
  redLine.draggable(false)
  return redLine
}
export const createLoadLine = (points, isPer) => {
  let ps = []
  points.forEach((p) => {
    ps.push((p.x * 10))
    ps.push((p.y * 10))
  })
  // console.log(ps)
  let redLine = new Konva.Line({
    id: 'load_line',
    points: ps,
    stroke: '#5e98ff',
    blue: 200,
    offset: 10,
    strokeWidth: 10,
    tension: 0.2
  })
  redLine.draggable(false)
  return redLine
}
export const createTipInfo = (msg) => {
  let tl = new Konva.Label({
    x: 0,
    y: 0,
    draggable: false
  })
  tl.add(new Konva.Tag({
    fill: '#bbb',
    stroke: '#333',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    lineJoin: 'round',
    pointerDirection: 'right',
    pointerWidth: 20,
    pointerHeight: 20,
    cornerRadius: 5
  }))
  tl.add(new Konva.Text({
    text: 'Hello World!',
    fontSize: 50,
    lineHeight: 1.2,
    padding: 10,
    fill: 'green'
  }))
  return tl
}
