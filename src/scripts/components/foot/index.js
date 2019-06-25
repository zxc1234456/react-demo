

export const foots =  [
    {txt:"首页",path:"/app/home",name:"home",icon:"icon-shouye",on:"home-on.png",off:"home-off.png"},
    {txt:"视频",path:"/app/video",name:"video",icon:"icon-fenlei"},
    {txt:"发现",path:"/app/cart",name:"cart",icon:"icon-zhaopian"},
    {txt:"我的",path:"/app/my",name:"my",icon:"icon-wode"}
]

import "./index.scss"
import  {Link,NavLink} from "react-router-dom"
import {Badge} from "antd-mobile"

export const Foot = ()=>{
    return (
       <footer>
           {
               foots.map((item,i)=>{
                   return (
                       <div key={i}>
                           <NavLink to={item.path} activeClassName="nav-active" > 
                                <i className={"iconfont icon " + item.icon} ></i>
                                <span> {item.txt}</span>
                                {i==2&&<Badge className="hot" text={8} style={{ marginLeft: 12 }}></Badge>}
                           </NavLink>
                       </div>
                   )
               })
           }
       </footer>
    )
}