import React, { useState } from 'react';
import "./ResetPassword.css";
import { BASE_URL } from "../../services/helper";
import { toast } from "react-toastify";
import Base from "../Base";

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


  console.log(email)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = new URL(`${BASE_URL}/reset-password`);
    url.searchParams.append('email', email);

    fetch(url, {
        method: 'POST',
        body: email,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsSubmitted(true);
            window.location.href = `https://accounts.google.com/signin/v2/identifier?service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&Email=${encodeURIComponent(email)}`;
            console.log('Mail Sent !!');
          } else {
            toast.error('Email Not Registered !!');
            console.log('Error Occurred !!');
          }
        })
        .catch((error) => {
          toast.error('Unexpected Server Failure !!');
          console.log('Error:', error);
        });
  };

  return (
    <Base>
    <div className='container_reset'  style={{padding:"7px"}}>
      <h1 className='rp'>Reset Password</h1>
      {isSubmitted ? (
        <p>Verify your email</p>
      ) : (
      <form className = "reset-pass" onSubmit={handleSubmit}>
        <label className='rsePass'>
          Email:
          <input className='emailInput' type="email" placeholder='Enter email to send password reset Link.....' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button style={{marginLeft:"25rem"}} type="submit">Submit</button>
      </form>
      )}
    </div>
    </Base>
  );
}

export default PasswordReset;
