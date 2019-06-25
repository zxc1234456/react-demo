

import "./index.scss"
import {Link} from "react-router-dom"
import { Player,BigPlayButton } from "video-react"

export class Item extends Component{
    render(){
        const {
            good
        }=this.props;
        return (
            // <div className="move-in">
            //     <Link to={"/good/detail/"+good._id+"?name="+good.name}>
            //         <img src={good.img} alt="" style={{width:"100%",height:"200px"}}/>
            //         <p>{good.name}</p>
            //         <p>{good.price}元 <span>{good.discount}折</span><span>{good.type.text}</span></p>
            //     </Link>
            // </div>

            <div className="move-in">
                <div className="content">
                    <p>{good.title}</p>
                    <Player ref="player" videoId="video-1" poster={good.img} width="100%" height="300" >
                        {/* 让播放按钮居中 */}
                        <BigPlayButton position="center" />
                        <source src={good.video}/>
                    </Player>
                    <h2>
                        <span className="times">{good.times}次播放&nbsp;&nbsp;&nbsp;&nbsp;"{good.black}"</span>
                        <img src={require("@/assets/images/zan.png")} alt="" />
                    </h2>
                </div>
            </div>
        )
    }
}