import Axios from 'axios'

class httpRequest {
  constructor (context) {
    this.content = context
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      config.headers['Content-Type'] = this.content
      let contentType = (config.headers['Content-Type'])
      if (contentType === 'undefined' || contentType === 'application/json; charset=utf-8') {
        if (config.params && config.params !== null) {
          config.data = JSON.stringify(config.params)
        }
      }
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let data = res.data
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      return data
    }, (error) => {
      console.log(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: '',
      timeout: 120000,
      maxContentLength: 2000000,
      'Content-Type': this.content
    }
    return Axios.create(conf)
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
