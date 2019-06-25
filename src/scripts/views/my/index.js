

import "./index.scss";
import  {Head} from "~/components/head"
import {Button,Toast} from "antd-mobile"


import {connect} from "react-redux"
@connect(
    state=>{
        return{
            islogin:state.islogin
        }
        
    }
)



export class My extends Component{
    state={
        isLogin:false
    }
    goLogin=()=>{
        const {history} = this.props;
        history.push("/login");
    }
    loginOut=()=>{
        delete sessionStorage['userInfo'];
        delete sessionStorage['username'];
        this.setState({
            isLogin:false
        })
    }

    gotoout=()=>{
        // 没有登录
        Toast.info("请先进行登录")
    }
    gotosc=()=>{
        // 有惊醒登录
        console.log("nihao")
    }

    componentWillMount(){
        if(sessionStorage['userInfo']){
            this.setState({
                isLogin:true
            })
        }else{
            this.setState({
                isLogin:false
            })
        }
    }

    render(){
        const {
            isLogin 
        } = this.state;
        console.log("这里是state的数据"+this.props)
        return (
            <div>
                <Head title="我的"></Head>
                {/* <div style={{display:this.props.islogin?'block':'none'}} > */}
                <div style={{display:this.state.isLogin?'block':'none' }} className="in">
                    <div id="zhanghu">
                        <img src={require("@/assets/images/touxiang.png")} alt="" id="touxiang"/>
                        <h3> id:{sessionStorage.username}<span onClick={this.loginOut} id="moveout">&nbsp;&nbsp;退出</span></h3>
                    </div>
                    <div id="tupian">
                        <img src={require("@/assets/images/shoucang.png")} alt="" id="shoucang" onClick={this.gotosc}/>
                        <img src={require("@/assets/images/huancun.png")} alt="" id="huancun"/>
                    </div>
                    <h2>我的关注</h2>
                    <h2>观看记录</h2>
                    <h2>我的徽章</h2>
                    <h2>通知开关</h2>
                    <h2>功能开关</h2>
                </div>
                {/* <div style={{display:!this.props.islogin?'block':'none'}} className="out"> */}
                <div style={{display:!this.state.isLogin?'block':'none'}} className="out">
                    <img src={require("@/assets/images/touxiang.png")} alt="" onClick={this.goLogin} id="touxiang"/>
                    <p>点击头像登录</p>
                    <div>
                        <img src={require("@/assets/images/shoucang.png")} alt="" id="shoucang" onClick={this.gotoout}/>
                        <img src={require("@/assets/images/huancun.png")} alt="" id="huancun"/>
                    </div>
                    <h2>我的关注</h2>
                    <h2>观看记录</h2>
                    <h2>我的徽章</h2>
                    <h2>通知开关</h2>
                    <h2>功能开关</h2>
                </div>
            </div>
        )
    }
}