import { Component } from "react";
import axios from "axios";
 
class App extends Component{
    state = {
        User : []
    }

    componentDidMount(){ 
      axios.get("https://reqres.in/api/users?page=2")
      .then(res => this.setState({User : res.data.data}))
      .catch (err => console.log(err))
    }
    render(){
       return <div className="container">
                   <h1>Ajax  | Api Call</h1>
                   <ol>
                    {this.state.User.map( val => <li className="parent" key={val.id}><img width="100px" src={val.avatar}/><br/>{val.first_name+" "+val.last_name}</li>)}
                   </ol>
              </div>
    }
}
 
export default App;