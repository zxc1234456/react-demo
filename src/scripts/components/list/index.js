

import "./index.scss"
import {Item} from "~/components/item" 
import {PullToRefresh} from "antd-mobile"

export class List extends Component{
    state={
        refreshing:false,
        down:true,  //下拉
    }

    componentDidMount(){
        const {type,allGoods}=this.props;
        if(allGoods){
            var data=allGoods.filter(g=>g.type.value==type.value);
            console.log(data);
            this.setState({
                data
            })
        }
    }

    render(){
        console.log(this.props);
        const{
            goods,
            changeAllGoods
        }=this.props;
        return (
            <div>
                <ul>
                <PullToRefresh
                    damping={50}
                    ref={()=>"loadmore"}
                    // ref={el=>this.one=el}
                    indicator={{deactivate:"下拉刷新"}}
                    direction={'down'}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{
                        this.setState({refreshing:true});  //正在刷新
                        setTimeout(()=>{
                            changeAllGoods()
                            this.setState({refreshing:false});  //刷新结束
                        },1000)
                    }}
                    >
                    {
                        goods.map((good,i)=>{
                            return (
                                <li key={i}>
                                    <Item
                                        good={good}
                                    ></Item>
                                </li>
                            )
                        })
                    }
                </PullToRefresh>
                </ul>
            </div>
        )
    }
}