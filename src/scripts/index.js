


import ReactDOM, {render} from "react-dom";  //  ReactDOM.render
import { IndexView } from "./views";


const rootEle = document.getElementById("app");
import {Provider} from  "react-redux"
import store from "./redux/store"
const hotRender = ()=>{
    render(
        <Provider store={store}>
        <IndexView/>
        </Provider>,
        rootEle
    )
}
hotRender();

// const hotRender = ()=>{
//     render(
//         <IndexView/>,
//         rootEle
//     )
// }

// import "./redux"


// const hotRender = ()=>{
//     render(
//         <IndexView/>,
//         rootEle
//     )
// }

// import "./flux"

// ReactDOM.render(
// <Provider store={store}>
//     <IndexView/>
//     </Provider>,
//     rootEle
//     )