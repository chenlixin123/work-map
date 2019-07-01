<style scoped>
  .contain {
    height: 100%;
  }
  #container {
    overflow:hidden;height: 99%; margin: 0; background-color: #F0FFFF;z-index: 10;
    
  }
  *{
    /* -webkit-overflow-scrolling: touch; */
  }
  .top{
      width:562px; 
      height:70px; 
      line-height: 70px;
      position: absolute; 
      top:30px; 
      left:93px; 
      z-index: 1000;
      /* border:1px solid; */
      display: flex;
      justify-content: space-between;
      /* align-items: center; */
      box-sizing: border-box;
      padding-left: 102px;
      padding-right: 88px;
      background: white;
       /* box-shadow: darkgrey 0px 0px 30px 5px; */
       box-shadow: 2px 4px 11px darkgrey;
  }
  .top1{
    width: 100%;
    font-size: 28px;
    color: #666;
    /* border: 1px solid; */
    text-align: left;
  }
  .top_img{
      width: 40px;
      height: 16px;
  }
  .top2{
    width: 100%;
    font-size: 28px;
    color: #666;
    /* border: 1px solid; */
    text-align: right;
  }
  .bottom{
    width: 100%;
    height: 218px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: white;
    text-align: center;
  }
  .bottom1{
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    padding-left: 52px;
    padding-top: 48px;
    display: flex;
  }
  .title{
      font-size: 34px;
      font-weight: bold;
      color: #333;
  }
  .text{
    font-size: 28px;
    color: #666;
    position: absolute;
    left: 170px;
  }
  .button{
    border-radius:99px;
    margin-left: 5%; 
    width: 450px;
    height: 70px;
    background: #f66913;
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
<template>
  <div class="contain">
    <div class="top">
      <div class="top1" @click="startTap">{{starte}}</div>
      <div class="top_img">
        <img src="@/assets/tubiao@2x.png" alt="" width="100%">
      </div>
      <div class="top2" @click="endTap">{{end}}</div>
    </div>
    <div id="container" v-cloak> </div>
    <div v-if="isShowSheet" class="bottom">
      <div class="bottom1">
        <!-- <img style="width: 28px; height: 28px;" src="src/assets/dwei-f.png"/> -->
        <div style="font-weight: bolder; " class="title">{{seat == '起点' ? starts : ends}}</div>
        <div class="text">点击地图确认您的{{seat}}位置</div>
      </div>
      <x-button v-if="seat == '起点'" text="确认起点" type="primary" :mini="true" @click.native="setStartPoint" class="button"></x-button>
      <x-button v-if="seat == '终点'" text="确认终点" type="primary" :mini="true" @click.native="setEndPoint" class="button"></x-button>
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
      },
      x:'',
      y:'',
      seat:'',
      starte:'',
      starts:'',
      end:'',
      ends:'',
    }
  },
  created(){
      let that = this
      console.log(that.$route.query)
      that.starts = that.$route.query.start
      that.ends = that.$route.query.end
  },
  methods: {
    //点击起点
    startTap(){
      let that = this
      that.isShowSheet = true
      that.seat = '起点'
      that.starts = that.starte
    },
     endTap(){
      let that = this
      that.isShowSheet = true
      that.seat = '终点'
       that.ends = that.end
    },
    drawStart () {
        
    },
    // 地图放大事件
    toBig () {
      let value = -(0 - this.isPer - 0.05)
      // alert(IDBCursorWithValue)
      if (value > 0 && value <= 2.4) {
        this.scale(value)
        this.isPer = value
      }
    },
    // 地图缩小事件
    toSmall () {
      let value = this.isPer - 0.05
      if (value > 0 && value >= 0.4) {
        this.scale(value)
        this.isPer = value
      }
    },
    // 地图调用的放大或缩小事件（只需传参调用即可）
    scale (per) {
      this.isPer = per
      // console.log( this.group.scale)
      //  this.group.x(this.x)
      //     this.group.y(this.y)
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
       let that = this
      document.addEventListener('touchstart', function (e) {
        this.pageX = e.targetTouches[0].pageX
        this.pageY = e.targetTouches[0].pageY
        if (e.touches.length >= 2) {
          // alert(e.touches)
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

    // 这里开始查起 （画导航路线）
    clickElement (res) {
      let that = this
      console.log(that.seat)
      if(that.seat == '起点'){
        console.log(res)
          that.starts = res.target.parent.children[1].attrs.text
          console.log(that.starts)
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
      }else if(that.seat == '终点'){
        console.log(res)
          that.ends = res.target.parent.children[1].attrs.text
          console.log(that.ends)
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
        console.log(this.loadParams)
        getLoad(this.loadParams, res => {
          if (res && res.code === 200) {
            // alert(this.isPer)
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
      // console.log(width.toFixed(2))
      if (height > width && height < 1) {
        this.scale(height.toFixed(2))
      }
      if (width >= height && width < 1) {
        this.scale(width.toFixed(2))
      }
      let moveWidth = (this.stage.width() - this.group.width() * width) / 8
      let moveHeight = (this.stage.height() - this.group.height() * width) / 4
      this.group.x(-(this.min*(width.toFixed(2)))+7)
      this.group.y(moveHeight/2)
      this.x = -(this.min*(width.toFixed(2)))+7
      this.y = moveHeight/2
      // alert('8888888888888888')
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
    
    },
    clearListeners () {
      this.selected = {}
      this.isShowSheet = false
    },
    setStartPoint () {
      let that = this
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
    this.loadParams.startValue = this.ends;
    this.loadParams.endValue = this.starts;
    this.starte = this.$route.query.start
    this.end = this.$route.query.end
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      if (res && res.code === 200) {
        // console.log(res.data.mapData.border.points)
             let min = res.data.mapData.border.points[0]
            for( let i = 0; i < res.data.mapData.border.points.length; i++){
                  if(res.data.mapData.border.points[i] < min){
                      min = res.data.mapData.border.points[i]
                  }
            }
          // console.log(min)
        this.min = min
        this.dataMap = res.data.mapData
        this.initMap(selectedNo, direction)
      }
    })
        that.starte = that.starts
        that.end = that.ends
        that.isShowSheet = false
    },
    setEndPoint () {
      let that = this
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
    this.loadParams.startValue = this.ends;
    this.loadParams.endValue = this.starts;
    this.starte = this.$route.query.starts
    this.end = this.$route.query.ends
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      if (res && res.code === 200) {
        // console.log(res.data.mapData.border.points)
             let min = res.data.mapData.border.points[0]
            for( let i = 0; i < res.data.mapData.border.points.length; i++){
                  if(res.data.mapData.border.points[i] < min){
                      min = res.data.mapData.border.points[i]
                  }
            }
          // console.log(min)
        this.min = min
        this.dataMap = res.data.mapData
        this.initMap(selectedNo, direction)
      }
    })
    that.end = that.ends
    that.starte = that.starts
    that.isShowSheet = false
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
    this.starte = this.$route.query.start
    this.end = this.$route.query.end
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      if (res && res.code === 200) {
        // console.log(res.data.mapData.border.points)
             let min = res.data.mapData.border.points[0]
            for( let i = 0; i < res.data.mapData.border.points.length; i++){
                  if(res.data.mapData.border.points[i] < min){
                      min = res.data.mapData.border.points[i]
                  }
            }
          // console.log(min)
        this.min = min
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
