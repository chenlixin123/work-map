<style scoped>
  .contain {
    height: 100%;
  }
  #container {
    overflow:hidden;height: 99%; margin: 0; background-color: #F0FFFF;z-index: 10;position: relative;
    
  }
  *{
    -webkit-overflow-scrolling: touch;
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
      /* padding-left: 102px; */
      /* padding-right: 88px; */
      background: white;
       /* box-shadow: darkgrey 0px 0px 30px 5px; */
       box-shadow: 2px 4px 11px darkgrey;
  }
  .top1{
    width: 40%;
    font-size: 28px;
    color: #666;
    /* border: 1px solid; */
    text-align: center;
  }
  .top1s{
    width: 40%;
    font-size: 28px;
    color: #f66913;
    /* border: 1px solid; */
    text-align: center;
  }
  .top_img{
      width: 40px;
      height: 16px;
      margin-top: -5px;
  }
  .top2{
    width: 40%;
    font-size: 28px;
    color: #666;
    /* border: 1px solid; */
    text-align: center;
  }
  .top2s{
    width: 40%;
    font-size: 28px;
    color: #f66913;
    /* border: 1px solid; */
    text-align: center;
  }
  .bottom{
    width: 100%;
    height: 218px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: white;
    text-align: center;
    z-index: 20000;
  }
  .bottom1{
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    padding-left: 52px;
    padding-top: 48px;
    display: flex;
    z-index: 20000;
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
    font-size: 40px;
    height: 70px;
    line-height: 70px;
    background: #f66913;
    margin: 0 auto;
    margin-top: 20px;
  }
  .start{
    width: 40px;
    height: 66px;
    position: absolute;
    top: 515px;
    left: 300px;
    z-index: 10000;
  }
  .end{
    width: 180px;
    height: 72px;
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 10000;
  }
  .loading{
    width:300px;
    height: 60px;
    /* border: 1px solid ; */
    position: absolute;
    top: 50%;
    left: 30%;
    z-index: 5000;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
    background: rgba(0, 0, 0, .6);
    color: white;
  }
  .bbt{
    width: 100%;
    position: fixed;
     left: 0;
    bottom:10px;
    z-index: 1000;
    display: flex;
    justify-content: space-around;
  }
  .big{
    background: white;
    width:80px;
    height:60px;
    outline: none;
    border:none;
    text-align: center;
    line-height: 60px;
    font-size: 60px;
    border:1px solid rgb(174, 172, 172);
    box-shadow: 2px 4px 11px darkgrey;
  }
  .small{
    z-index: 1000;
    background: white;
    width:80px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 60px;
    border:1px solid rgb(174, 172, 172);
    box-shadow: 2px 4px 11px darkgrey;
  }
  .resh{
    width: 80px;
    height: 80px;
  }
