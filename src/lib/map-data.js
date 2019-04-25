/**
 * 地图数据
 * */
/* jshint esversion: 6 */
import axios from '../lib/api.request'
export const getMapData = (id, back) => {
  axios.request({
    url: 'api/info/find',
    method: 'get',
    params: {id: id}
  }).then(res => {
    back(res)
  }).catch(err => {
    console.log(err)
  })
}
export const getLoad = (params, back) => {
  axios.request({
    url: 'api/load/line',
    method: 'get',
    params: {mapId: params.mapId, startValue: params.startValue, endValue: params.endValue}
  }).then(res => {
    back(res)
  }).catch(err => {
    console.log(err)
  })
}
