import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import _ from 'lodash'
import AsyncComponent from '../common/util/AsyncComponent'
import img from '../assets/image/class_01.jpg'

const Login = AsyncComponent(() => import('../page/login/index.js'))
const Home = AsyncComponent(() => import('../page/home/index.js'))

export default () => (
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to="/login">跳转到login</Link></li>
            </ul>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
            </Switch>
        </div>
    </BrowserRouter>
  )