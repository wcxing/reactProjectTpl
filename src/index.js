
import React from 'react'
import ReactDOM from 'react-dom'
import Route from './route'
import 'src/common/util/ajax'

import './assets/style/test01.css'
import './assets/style/test02.less'
import './assets/style/test03.scss'
import './assets/style/test04.styl'
import './assets/font/icomoon/style.css'

const rootElement = document.querySelector('#app')
const env = _ENV_ // eslint-disable-line

const renders = Component => ReactDOM.render(
  <div>
    <h2>hello world!</h2>
    <h4>当前环境是：{env}</h4>
    <Component />
  </div>, rootElement
)
renders(Route)
