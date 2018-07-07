import React, { PureComponent } from 'react'
import _ from 'lodash'
// import Login from '../page/login'
import AsyncComponent from '../common/util/AsyncComponent'
import img from '../assets/image/class_01.jpg'

const Login = AsyncComponent(() => import('../page/login'))


class Route extends PureComponent {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    // static 的写法尚在提议阶段 因此要使用  babel-preset-stage-0
    static propTypes = {}
    static defaultProps = {
        text: 'data from father!'
    }

    // 生命周期函数...
    componentWillMount() {
        this._getCamelCase('my-camelcase-name')
        console.log('route page componentwillmount!')
    }

    _getCamelCase(str) {
        console.log('in route page : camelcase==', _.camelCase(str))
    }

    render() {
        return (
            <div>
                <h3>here is icon-font!</h3>
                <div className="icon-fullscreen"></div>
                <div className="img-test-1">here is css!</div>
                <div className="img-test-less">here is less!</div>
                <div className="img-test-sass">here is scss(sass)!</div>
                <div className="img-test-styl">here is style!</div>
                <img src={img}/>
                <h2>this is  route page!</h2>
                {this.props.text}
                <Login />
            </div> 
        )
    }
}
export default Route