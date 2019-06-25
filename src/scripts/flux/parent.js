import { Child } from "./child";



export class Parent extends Component{
    render(){
        return (
            <div>
                <h2>parent--parent</h2>
                <hr/>
                <Child></Child>
            </div>
        )
    }
}
