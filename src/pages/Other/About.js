import React, { useEffect, useRef} from 'react';
import "../../styles/About.css";
import userContext from "../../context/userContext";
import Base from "../../components/Base";
import image from "../../resources/hrx.jpeg";
import topImg from "../../resources/img-top1.jpeg";


const About = () => {
  const heading = 'This is a Personal Project   :)';
let i = 0;

useEffect(() => { 
  const typing = () => {
    if (i < heading.length) {
      const headingElement = document.querySelector('.team-heading');
      if (headingElement) {
        headingElement.innerHTML += heading.charAt(i);
        i++;
        setTimeout(typing, 150);
      }
    }
  }
  typing();
}, [heading, i]);


  return (
    <Base>
    <div className="team-container">
    <userContext.Consumer>
      {(object) => (
          <h1 className="welcome">Welcome <span className="crimson-text">{object.user.login && object.user.data.name}</span>  __ !</h1>
      )}
    </userContext.Consumer>
    <div className="team-heading" ></div>
        <div className="team-cards-wrapper">
            <div className="team-card ">
                <img src={topImg} className="team-image-top" alt=''/>
                <img src={image} className="team-profile-image" alt=''/>
                <h1 className="team-full ">_Hrishabh</h1>
                <p className="team-job"><b>Programmer / Hacker</b></p>
                <p className="team-about-me">Unlocking the hidden potential of technology.</p>
                <button type="button">Explore Me</button>
                <ul className="team-social-icons">
                    <li><a href="https://www.facebook.com/hrishabh.raj.92/"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UCQz00PUfw018NvBDgB4R4yA"><i className="fab fa-youtube"></i></a></li>
                    <li><a href="https://twitter.com/hrishabh_hr"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/hrishabh-raj-9929b1195/"><i className="fab fa-linkedin-in"></i></a></li>
                </ul>
            </div>
            </div>
        </div>
    </Base>
  );
};

export default About;

