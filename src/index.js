// import _ from 'lodash'
// const test = () => {
//     console.log('test')
// }
// test()

// function timeout(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }

// async function asyncPrint(value, ms) {
//     await timeout(ms);
//     console.log(value);
// }
// asyncPrint('hello world', 2000);

import React from 'react'
import ReactDOM from 'react-dom'
import Route from './route'
import './assets/style/test01.css'
import './assets/style/test02.less'
import './assets/style/test03.scss'
import './assets/style/test04.styl'
import './assets/font/icomoon/style.css'

const rootElement = document.querySelector('#app')
// ReactDOM.render(
//   <div>
//     <Route text="hello world!" />
//   </div>
//   , rootElement
// )

const renders = Component =>
  ReactDOM.render(
    <Component />,
    rootElement
)
renders(Route)
// const render = Component => {
//   ReactDOM.render(
//     <Component />
//     , rootElement
//   )
// }

// render(Routers) // 首次渲染
