import { Component } from "react";

class Nav extends Component{
    render(){
        return <nav className="nav nav-underline justify-content-between">
        <a className="nav-item nav-link link-body-emphasis active" href="#">World</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">U.S.</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Technology</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Design</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Culture</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Business</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Politics</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Opinion</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Science</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Health</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Style</a>
        <a className="nav-item nav-link link-body-emphasis" href="#">Travel</a>
      </nav>
    }
}
export default Nav;