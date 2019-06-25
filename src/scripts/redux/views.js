

import store from "./store";
import {Button} from "antd-mobile";

export class ViewDemo extends Component{
    render(){
        console.log(this.props);
        const {
            state,
            city,
            msg
        }=this.props;

        const {
            count
        }=store.getState();

        return (
            <div>
                <h2>view count Add 组件</h2>
                <h2>state / count =={state.count}</h2>
                <h2>store / count =={count}</h2>
                <h2>store / city =={city}</h2>
                <h2>store / msg =={msg}</h2>
                <hr/>
                <Button type="primary" inline onClick={()=>store.dispatch({type:""})}>count add</Button>
            </div>
        )
    }
}