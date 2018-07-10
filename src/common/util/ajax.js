import axios from 'axios'
import envConfig from 'config/envConfig'


let url = envConfig[_ENV_] // eslint-disable-line

// axios 配置
console.log('当前请求url为：', url)
axios.defaults.timeout = 5000 //设置超时时间
axios.defaults.baseURL = url

// 拦截请求
axios.interceptors.request.use(config => {
  console.log('请求拦截！')
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
  return config
})

// 拦截响应
// Add a response interceptor
axios.interceptors.response.use(response => {
  // Do something with response data
  console.log(response)
  return response
}, (error) => {
  // Do something with response error
  console.log(error)
  return Promise.reject(error)
})

// axios.interceptors.response.use((response) => {
//   const { data } = response
//   // 根据返回的code值来做不同的处理（查看接口文档状态码表）
//   switch (data.code) {
//     case '0':
//       // 请求成功
//       console.log('success!')
//       // 这一步保证数据返回，如果没有return则会走接下来的代码
//       return data
//     case '1':
//       // 请求失败，统一处理失败消息
//       console.log('failure!')
//       break
//     default:
//   }
// }, (err) => { // 这里是返回状态码不为200时候的错误处理
//   if (err && err.response) {
//     switch (err.response.status) {
//       case 400:
//         err.message = '请求错误'
//         break
//       case 401:
//         err.message = '未授权，请登录'
//         break
//       case 403:
//         err.message = '拒绝访问'
//         break

//       case 404:
//         err.message = `请求地址出错: ${err.response.config.url}`
//         break
//       case 408:
//         err.message = '请求超时'
//         break

//       case 500:
//         err.message = '服务器内部错误'
//         break
//       case 501:
//         err.message = '服务未实现'
//         break
//       case 502:
//         err.message = '网关错误'
//         break

//       case 503:
//         err.message = '服务不可用'
//         break

//       case 504:
//         err.message = '网关超时'
//         break

//       case 505:
//         err.message = 'HTTP版本不受支持'
//         break
//       default:
//     }
//   }
//   return Promise.reject(err)
// })
