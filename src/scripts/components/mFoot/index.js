

import {foots} from "../foot"

import "./index.scss";

import { TabBar } from 'antd-mobile';


export class MFoot extends Component{
    state = {
        selectedTab:"home"
    }

    componentWillMount(){
        const {location,history} = this.context.props;
        var pathname = location.pathname.split("/app/")
        var name = pathname[1];
        this.setState({
            selectedTab:name
        });
    }

    componentWillUpdate(){
        console.log("ssss")
        // const {location} = this.context.props;
        // var pathname = location.pathname.split("/app/")
        // var name = pathname[1];
        // this.setState({
        //     selectedTab:name
        // })
    }


    render(){
        return (
            <div className="footer">
                <TabBar
                     unselectedTintColor="#949494"
                     tintColor="#da2431"
                     barTintColor="white"
                >
                    {
                        foots.map((foot,i)=>{
                            return (
                                <TabBar.Item
                                    title={foot.txt}
                                    key={i}
                                    icon={<i 
                                    className={"icon iconfont "+foot.icon}
                                    style={{
                                    fontSize:'22px',
                                    width: '22px',
                                    height: '22px',
                                    display:"block"
                                    }}
                                    />
                                    }
                                    selectedIcon={<i 
                                    className={"icon iconfont "+foot.icon}
                                    style={{
                                        fontSize:'22px',
                                        width: '22px',
                                        height: '22px',
                                        display:"block",
                                        
                                    }}
                                    />
                                    }
                                    selected={this.state.selectedTab ===foot.name}
                                
                                    onPress={() => {
                                        console.log(this.context);
                                        const {history } = this.context.props;
                                        this.setState({
                                            selectedTab: foot.name
                                        });

                                        history.push(foot.path);
                                    }}
                                    data-seed="logId"
                                >
                                
                                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}

import PropTypes from "prop-types"
MFoot.contextTypes ={
    props:PropTypes.object
}

