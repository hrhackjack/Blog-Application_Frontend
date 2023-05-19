import React from 'react';
import { Container, Row, Col } from "reactstrap";
import Base from "../../components/Base";
import CategorySideMenu from "../../components/CategorySideMenu/CategorySideMenu";
import Feed from "../../components/Feed/Feed";


const Home = () => {
  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <Feed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
