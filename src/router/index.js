import Vue from 'vue'
import Router from 'vue-router'
import ParkingCell from '@/components/parking-cell'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/ParkingCell',
      name: 'ParkingCell',
      component: ParkingCell
    }
  ]
})
