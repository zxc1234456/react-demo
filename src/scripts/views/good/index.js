
import  {Head} from "~/components/head"
import axios from "@/utils/axios"
import {WingBlank,WhiteSpace,Card,Toast} from "antd-mobile"

export class Good extends Component{

    constructor(props){
        super(props)
        this.state={
             data:null,
             img:require("@/assets/images/share.png"),
             img1:require("@/assets/images/sc.png"),
             img2:require("@/assets/images/sch.png"),
             flag:false
        }

    }

    componentWillMount(){

        axios.get("/react/getGoodOne",{
            params:{
                goodId:this.props.match.params.goodId
            }
        }).then(res=>{
            console.log(res);
            this.setState({
                data:res.data.result
            })
        })
    }

    componentDidMount(){
        document.getElementsByClassName("am-icon am-icon-search am-icon-md")[0].style.display="none"
    }

    shareSystem(linkid){
        plus.share.sendWithSystem({content:'分享内容',href:linkid}, function(){
            console.log('分享成功');
        }, function(e){
            console.log('分享失败：'+JSON.stringify(e));
        });
    }

    gotosc(){
        if(sessionStorage.username){
            this.setState({
                flag:!this.state.flag
            })
            if(this.state.flag){
                document.getElementById("img11").src=this.state.img2;
                var collectid=this.state.data._id;
                var collectimg=this.state.data.img1;
                var collecttitle=this.state.data.title;
                var collectname=sessionStorage.username;
                axios.post("/react/getCollect",{
                    collectid,
                    collectimg,
                    collecttitle
                }).then(res=>{
                    console.log(res)
                })
            }else{
                document.getElementById("img11").src=this.state.img1;
                var collectid=this.state.data._id;
                var collectimg=this.state.data.img1;
                var collecttitle=this.state.data.title;
                var collectname=sessionStorage.username;
                axios.post("/react/noCollect",{
                    collectid,
                    collectimg,
                    collecttitle
                }).then(res=>{
                    console.log(res)
                })
            }
            
            
        }else{
            Toast.info("请先进行登录")
        }
    }
    
    render(){
        console.log(this.props);
        //路由后面配置的参数,用location和params来取
        const {
            location,
            match
        }=this.props;
        const {
            data
        }=this.state;
        return (
            <div className="move-in">
                {/* 这里title的名字过长,导致加载文案没居中 */}
                <div id="headbox">
                    <Head title={new URLSearchParams(location.search).get("name").substring(0,12)+"..."} show="true" id="showbox"></Head>
                    <img src={this.state.img} alt="" style={{position:"fixed",right:"0.4rem",top:"0.24rem",width:"0.42rem",height:"0.42rem"}} onClick={()=>this.shareSystem(data.titleHref)}/>
                    <img src={this.state.img1} alt="" style={{position:"fixed",right:"1rem",top:"0.24rem",width:"0.52rem",height:"0.52rem"}} onClick={()=>this.gotosc(data.titleHref)} id="img11"/>
                </div>
                <div id="contentbox">
                {
                    this.state.data&&<div style={{width:"100%"}}>
                        <iframe src={data.titleHref} style={{width:"100vw",height:"100vh",overflowY:"hidden"}}></iframe>
                    </div>
                }
                </div>
            </div>
        )
    }
}