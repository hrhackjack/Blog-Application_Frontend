import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink as ReactLink, useNavigate } from "react-router-dom";



const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '25vh',
    paddingTop:"1rem"
  },
  content: {
    flex: 1,
  },
};


export default function Footer() {

  let navigate = useNavigate();

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-md-start text-muted' style={styles.footer}>
      <section className='p-2'>
        {/* <MDBContainer className='text-center text-md-start '> */}
          <MDBRow className='mt-3 m-0'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-2'>
              <h6 className='fw-bold mb-4' style={{fontFamily:"cursive"}} >
                <MDBIcon icon="book-open" className="" />
                <span onClick={() => navigate(`/`)} className='text-reset fw-bold p-3' style = {{cursor:'pointer'}}>OpenBlog</span> 
              </h6>
              <p>
              Speak your mind without fear - A Blogging app where censorship is unheard of.
              </p>
              {/* <h6 className='text-uppercase fw-bold mb-4 mt-4'>
                <MDBIcon icon="atom" className="me-2" />
                <a href='/contact-us' className='text-reset fw-bold'> Get Connected with Us : </a> 
              </h6> */}
              <div className="mt-4">
          <a href='https://www.youtube.com/channel/UCQz00PUfw018NvBDgB4R4yA' className='me-4 text-reset'>
            <MDBIcon fab icon="youtube-square" size="2x"/>
          </a>
          <a href='https://github.com/im-architect' className=' me-4 text-reset'>
            <MDBIcon fab icon="github" size="2x"/>
          </a>
          <a href='https://instagram.com/hrishabh_hrx?igshid=ZDdkNTZiNTM=' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" size="2x"/>
          </a>
          <a href='https://www.linkedin.com/in/hrishabh-raj-9929b1195/' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" size="2x"/>
          </a>
          <a href='https://www.facebook.com/hrishabh.raj.92/' style={{}} className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-square" size="2x"/>
          </a>
        </div>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-2'>
          
              <h6 className='text-uppercase fw-bold mb-4'><MDBIcon fas icon="tools" className="me-3"  />Technologies</h6>
              <p>
                <a href='https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/' className='text-reset' style = {{textDecoration:"none"}}>
                  Spring Boot
                </a>
              </p>
              <p>
                <a href='https://react.dev/' className='text-reset' style = {{textDecoration:"none"}}>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset' style = {{textDecoration:"none"}}>
                  _HRhackjack
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-4'><MDBIcon fas icon="link" className="me-3" />Useful links</h6>
              <p>
                <a href='#!' className='text-reset' style = {{textDecoration:"none"}}>
                  Settings
                </a>
              </p>
              <p onClick={() => navigate(`/about`)} style = {{cursor:'pointer'}}>
                  About Us
              </p>
              <p>
                <a href='#!' className='text-reset'  style = {{textDecoration:"none"}}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-2'>
              <h6 className='text-uppercase fw-bold mb-4' style = {{cursor:'pointer'}} onClick={() => navigate(`/contact-us`)}> <MDBIcon fas icon="holly-berry" /> Contact</h6>
              <p className='text-reset fw-semibold'style = {{cursor:'pointer'}} onClick={() => navigate(`/about`)}>
                <i className="fas fa-terminal me-2 " ></i>
                  HRhackjack
              </p>
              <p style = {{cursor:'pointer'}}>
                <MDBIcon icon="at" className="me-2" />
                <a className='text-reset' style = {{textDecoration:"none"}} href="mailto:info@openblog.com">info@openblog.com</a>
              </p>
              <p>
                <MDBIcon icon="phone" className="me-1" /> +91 7482817989
              </p>
            </MDBCol>
          </MDBRow>
        {/* </MDBContainer> */}
      </section>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright :  
        <span className='text-reset fw-bold p-3' onClick={() => navigate(`/`)} style = {{cursor:'pointer'}}>
          BloggingApplication.com
        </span>
      </div>
    </MDBFooter>
  );
}