

import "./index.scss";
import  {Head} from "~/components/head"

import axios from "@/utils/axios"
import history from "@/utils/history";

import {WingBlank ,WhiteSpace ,Carousel,NoticeBar,Accordion,List} from "antd-mobile"
import {Link} from "react-router-dom"
import React from 'react'
import { Player,BigPlayButton } from "video-react"

export class Home extends Component{
    state = {
        banner:[],
        news:[],
        search:require("@/assets/images/ss.png")
    }
    componentWillMount(){
        console.log(this.props);
        axios.get("/vue/getGoodList",{
            params:{
                limit:4
            }
        }).then(res=>{
            console.log(res); 
            this.state.banner = res.data.result;
            this.setState({
                banner:this.state.banner
            })
        });

        //请求新闻数据
        axios.get("/react/getnews",{
            params:{
                limit:40
            }
        }).then(res=>{
            console.log(res); 
            this.state.news = res.data.result;
            this.setState({
                news:this.state.news
            })
        });

        //我们不能在组件销毁后设置state，防止出现内存泄漏的情况??????????????????????????????????????????????????????????????
        // this.setState=(state,callback)=>{
        //     return ;
        // }
    }

    goSearch = ()=>{
        const {history} = this.props;
        history.push("/search");
    }

    render(){
        const {
            datas,
            news
        }=this.state; 
        return (
            <div id="body">            
                {/* <Head title="首页" show={true} ></Head> */}
                <div id="head">
                    <div id="content" onClick={this.goSearch}>
                        <div>
                            <img src={this.state.search} alt=""/>
                            <span>浙江高考状元</span>
                        </div>
                        <p>
                            热搜
                        </p>
                    </div>
                </div>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    忘记了姓名的请跟我来 , 现在让我们向快乐崇拜,现在是70 , 80 , 90的时代 ....
                </NoticeBar>

                {/* <Player ref="player" videoId="video-1" width="100%" height="300" >
                    {/* 让播放按钮居中 */}
                    {/* <BigPlayButton position="center" />
                    <source src="http://v1-default.bytecdn.cn/eb2f1f0d63f12b22168ed541b12aafed/5d1092a6/video/m/220f5faad522dad45a5b0ad40eafcfcdc0a1161b9f95000089b00fab19bf/?rc=ajNnanBubnJ3bDMzOGkzM0ApQHRAbzQ8NDU3MzgzMzYzNDUzNDVvQGg2dilAZzN3KUBmM3UpZHNyZ3lrdXJneXJseHdmOzpAbDZxbjVocDBmXy0tYC4wc3MtbyNvIy4tMS8wMi4uMjAzMTM2LTojbyM6YS1vIzpgLXAjOmB2aVxiZitgXmJmK15xbDojMy5e"/>
                </Player> */} 

                    {/* <Carousel
                    autoplay={true}
                    infinite
                    autoplayInterval={3000}
                    className="carousel"
                    >
                        {
                            this.state.banner.map((b,i)=>{
                               return (
                                <Link
                                   to="/app/" 
                                   key={i}
                                   style={{ display: 'inline-block', width: '100%', height: 200 }}
                                   >
                                         <img
                                            src={b.img}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' ,height:300}}
                                            onLoad={() => {
                                            
                                                window.dispatchEvent(new Event('resize'));
            
                                            }}
                                        />
                                   </Link>
                               )
                            })
                        }
                    </Carousel> */}

                {/* 新闻数据 */}
                <div>
                    {
                        news.map((data,i)=>{
                            return(
                                data.showtype==1?
                                // 数据展示类型1,只有一张图片
                                <Link to={"/good/detail/"+data._id+"?name="+data.title} key={i}>
                                <div className="newstype1">
                                    <div id="titleleft">
                                        <h2>{data.title}</h2>
                                        <p>
                                            <img src={data.sourceImg} alt=""/>
                                            <span>{data.source}</span>
                                        </p>
                                        <h4>{data.type}</h4>
                                    </div>
                                    <img src={data.img1} alt=""/>
                                </div></Link>:data.showtype==2?
                                // 数据展示类型2,3张图片
                                <Link to={"/good/detail/"+data._id+"?name="+data.title} key={i}>
                                <div key={i} className="newstype2">
                                    <h2>{data.title}</h2>
                                    <div className="imgs">
                                        <img src={data.img1} alt=""/>
                                        <img src={data.img2} alt=""/>
                                        <img src={data.img3} alt=""/>
                                    </div>
                                    <p>
                                        <img src={data.sourceImg} alt=""/>
                                        <span>{data.source}</span>
                                    </p>
                                    <h4>{data.type}</h4>
                                </div></Link>:
                                // 数据展示类型3,视频
                                <div key={i} className="newstype3">
                                    <p>{data.title}</p>
                                    <Player ref="player" videoId="video-1" poster={data.img1} width="100%" height="300" >
                                        {/* 让播放按钮居中 */}
                                        <BigPlayButton position="center" />
                                        <source src={data.video}/>
                                    </Player>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}




