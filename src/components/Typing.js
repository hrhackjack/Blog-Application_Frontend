import React, {Component} from 'react'

class Typing extends Component {
    componentDidMount() {
      const heading = "This is a Personal Project   :)";
      const typing = () => {
        if (i < heading.length) {
          const headingElement = document.querySelector('.team-heading');
          if (headingElement)  headingElement.innerHTML += heading.charAt(i);      
            i++;
            setTimeout(typing, 150);
        }
      }
      let i = 0;
      typing();
    }
  
    render() {
      return (
        <div>
          <h1 className="team-heading"></h1>
        </div>
      );
    }
  }

  export default Typing;