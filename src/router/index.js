import Vue from 'vue'
import Router from 'vue-router'
import ParkingCell from '@/components/parking-cell'
// import emptyPage from '@/components/emptyPage'
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
