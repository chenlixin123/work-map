<template>
  <div style="height: 90%; overflow: hidden;">
    <panel header="停车场列表" :footer="footer" :list="list" type="1" ></panel>
    <div id="container" style="overflow:hidden"></div>
  </div>
</template>

<script>
import { XHeader, Panel } from 'vux'
export default {
  components: {
    XHeader,
    Panel
  },
  data () {
    return {
      list: [{
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552286197931&di=07fd112dae9a8e4a30f76caaa6bf7aba&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3317391393%2C1281576586%26fm%3D214%26gp%3D0.jpg',
        title: '测试停车场',
        desc: '北京市朝阳区青年路金泰国益大厦地下',
        url: {
          path: '/ParkingCell',
          replace: false
        },
        meta: {
          source: '10',
          date: 'B1, B3',
          other: '00: 24'
        }
      }, {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552286197931&di=07fd112dae9a8e4a30f76caaa6bf7aba&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3317391393%2C1281576586%26fm%3D214%26gp%3D0.jpg',
        title: '国贸B2停车位',
        desc: '北京市朝阳区青年路金泰国益大厦地下',
        url: {
          path: '/ParkingCell?plateNo=H&id=62&start=入口&end=42&storey=B1层',
          replace: false
        },
        meta: {
          source: '10',
          date: 'B1, B3',
          other: '00: 24'
        }
      },
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552286197931&di=07fd112dae9a8e4a30f76caaa6bf7aba&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3317391393%2C1281576586%26fm%3D214%26gp%3D0.jpg',
        title: '蓝堡公寓南区',
        desc: '蓝堡公寓南区',
        url: {
          path: '/ParkingCell?plateNo=H&id=68&start=大厅&end=43&storey=B2层',
          replace: false
        },
        meta: {
          source: '10',
          date: 'B1, B3',
          other: '00: 24'
        }
      }
      ],
      footer: {
        url: 'http://vux.li'
      }
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
