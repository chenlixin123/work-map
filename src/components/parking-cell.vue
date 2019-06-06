<style scoped>
  .contain {
    height: 100%;
  }
  #container {
    overflow:hidden;height: 99%; margin: 0; background-color: #F0FFFF;z-index: 10
  }
  *{
    /* -webkit-overflow-scrolling: touch; */
  }
</style>
<template>
  <div class="contain">
    <div id="container"> </div>
    <div v-if="isShowSheet" style="width: 100%; position: fixed; bottom: 0; height: 100px; z-index: 100;background-color: #FFFFFF">
      <div style="padding: 8px">
        <img style="width: 28px; height: 28px;" src="src/assets/dwei-f.png"/>
        <label style="font-weight: bolder; " v-text="selectedParams.value"></label>
      </div>
      <x-button text="设为起点" type="primary" :mini="true" @click.native="setStartPoint"  style="border-radius:99px;margin-top: 0;margin-left: 5%; width: 40%;height: 40px;"></x-button>
      <x-button text="到这去" plain type="default" :mini="true" @click.native="setEndPoint"  style="border-radius:99px;margin-top: 0;margin-left: 5%; width: 40%;height: 40px;"></x-button>
    </div>
  </div>
</template>
<script>
import { XHeader, Panel, XButton } from 'vux'
import {getMapData, getLoad} from '@/lib/map-data'
import {createStage, createLayer, createGroup, createBorder, createParking, createElement, createLoadLine, createStart} from '@/lib/konva-base'
export default {
  components: {
    XHeader,
    Panel,
    XButton
  },
  name: 'ParkingCell',
  data () {
    return {
      loadP: '89,434',
      dataMap: {},
      stage: null,
      layer: null,
      group: null,
      loadGroup: null,
      isPer: 1,
      isTouch: false,
      isShowSheet: false,
      points: [],
      selectedStart: null,
      /**
       * 标记是否有选中参考点
       * */
      selected: false,
      selectedParams: {
        value: null,
        point: []
      },
      loadParams: {
        mapId: 62,
        startValue: null,
        startPoint: [],
        endValue: null,
        endPoint: []
      }
    }
  },
  methods: {
    drawStart () {
        
    },
    // 地图放大事件
    toBig () {
      let value = -(0 - this.isPer - 0.008)
      if (value > 0 && value <= 2.4) {
        this.scale(value)
        this.isPer = value
      }
    },
    // 地图缩小事件
    toSmall () {
      let value = this.isPer - 0.008
      if (value > 0 && value >= 0.4) {
        this.scale(value)
        this.isPer = value
      }
    },
    // 地图调用的放大或缩小事件（只需传参调用即可）
    scale (per) {
      this.isPer = per
      this.group.scale({x: per, y: per})
      this.layer.draw()
    },
    getDistance (p1, p2) {
      var x = p2.pageX - p1.pageX
      var y = p2.pageY - p1.pageY
      return Math.sqrt(x * x + y * y)
    },
    // 判断用户是放大或所缩小事件
    touchListen () {
      var _this = this
      document.addEventListener('touchstart', function (e) {
        this.pageX = e.targetTouches[0].pageX
        this.pageY = e.targetTouches[0].pageY
        if (e.touches.length >= 2) {
          _this.start = e.touches
        }
        _this.isTouch = true
      }, { passive: false })
      document.addEventListener('touchmove', function (e) {
        e.preventDefault()
        if (e.touches.length >= 2 && _this.isTouch) {
          try {
            var now = e.touches
            var scale = _this.getDistance(now[0], now[1]) / _this.getDistance(_this.start[0], _this.start[1])
            var a = scale.toFixed(2)
            if (a >= 1) {
              _this.toBig()
            }
            if (a < 1) {
              _this.toSmall()
            }
          } catch (e) {
            alert(e)
          }
        }
        /**
         * 如果是放大移动 按比例放大
         * 如果是缩小移动 按比例缩小
         * */
      }, { passive: false })
      document.addEventListener('touchend', function (e) {
        if (this.isTouch) { this.isTouch = false }
      }, { passive: false })
    },
    clickElement (res) {
      var group = res.target.parent
      if (group && group.children.length === 2) {
        var elementNode = group.children[1].text()
        if (elementNode !== '') {
           /**
            * 标记当前节点为路线起点或终点
            * */
          this.selectedParams.value = elementNode
          this.selectedParams.point = [group.x() + group.children[1].x(), group.y() + group.children[1].y()]
          this.listeners()
        }
      }
    },
    initMap (selectedNo, direction) {
      console.log('初始化11111111')
      this.stage = createStage('container')
      /**
       * 对画布添加放大缩小事件
       * */
      this.layer = createLayer(this.stage)
      this.group = createGroup(this.layer)
      this.loadGroup = createGroup(this.layer)
      this.drawElement(selectedNo, direction)
      /**
       * 绘制路线
       * */
      console.log('开始绘制路线')
      try {
        getLoad(this.loadParams, res => {
          if (res && res.code === 200) {
            // let max_x = 0
            // let min_y = res.data[0].y
            // for( let i = 0; i < res.data.length; i++){
            //     if(res.data[i].x > max_x){
            //           max_x = res.data[i].x
            //       }

            //       if(res.data[i].y < min_y){
            //           min_y = res.data[i].y
            //       }
            // }
            var lines = res.data
            this.group.add(createLoadLine(lines, this.isPer))
            this.layer.draw()
          }
        })
      } catch (e) {
        console.log(e)
      }
      /**
       * 根据当前模型按比例缩小地图
       * */
      let width = this.stage.width() / (this.dataMap.width * this.dataMap.unit) + (this.dataMap.width <= 80 ? 0.2 : this.dataMap.width <= 120 ? 0.1 : 0)
      let height = this.group.height() / (this.dataMap.height * this.dataMap.unit) + (this.dataMap.width <= 80 ? 0.2 : this.dataMap.width <= 120 ? 0.1 : 0)
      if (height > width && height < 1) {
        this.scale(height.toFixed(2))
      }
      if (width >= height && width < 1) {
        this.scale(width.toFixed(2))
      }
      let moveWidth = (this.stage.width() - this.group.width() * width) / 8
      let moveHeight = (this.stage.height() - this.group.height() * width) / 4
      this.group.x(0)
      this.group.y(moveHeight/2)

      this.touchListen()
    },
    /**
     * 绘制元素
     * 绘制车场的车位及其他建筑物
     **/
    drawElement (selectedNo, direction) {
      let border = this.dataMap.border
      this.group.add(createBorder(border))
      let elements = this.dataMap.parking
      let parkingGroup
      if (elements && elements !== null) {
        elements.forEach(ele => {
          if (ele.parking.value === selectedNo) {
            ele.parking.fill = '#f66913'
            parkingGroup = createParking(ele)
            /**
             * 定义重点
             * */
            this.loadParams.endPoint = [parkingGroup.x() + parkingGroup.children[1].x(), parkingGroup.y() + parkingGroup.children[1].y()]
            this.loadParams.endValue = parkingGroup.children[1].text()
          } else {
            parkingGroup = createParking(ele)
          }
          parkingGroup.on('tap', res => {
            this.clickElement(res)
          })
          this.group.add(parkingGroup)
        })
      }
      let es = this.dataMap.element
      if (es && es !== null) {
        let elementGroup
        es.forEach(ele => {
          if (ele && ele !== null) {
            console.info(ele)
            if (ele.element[1].text === '入口' && direction === '1') {
              elementGroup = createElement(ele)
              createStart(ele.element[1].x + this.group.x() - 5, ele.element[1].y + this.group.y() + 10, this.group)
              this.loadParams.startPoint = [elementGroup.x() + elementGroup.children[1].x(), elementGroup.y() + elementGroup.children[1].y()]
              this.loadParams.startValue = elementGroup.children[1].text()
            } else if (ele.element[1].text === 'N单元' && direction === '2') {
              let point = (ele.element[1].x + ',' + ele.element[1].y)
              if (this.loadP === point) {
                createStart(ele.element[1].x + this.group.x() + 10, ele.element[1].y + this.group.y() - 15, this.group)
                elementGroup = createElement(ele)
                this.loadParams.startPoint = [elementGroup.x() + elementGroup.children[1].x(), elementGroup.y() + elementGroup.children[1].y()]
                this.loadParams.startValue = elementGroup.children[1].text()
              } else {
                elementGroup = createElement(ele)
              }
            } else {
              elementGroup = createElement(ele)
            }
            elementGroup.on('tap', res => {
              this.clickElement(res)
            })
            this.group.add(elementGroup)
          }
        })
      }
      this.layer.batchDraw()
    },
    listeners () {
      /**
       * 将当前节点局中
       * */
      this.isShowSheet = true
    },
    clearListeners () {
      this.selected = {}
      this.isShowSheet = false
    },
    setStartPoint () {
      var l = this.layer.findOne('#load_line')
      if (l && l !== null) {
        l.destroy()
        this.layer.draw()
      }
      /**
       * 设定起点
       * */
      this.loadParams.startPoint = this.selectedParams.point
      this.loadParams.startValue = this.selectedParams.value
      console.info(this.loadParams)
      /**
       * 换做新的图标
       * */
    },
    setEndPoint () {
      if (this.loadParams.startValue === null) {
        alert('请选择起点')
      } else {
        this.loadParams.endPoint = this.selectedParams.point
        this.loadParams.endValue = this.selectedParams.value
        getLoad(this.loadParams, res => {
          if (res && res.code === 200) {
            var lines = res.data
            /**
             * 画出坐标曲线
             * */
            this.group.add(createLoadLine(lines, this.isPer))
            this.layer.draw()
          }
        })
      }
    }
  },
  mounted () {
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    })()
    let selectedNo = this.$route.query.plateNo;
    let direction = this.$route.query.direction;
    let parkId = this.$route.query.id;
    if(!parkId){
    	parkId = 62;
    }
    this.loadParams.mapId = parkId;
    this.loadParams.startValue = this.$route.query.end;
    this.loadParams.endValue = this.$route.query.start;
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      if (res && res.code === 200) {
        console.log(res.data)
        this.dataMap = res.data.mapData
        this.initMap(selectedNo, direction)
      }
    })
  }
}
</script>
<style type="text/css">
  div,a,img {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select:none;
  }
</style>
