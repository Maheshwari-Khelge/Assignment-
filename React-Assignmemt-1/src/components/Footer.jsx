import { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="py-5 text-center text-body-secondary bg-body-tertiary">
        <p>
          Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by{" "}
          <a href="https://twitter.com/mdo">@mdo</a>.
        </p>
        <p className="mb-0">
          <a href="#">Back to top</a>
        </p>
      </footer>
    );
  }
}

export default Footer;