</style>
<template>
  <div class="contain">
    <div class="loading" v-if="show == false">加载中请稍候...</div>
    <div class="top" v-if="show == true && type != 0">
      <div :class="color == '1' ? 'top1s' : 'top1'" @click="startTap">{{starte}}</div>
      <div class="top_img">
        <img src="@/assets/tubiao@2x.png" alt="" width="100%">
      </div>
      <div :class="color == '2' ? 'top2s' : 'top2'" @click="endTap">{{end}}</div>
    </div>
    <div id="container" v-cloak></div>
    <!-- <div class="start">
        <img src="@/assets/qidian@2x.png" alt="" width="100%">
    </div>
     <div class="end">
        <img src="@/assets/huihuakaung@2x.png" alt="" width="100%">
     </div> -->
    <div v-if="isShowSheet" class="bottom">
      <div class="bottom1">
        <!-- <img style="width: 28px; height: 28px;" src="src/assets/dwei-f.png"/> -->
        <div style="font-weight: bolder; " class="title">{{seat == '起点' ? starts : ends}}</div>
        <div class="text" v-if="seat == '起点'">点击地图确认您的{{seat}}位置</div>
        <div class="text" v-if="seat == '终点'">点击车位确认您要去的{{seat}}位置</div>
      </div>
      <x-button v-if="seat == '起点'" text="确认起点" type="primary" :mini="true" @click.native="setStartPoint" class="button"></x-button>
      <x-button v-if="seat == '终点'" text="确认终点" type="primary" :mini="true" @click.native="setEndPoint" class="button"></x-button>
    </div>

      <div class="bbt">
          <div class="big" @click="toBig">+</div>
          <!-- <div class="resh" @click="initMap">Refresh</div> -->
          <a class="resh" @click="scales"><img style="width:100%;" src="@/assets/shouye_shuaxin.png" alt=""></a>
          <!-- <button @click="scales">resh</button> -->
          <div class="small" @click="toSmall">-</div>
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
      system:'',
      jj:'',
      resh:0,
      widths:'',
      type:'',
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
      color:'',
      texts:'',
      storey:'B3层',
      show:false,
      hh:0,
      sj:0,
      many:0,
    }
  },
  created(){
      let that = this
      that.starts = that.$route.query.start
      that.ends = that.$route.query.end
      var u = navigator.userAgent;

var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

if(isAndroid){

// alert("android")
that.system = 1

}

if(isiOS){

// alert("ios")
that.system = 2

}
  },
  methods: {
    toScale () {
      this.group.scale({x: this.isPer, y: this.isPer})
      this.layer.draw()
    },
    //点击起点
    startTap(){
      let that = this
      that.isShowSheet = true
      that.seat = '起点'
      that.starts = that.starte
      that.color = '1'
    },
    //点击终点
     endTap(){
      let that = this
      that.isShowSheet = true
      that.seat = '终点'
       that.ends = that.end
       that.color = '2'
    },
    drawStart () {
        
    },
    // 地图放大事件
    toBig () {
      this.many = 1
      let value = -(0 - this.isPer - 0.03)
      // alert(IDBCursorWithValue)
      if (value > 0 && value <= 2.4) {
        this.scale(value)
        this.isPer = value
      }
    },
    // 地图缩小事件
    toSmall () {
       this.many = 2
      let value = this.isPer - 0.03
      if (value > 0 && value >= this.widths-0.04) {
        this.scale(value)
        this.isPer = value
      }
    },
    // 地图调用的放大或缩小事件（只需传参调用即可）
    scale (per) {
      // console.log(this.many)
      this.isPer = per
      this.group.scale({x: per, y: per})
      if(this.many == 1){
        // console.log(this.dataMap.width)
        // console.log('变大')
        if(this.dataMap.width <= 80){
            this.group.x(this.hh-=10)
           this.group.y(this.sj-=10)
        }else if(this.dataMap.width <= 120){
          this.group.x(this.hh-=15)
           this.group.y(this.sj-=15)
        }else{
          this.group.x(this.hh-=20)
           this.group.y(this.sj-=20)
        }
      }else if(this.many == 2){
        // console.log('缩小')
           if(this.dataMap.width <= 80){
            this.group.x(this.hh+=10)
           this.group.y(this.sj+=10)
        }else if(this.dataMap.width <= 120){
          this.group.x(this.hh+=15)
           this.group.y(this.sj+=15)
        }else{
           this.group.x(this.hh+=20)
           this.group.y(this.sj+=20)
        }
      }
      // console.log(this.hh)
      // console.log(this.sj)
      this.layer.draw()
    },
    scales(){
      let that = this
      if(that.system == 1){
        // alert("android")
          this.$router.push('/emptyPage')
      }else{
        // alert("ios")
          window.location.reload();
      }
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
      console.log(res.target.parent.children[1].attrs.text)
      if(res.target.parent.children[1].attrs.text == '' || res.target.parent.children[1].attrs.text == undefined ||res.target.parent.children[1].attrs.text == '出风'){
        return
      }
      let that = this
      if(that.seat == '起点'){
        let x = res.currentTarget.attrs.value.x
        let y = res.currentTarget.attrs.value.y
          that.starts = res.target.parent.children[1].attrs.text
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
          that.ends = res.target.parent.children[1].attrs.text
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
      let that = this
      if(that.resh != 0){
        return
      }
      that.resh = 1
      console.log('初始化11111111')
      this.stage = createStage('container')
      /**
       * 对画布添加放大缩小事件
       * */
      this.layer = createLayer(this.stage)
      this.group = createGroup(this.layer)
      this.loadGroup = createGroup(this.layer)
      this.img = createGroup(this.layer)
      this.drawElement(selectedNo, direction)
      /**
       * 绘制路线
       * */
      console.log('开始绘制路线')
      that.show = true
      try {
        console.log(this.loadParams)
        getLoad(this.loadParams, res => {
          console.log(res)
          if (res && res.code === 200) {
            var lines = res.data
            // if(that.type == 0){
            //    console.log('高亮显示1111111111111')
            // }else{
              console.log(this.isPer)
              this.jj = this.isPer
              if(this.type == 0){
                    var img = new Image();
            img.src = require('@/assets/red.png');
            console.log('不规划路线222222222222222')
              }else{
                  this.group.add(createLoadLine(lines, this.isPer))
                    var img = new Image();
            img.src = require('@/assets/qidian@2x.png');
            console.log('规划路线222222222222222')
              }
              
    //5.图片加载完后
    // img.onload = function () {
          var kImage = new Konva.Image({
            image:img,
            x:(res.data[0].x)*10-20,
            y:(res.data[0].y)*10-65,
            width:40,
            height:66,
            //偏移
            // offsetX:img.width * 0.5,
            // offsetY:img.height * 0.5,
        //     // offset的设置是使得围绕中心旋转
        //  offset:{
        //         x: img.width/2,
        //         y: img.height/2
        //     }

        })

         var imgs = new Image();
            imgs.src = require('@/assets/huihuakaung@2x.png');
    //5.图片加载完后
    // img.onload = function () {
      if(this.type == 0){

      }else{
          var kImages = new Konva.Image({
            image:imgs,
            x:(res.data[res.data.length - 1].x)*10-90,
            y:(res.data[res.data.length - 1].y)*10-72,
            width:180,
            height:72,
        })
      }
               let ss = Number(that.end)
               let seats = ''
               if(ss >= 0){
                    seats = '车位'
               }else{
                 seats = ''
               }
            let all = that.storey + that.end + seats
            var text = new Konva.Text({
            x: (res.data[res.data.length - 1].x)*10-(all.split('').length/2*20)-(seats == '' ? -10 : -15),
            y: (res.data[res.data.length - 1].y)*10-50,
            padding: 4,
            text: all,
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: '#666',
        });
      
        //添加到组
        setTimeout(res => {
                 that.group.add(kImage)
                    //6.开启动画

        //6.1 旋转
        //每秒转60度
        // var rotateAnglePerSecond = 90;
        // var anim = new Konva.Animation(function (frame) {
        //     //上一帧到当前帧的时间差 ms -->s
        //     var timeDiff = frame.timeDiff /1000;//距离上一帧的时间差
        //     //一帧转多少度
        //     var rotateAngle = timeDiff * rotateAnglePerSecond;
        //     //旋转
        //     kImage.rotate(rotateAngle);
        // }, this.layer);


        // //开启动画
        // anim.start();
                 if(this.type == 0){

      }else{
        that.group.add(kImages)
        that.group.add(text)
      }
        that.layer.draw()
        setTimeout(res => {
            that.resh = 0
        },1000)
        },200)
          }
        })
      } catch (e) {
        console.log(e)
      }
      /**
       * 根据当前模型按比例缩小地图
       * */
      console.log(this.dataMap.width,'uuuuuuuuuuuuuuuuuuuu')
      let width = this.stage.width() / (this.dataMap.width * this.dataMap.unit) + (this.dataMap.width <= 80 ? 0.2 : this.dataMap.width <= 120 ? 0.1 : 0)
      let height = this.group.height() / (this.dataMap.height * this.dataMap.unit) + (this.dataMap.width <= 80 ? 0.2 : this.dataMap.width <= 120 ? 0.1 : 0)
      // console.log(width)
      that.widths = width
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
      this.hh = (-(this.min*(width.toFixed(2)))+7)
      this.sj = moveHeight/2
      this.x = -(this.min*(width.toFixed(2)))+7
      this.y = moveHeight/2
      // alert(moveHeight/2)
      this.touchListen()
    },
    /**
     * 绘制元素
     * 绘制车场的车位及其他建筑物
     **/
    drawElement (selectedNo, direction) {
      let border = this.dataMap.border
      if(Array.isArray(border)) {
        console.log(border,'我瑟吉欧i')
        border.forEach(elements => {                
          this.group.add(createBorder(elements))
        })
      }else{
        this.group.add(createBorder(border))
      }  
      
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
            // console.log('666666666')
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
                console.log(elementGroup)
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
      that.color = ''
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
    // this.storey = this.$route.query.storey
    this.starte = this.$route.query.start
    this.end = this.$route.query.end
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      if (res && res.code === 200) {
             let min = res.data.mapData.border.points[0]
            for( let i = 0; i < res.data.mapData.border.points.length; i++){
                  if(res.data.mapData.border.points[i] < min){
                      min = res.data.mapData.border.points[i]
                  }
            }
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
       that.color = ''
        window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    })()
    let selectedNo = this.$route.query.plateNo;
    let direction = this.$route.query.direction;
    let parkId = this.$route.query.id;
    this.type = this.$route.query.type;
    if(!parkId){
    	parkId = 62;
    }
    this.loadParams.mapId = parkId;
    console.log(this.starts,this.ends)
    this.loadParams.startValue = this.ends;
    this.loadParams.endValue = this.starts;
    // this.storey = this.$route.query.storey
    this.starte = this.$route.query.starts
    this.end = this.$route.query.ends
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      if (res && res.code === 200) {
             let min = res.data.mapData.border.points[0]
            for( let i = 0; i < res.data.mapData.border.points.length; i++){
                  if(res.data.mapData.border.points[i] < min){
                      min = res.data.mapData.border.points[i]
                  }
            }
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
    // this.storey = this.$route.query.storey
    this.starte = this.$route.query.start
    this.end = this.$route.query.end
    // this.$route.query.type = 2
    this.type = this.$route.query.type
    console.info(this.loadParams);
    this.dataMap = getMapData(parkId, res => {
      console.log(res)
      if (res && res.code === 200) {
        console.log(res.data.mapData.border.length)
        if(res.data.mapData.border.length == undefined){
             let min = res.data.mapData.border.points[0]
            for( let i = 0; i < res.data.mapData.border.points.length; i++){
                  if(res.data.mapData.border.points[i] < min){
                      min = res.data.mapData.border.points[i]
                  }
            }
        this.min = min
        this.dataMap = res.data.mapData
        this.initMap(selectedNo, direction)
        }else{
           let min = res.data.mapData.border[0].element.points[0]
            for( let i = 0; i < res.data.mapData.border[0].element.points.length; i++){
                  if(res.data.mapData.border[0].element.points[i] < min){
                      min = res.data.mapData.border[0].element.points[i]
                  }
            }
        this.min = min
        this.dataMap = res.data.mapData
        this.initMap(selectedNo, direction)
        }
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
