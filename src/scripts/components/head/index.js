

import "./index.scss"

import {NavBar,Icon} from "antd-mobile"
export class Head extends Component{
    goback=(show)=>{
        const {history} = this.context.props;
        if(show){
            history.go(-1);
        }
    }
    goSearch = ()=>{
        const {history} = this.context.props;
        history.push("/search");
    }
    render(){
        const  {
            title,
            show
        }  = this.props;
        return (
            <NavBar
                mode="dark"
                icon={show&&<Icon type="left" />}
                onLeftClick={() => this.goback(show)}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goSearch}/>,
                    // <Icon key="1" type="ellipsis" />,
                ]}
                > {title }</NavBar>
        )
    }
}

import PropTypes from "prop-types"
Head.contextTypes ={
    props:PropTypes.object
}
