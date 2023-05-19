import React from 'react';
import { useState } from "react";
import { signUp } from "../../services/user-service";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, NavLink } from "reactstrap";
import Base from "../../components/Base";
import OauthButtonGoogle from "../../components/OauthButtonGoogle/OauthButtonGoogle";
import { Link } from 'react-router-dom';


const Signup = () => {
    const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // handle change
  const handleChange = (event, property) => {
    //dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  //resetting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
    });
  };

  //submit the form
  const submitForm = (event) => {
    event.preventDefault();
  
    // Check for errors
    let isError = false;
    if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
      toast.error ("Invalid email format !!");
      isError = true;
    }
    if (data.password.includes(" ")) {
      toast.error ("Password cannot contain spaces !!");
      isError = true;
    } else if (data.password !== data.confirmPassword) {
      toast.error ("Passwords don't match !!");
      isError = true;
    }
    if (isError) {
      return;
    }  
    //data validate
  
    //call server api for sending data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        toast.success("User registered successfully !! ");
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log("Error Ocurred... Log : ");
        console.log(error);
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
  };  

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          {/* { JSON.stringify(data) } */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3 style={{color:" #ffc42c"}}> Fill Information to Register !!</h3>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data? true : false
                      }
                    />

                    <FormFeedback>
                    Email already registered, try logging in !!
                      {console.log(error.errors?.response?.data)}
                    </FormFeedback>
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                    <FormGroup>
                      <Label for="password">Confirm password</Label>
                      <Input
                      type="password"
                      placeholder="Enter here"
                      id="confirmPassword"
                      onChange={(e) => handleChange(e, "confirmPassword")}
                      value={data.confirmPassword}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  {/* about field */}
                  <FormGroup>
                    <Label for="about">Write something about yourself</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "125px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="warning">
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      color="light"
                      outline
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
              <span style={{marginLeft:"4rem"}}>
          Already have an account?
          <Button color="warning" className='mb-3' style={{marginLeft:"13rem"}}><NavLink tag={Link} to="/login">LogIn</NavLink></Button>
        </span>
            </Card>
            <div className="or">
            <hr />
          </div>
            <OauthButtonGoogle/>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
