

import "./index.scss";
import {changeIsLogin} from "../../redux/actions"
import  {Head} from "~/components/head"
import {WingBlank,WhiteSpace,SearchBar,List,InputItem,Button} from  "antd-mobile";


export const  mobileReg = /^1(3|5|7|8|9)[0-9]{9}$/
export const  codeReg = /^\d{4}$/

import axios from "@/utils/axios"

let timer = null;


import {connect} from "react-redux"
@connect(
    state=>{
        return{
            
        }
        
    }
)



export class Login extends Component{
    state = {
        toggle:true,
        mobileDis:true,
        flag:true,
        count:60,
        txt:"获取验证码"
    }
    checkMobile = (mobile)=>{
        console.log(mobile);
        // if(mobileReg.test(mobile)){
        //     this.setState({
        //         mobileDis:false
        //     })
        // }else{
        //     this.setState({
        //         mobileDis:true
        //     })
        // }
        if(this.state.flag){
            this.setState({
                mobileDis:!mobileReg.test(mobile)
            })
        }
    }

    startTime = ()=>{
        console.log('uuu')
        timer = setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    txt:this.state.count+' s 后继续'
                })
                
            }else{
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt:"获取验证码",
                    mobileDis:false,
                    flag:true,
                    count:60
                })
            }
        },1000)
    }

    getCode=()=>{
        console.log("sss");

        axios.post("/react/sendCode",{
            mobile:this.refs.mobile.state.value
        }).then(res=>{
            console.log(res);
        })

        this.setState({
            mobileDis:true,
            flag:false
        })
        // ajax 
        this.startTime();


    }

    checkCode = (val)=>{
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle:!(codeReg.test(val)&&mobileReg.test(mobile))
        })
    }

    autoLogin=()=>{
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.code.state.value;
        axios.post("/react/testCode",{
            mobile,
            code
        }).then(res=>{
            console.log(res.data.token);
            if(!!res.data.type){
                this.props.dispatch(changeIsLogin());
                this.props.history.push("/app/my");
                var userInfo =  {
                    token:res.data.token
                }
                sessionStorage.userInfo = JSON.stringify(userInfo);
                sessionStorage.username = mobile;


                
            }else{
                delete sessionStorage['userInfo']
            }
        })
    }

    render(){
        
        const {
            toggle,
            mobileDis,
            txt
        } = this.state
        return (
            <div>
                <Head title="登录" show={true} ></Head>
                <WingBlank>
                <List>
                    <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入手机号"
                        clear
                        onChange={this.checkMobile}
                        ref="mobile"
                    >手机号</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入验证码"
                        clear
                        ref="code"
                        onChange={this.checkCode}
                    >验证码</InputItem>
                    
                    <Button style={{width:"100%"}} ref="btn" inline type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                    <WhiteSpace/>
                    <Button type="primary" disabled={toggle} onClick={this.autoLogin}>快速登录</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}