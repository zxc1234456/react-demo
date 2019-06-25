

//reducer是一个函数
//定义默认组件状态
const defaultState={
    count:1000,
    city:"非洲",
    msg:"are you ok",
    islogin:false
}

//use by createStore
export const reducers =(state=defaultState,action)=>{
    console.log(action);

    switch(action.type){

        case "COUNTADD":
        state.count=state.count+1;
        console.log(state);
        return state;
        break;



        case "changeIsLogin":
        return {...state,islogin:action.islogin}
        break;

        default:
        return state;
        break;
    }
}