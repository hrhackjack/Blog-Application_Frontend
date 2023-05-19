import React from 'react';
import "./AdminPanel.css"
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import { Label, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Button, ListGroup, ListGroupItem, FormFeedback} from "reactstrap";
import Base from "../Base";
import { loadAllCategories, addCategory } from "../../services/category-service";
// import DeleteCategory from '../pages/Other/DeleteCategory';

const AdminPanel = () => {
const [categories, setCategories] = useState([])
const [active, setActive] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(true);

const [category, setCategory] = useState({
    categoryTitle: "",
    categoryDescription: ""
});

const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const wrapperRef = useRef(null);

  const handleButtonClick = () => {
    setIsCardVisible(!isCardVisible);
    setIsButtonVisible(!isButtonVisible);
    }

    const handleClickOutside = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsCardVisible(false);
            setIsButtonVisible(true);
          }
      };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log('loading categories');
        console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in loading Categories!');
      });
  }, []);

  const listGroupItems = categories.slice(0, 7).map((cat, index) => (
    <ListGroupItem
      tag={Link}
      to={`/categories/${cat.categoryId}`}
      className="me-1 text-center"
      key={index}
      action={true}
    >
      {cat.categoryTitle}
    </ListGroupItem>
  ));

  const dropdownItems = categories.slice(7).map((cat, index) => (
    <ListGroupItem
      tag={Link}
      to={`/categories/${cat.categoryId}`}
      className=" me-1 text-center"
      key={index}
      action={true}
    >
      {cat.categoryTitle}
    </ListGroupItem>
  ));

  const toggleMoreCategories = () => {
    setIsCollapsed(!isCollapsed);
  };

const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setCategory({
        ...category,
        [field]: actualValue,
    });
};

const handleReset = () => {
    setCategory({
        categoryTitle: "",
    categoryDescription: ""
    });
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(category);
    //validation
    if (
        category.categoryTitle.trim() === "" ||
        category.categoryDescription.trim() === ""
    ) {
    toast.error("Enter The Details !!");
    return;
    }

    //submit the data to server to generate token
    addCategory(category).then((data) => {
        console.log("Category Added : ",category);
        console.log(data);
        toast.success("Category Added!");
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
        <Container style={{marginTop: "5rem"}}>
            <Row className="mt-4 mb-5">
                <Col
                    sm={{
                    size: 6,
                    offset: 3,
                    }}
                >
                    <div ref={wrapperRef} className="mb-5">
                        {isButtonVisible && (
                            <Button color='warning' className='add-cat mb-3'  onClick={handleButtonClick} >Add Category </Button> 
                        )}
                        {isCardVisible ? (
                            <Card color="dark" inverse className='mb-3'>  {/* {`mb-5 ${isCardVisible ? 'show-card' : 'hide-card'}`} */}
                                <CardHeader>
                                    <h3 style={{color: "white"}}>Add Category !!</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleFormSubmit}>
                                        <FormGroup>
                                            <Label for="title">Enter Category</Label>
                                            <Input
                                                type="text"
                                                id="title"
                                                value={category.categoryTitle}
                                                onChange={(e) => handleChange(e, "categoryTitle")}
                                                invalid={ error.errors?.response?.data?.categoryTitle ? true : false}
                                            />
                                            <FormFeedback>
                                                {error.errors?.response?.data?.categoryTitle}
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input
                                            type="textarea"
                                            id="description"
                                            value={category.categoryDescription}
                                            onChange={(e) => handleChange(e, "categoryDescription")}
                                            invalid={ error.errors?.response?.data?.categoryDescription ? true : false}
                                            />
                                            <FormFeedback>
                                                {error.errors?.response?.data?.categoryDescription}
                                            </FormFeedback>
                                        </FormGroup>

                                        <Container className="text-center">
                                            <Button onClick={handleFormSubmit} color="light" outline>
                                            Submit
                                            </Button>
                                            <Button
                                            onClick={handleReset}
                                            className="ms-2"
                                            outline
                                            color="secondary"
                                            >
                                            Reset
                                            </Button>
                                        </Container>
                                    </Form>
                                    </CardBody>
                            </Card>
                        ) : null}
                    </div>

                    
                </Col>

                <ListGroup horizontal className='mt-1'>
                     {listGroupItems}
                     {  categories.length > 7 ? (
                        isCollapsed ? (
                        <Button className='list-group-item list-group-item-action m-0 text-center'
                            onClick={toggleMoreCategories}
                            >
                            More
                        </Button>
                        ) : (
                            <>{dropdownItems}</>
                        )
                        ) : null
                    }
                </ListGroup>


            </Row>
        </Container>
    </Base>
);
};

export default AdminPanel;