import React from 'react'
import "../../styles/ContactUs.css"
import Base from "../../components/Base";
import { BASE_URL } from "../../services/helper";
import { toast } from "react-toastify";

function ContactUs() {

	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const details = JSON.stringify(Object.fromEntries(formData.entries()));
		console.log(details);
		fetch(`${BASE_URL}/contact-us`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: details
		})
		.then(response => {
		  if (!response.ok) {
			console.log('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
		  console.log(data);
		  // handle success response
		})
		.catch(error => {
		  console.error('There was a problem with the fetch operation:', error);
		  // handle error response
		});
	  }

    return (
		<Base>
        <section className=" section ftco-section img">
		<div className="container">
			<div className="rowSec justify-content-center">
			</div>
			<div className="rowSec justify-content-center">
				<div className="col-lg-11">
					<div className="wrapper">
						<div className="rowSec no-gutters justify-content-between">
							<div className="col-lg-6 d-flex align-items-stretch">
								<div className="info-wrap w-100 ">
									<h3 className="mb-4" style={{fontSize: "50px", color:"white", fontWeight:700}}>Contact us</h3>
				        	<div className="dbox w-100 d-flex align-items-start">
				        		<div className="icon d-flex align-items-center justify-content-center"></div>
				        	</div>
				        	<div className="dbox w-100 d-flex align-items-start">
				        		<div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-phone"></span>
				        		</div>
				        		<div className="text pl-4 ms-2">
					            <p><span style={{ fontSize: "27px", color:"white", fontWeight:700}}>Phone:</span> <a style={{fontSize: "17px", color:"white", fontWeight:500}} href="tel://7482817989">+91 7482817989</a></p>
					          </div>
				          </div>
				        	<div className="dbox w-100 d-flex align-items-start">
				        		<div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-paper-plane"></span>
				        		</div>
				        		<div className="text pl-4 ms-2">
					            <p><span style={{fontSize: "27px", color:"white", fontWeight:700}}>Email:</span> <a style={{fontSize: "17px", color:"white", fontWeight:500}} href="mailto:info@openblog.com">info@openblog.com</a></p>
					          </div>
				          </div>
				        	<div className="dbox w-100 d-flex align-items-start">
				        		<div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-globe"></span>
				        		</div>
				        		<div className="text pl-4 ms-2">
					            <p><span style={{fontSize: "27px", color:"white", fontWeight:700}}>Website</span> <a style={{fontSize: "17px", color:"white", fontWeight:500}} href="/">OpenBlog</a></p>
								</div>
							</div>
						</div>
					</div>
							<div className="col-lg-5">
								<div className="contact-wrap w-100 p-4">
									<h3 className="mb-4"style={{fontSize: "45px", color:"crimson", fontWeight:500}}>Get in touch</h3>
									<div id="form-message-warning" className="mb-4"></div> 
				    		<div id="form-message-success" className="mb-4">
				            Your message was sent, thank you!
							</div>
									<form onSubmit={handleSubmit} method="POST" id="contactForm" name="contactForm">
										<div className="rowSec">
											<div className="col-md-12">
												<div className="form-group">
													<input type="text" className="form-ctrl" name="name" id="name" placeholder="Name"/>
												</div>
											</div>
											<div className="col-md-12"> 
												<div className="form-group">
													<input type="email" className="form-ctrl" name="email" id="email" placeholder="Email"/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="text" className="form-ctrl" name="subject" id="subject" placeholder="Subject"/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<textarea name="message" className="form-ctrl" id="message" cols="30" rowSecs="5" placeholder="Message"></textarea>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="submit" value="Send Message" className="btn-dn btn-primary"/>
													<div className="submitting"></div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	</Base>
    )
}

export default ContactUs
