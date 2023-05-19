import React from 'react';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Label, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Button, ListGroup, ListGroupItem, NavLink} from "reactstrap";
import Base from "../../components/Base";
import { loginUser } from "../../services/user-service";
import { doLogin } from "../../auth";
import { useNavigate, Link } from "react-router-dom";
import userContext from "../../context/userContext";
import { useContext } from "react";
import OauthButtonGoogle from "../../components/OauthButtonGoogle/OauthButtonGoogle";
import { loadAllCategories} from "../../services/category-service";



const Login = () => {
  const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const [categories, setCategories] = useState([])
  useEffect(() => {
      loadAllCategories().then(data => {
          console.log("loading categories ")
          console.log(data)
          setCategories([...data])
      })
          .catch(error => {
              console.log(error);
              toast.error("Error in loading Categories!")
          })
  }, [])

  const listGroupItems = categories.slice(0, 7).map((cat, index) => (
    <ListGroupItem
      tag={Link}
      to={`/categories/${cat.categoryId}`}
      className="border-2 shadow-0 mt-1"
      key={index}
      action={true}
    >
      {cat.categoryTitle}
    </ListGroupItem>
  ));

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
          userContextData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/user/dashboard");
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <div className="mt-3"/>
            <OauthButtonGoogle/>
            <div className=""> <hr /> </div>
            <Card color="dark" inverse>
              <CardHeader>
                <h3 style={{color:" #ffc42c"}}>Login Here !!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* password field */}

                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="warning" outline>
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      outline
                      color="light"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
              <NavLink color="warning" className='mb-3' style={{marginLeft:"3rem", color:" #ffc42c"}} tag={Link} to="/reset-pass">Forgot Password ?</NavLink>
              <span style={{marginLeft:"3rem"}}>
          Create account / Register Here
          <Button color="warning" className='mb-3' style={{marginLeft:"11rem"}}><NavLink tag={Link} to="/signup">SignUp</NavLink></Button>
        </span>
            </Card>
          </Col>
          <ListGroup className='mt-4 text-center' horizontal>
                    {listGroupItems}
                </ListGroup>
        </Row>

      </Container>
    </Base>
  );
};

export default Login;
