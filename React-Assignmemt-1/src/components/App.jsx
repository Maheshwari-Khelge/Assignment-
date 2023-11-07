import { Component } from "react";
import Header from "./header";
import Nav from "./nav";
import Banner from "./banner";
import MainBody from "./MainBody";
import LeftContent from "./left";
import Footer from "./Footer";

class App extends Component{
    render(){
        return <div>
        <Header/> 
         <Nav/>
         <main>
           <Banner/>
            <MainBody/>
            <LeftContent/>
        </main>
        <Footer/>
    
        
    </div>

    }
}

export default App;