

import "./index.scss"

import  {Head} from "~/components/head"
import {WingBlank,WhiteSpace,SearchBar} from  "antd-mobile"
import axios from "@/utils/axios"
import {List} from "~/components/list"

export class Search extends Component{

    state={
        goods:[]
    }
    getSearch=(val)=>{
        console.log(this.refs.one.state.value);
        axios.get("/vue/getGoodList",{
            params:{
                keyword:this.refs.one.state.value
            }
        }).then(res=>{
            this.setState({
                goods:res.data.result
            })
        })
    }

    changeGoods=()=>{
        this.state.goods.reverse();
        this.setState({
            goods:this.state.goods
        })
    }

    render(){
        const {
            goods
        }=this.state
        return (
            <div>
                <Head title="搜索" show={true} ></Head>
                <WingBlank>
                    <WhiteSpace />
                    <SearchBar ref="one" placeholder="Search" maxLength={8} onBlur={this.getSearch} />
                    <List goods={goods} changeAllGoods={this.changeGoods}>

                    </List>
                </WingBlank>
                
            </div>
        )
    }
}