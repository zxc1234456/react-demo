

import "./index.scss";
import  {Head} from "~/components/head"
import axios from "@/utils/axios"
import  {List} from "~/components/list"

import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

export class Video extends Component{

    state = {
        types:[],
        allGoods:[]
    }

    changeAllGoods=()=>{
        this.state.allGoods.reverse();
        this.setState({
            allGoods:this.state.allGoods
        })
    }
    componentWillMount(){
        // 请求视频类型
        // axios.get("/vue/getGoodTypes")
        axios.get("/react/getVideoTypes")
        .then(res=>{
            console.log(res);
            this.setState({
                types:res.data.result 
            })
        })

        //请求所有数据
        // axios.get("/vue/getGoodList")
        axios.get("/react/getVideoList")
        .then(res=>{
            this.setState({
                allGoods:res.data.result 
            })
        })

        //我们不能在组件销毁后设置state，防止出现内存泄漏的情况??????????????????????????????????????????????????????????????
        // this.setState=(state,callback)=>{
        //     return ;
        // }
    }

    render(){
        const {types,allGoods} = this.state;
        let tabs = types.map((item)=>{
            item.title = item.text;
            return item;
        })
        return (
            <div>
                <Head title="视频"></Head>
                {/* 当allGoods的长度大于0才显示后面的 */}
                {allGoods.length>0&&<Tabs 
                        tabs={tabs}
                        tabBarActiveTextColor="#da2431"
                        tabBarUnderlineStyle={{borderColor:"#da2431"}}
                        tabBarInactiveTextColor="#999"
                        initialPage={0}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        {
                            tabs.map((item,i)=>{
                                return (
                                    <List 
                                    changeAllGoods={this.changeAllGoods}
                                    key={i}
                                    type={item}
                                    allGoods={allGoods}
                                    goods={allGoods.filter((g)=>g.type.value==item.value)}
                                    />
                                )
                            })
                        }
                    </Tabs>
                }
            </div>
        )
    }
}